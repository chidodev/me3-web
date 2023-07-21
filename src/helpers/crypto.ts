/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
import * as bitcoin from "bitcoinjs-lib";
import { ethers } from "ethers";
import bip39 from "bip39";
import { fromSeed } from "bip32";
import { keyPairFromPrivateKey } from "@nodefactory/filecoin-address";
import _ from "lodash-es";

import type { DynamicObject } from "@/models/DynamicObjectModel";
import type { GroupedChainItem } from "@/models/MainChainModel";
import type { GenericResponse } from "@/models/ResponseModel";
import type { FilecoinNetwork } from "@nodefactory/filecoin-address";

export type AxiosFuncResult = GenericResponse<DynamicObject[]> | string;

//TODO - URL encode the params
export function getRequestParams(obj: DynamicObject): string {
  const temp: string[] = [];
  Object.keys(obj).forEach((item) => {
    temp.push(`${item}=${obj[item]}`);
  });

  return temp.join("&");
}

export async function requestOfGet({ url, params }: { url: string; params: DynamicObject }): Promise<AxiosFuncResult> {
  try {
    const paramsString = getRequestParams(params);
    console.log(`GET ${url}?${paramsString}`);
    const lightToken = localStorage.getItem("light_token");
    const config = {
      method: "get",
      url: "https://avarta-official-dev.avarta.io/me3-api" + url,
      headers: {
        "Content-Type": "application/json",
        "Company-ID": "2000",
        "Partner-ID": "0f48c2ed-0a48-5c57-aeda-de224c92704b",
        "Light-token": lightToken,
      },
    };

    //Axios call
    const result = await axios<GenericResponse<DynamicObject[]>>(config);
    const { data } = result;

    //Check if the response is successful
    const success = data && data.code === "0";
    if (success) return data;

    return "No data";
  } catch (err: unknown) {
    if (!(err instanceof Error)) {
      throw err;
    }

    console.error(err);
    return err.message;
  }
}

export async function getAllChains(params = {}) {
  const result: AxiosFuncResult = await requestOfGet({
    url: "/api/mainChain/list",
    params,
  });

  if (typeof result === "string") return [];
  return result.data;
}

function genP2PKHAdd(keyPair: any, network: any) {
  const p2pkh = bitcoin.payments.p2pkh({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    pubkey: keyPair.publicKey,
    network,
  });
  const address = p2pkh.address;
  return address;
}

function genP2WPKHAdd(keyPair: any, network: any) {
  const p2wpkh = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      pubkey: keyPair.publicKey,
      network: network,
    }),
    network: network,
  });
  const address = p2wpkh.address;
  return address;
}

function createFilWallet(mnemonic: string, fileCoinNetwork: FilecoinNetwork) {
  try {
    const wallets = [];
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = fromSeed(seed);

    const path = "m/44'/461'/0'/0/0";
    const child = root.derivePath(path);
    const privateKey = Buffer.from(child.privateKey as Buffer).toString("hex");

    const result = keyPairFromPrivateKey(privateKey, fileCoinNetwork);

    wallets.push({
      address: result.address,
      privateKey: result.privateKey,
    });

    return {
      seed: mnemonic,
      list: wallets,
    };
  } catch (err) {
    console.error(err);
  }
}

export function createWallet(series: string, mnemonic: string) {
  switch (series) {
    case "btc":
      {
        const network = bitcoin.networks.testnet;
        createBtcWallet(mnemonic, network);
      }
      break;
    default: {
      console.error("Invalid input for creating wallet!");
      break;
    }
  }
}

export function generateMnemonic() {
  return ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
}

function createBtcWallet(mnemonic: string, network: bitcoin.Network) {
  try {
    const wallets = [];
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bitcoin.bip32.fromSeed(seed, network);

    const path = "m/44'/3'/0'/0/0";
    const child = root.derivePath(path).toWIF();
    const keyPair = bitcoin.ECPair.fromWIF(child, network);

    const addP2PKH = genP2PKHAdd(keyPair, network);
    const addP2WPKH = genP2WPKHAdd(keyPair, network);

    wallets.push({
      address: addP2PKH,
      type: "P2PKH",
      address_P2PKH: addP2PKH,
      address_P2WPKH: addP2WPKH,
      privateKey: child,
    });

    return {
      seed: mnemonic,
      list: wallets,
    };
  } catch (error) {
    console.log("error: ", error);
  }
}

export const handleGetAllChains = async () => {
  const wallets = [];
  const chains = await getAllChains();
  console.log(chains);
  const refined = chains.reduce<GroupedChainItem>((accumulator, chainItem) => {
    const list = accumulator[chainItem.series.toLowerCase()] ?? [];
    list.push({
      chainName: chainItem.name,
      walletName: `${chainItem.description}`.trim(),
    });
    accumulator[chainItem.series.toLowerCase()] = list;
    return accumulator;
  }, {} as GroupedChainItem);

  console.log(chains[0]);
  console.log(refined);
  const mnemonic = generateMnemonic();
  console.log(mnemonic);
  for (const [key, list] of Object.entries(chains[0])) {
    console.log(key, list);
    const wallet = createWallet(key, mnemonic);
    console.log(wallet);
    if (!_.isEmpty(wallet)) {
      wallets.push(_.map(list, (it: any) => _.merge(it, wallet)));
    }
  }
  console.log(_.flatten(wallets));
  return _.flatten(wallets);

  // const wallets = createWallet(refined.series, mnemonic)
  // console.log(wallets)
};
