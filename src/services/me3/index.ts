import Me3 from "@me3technology/keysmith";

// To use this, you will require `.npmrc` on the root of this repo to npm install keysmith
// Please dm @Ailin for credentials
export class Me3Instance {
  private static instance: Me3;
  public static getInstance(): Me3 {
    if (!Me3Instance.instance) {
      Me3Instance.instance = new Me3({
        endpoint: `${process.env.KEYSMITH_ENDPOINT ?? ""}`,
        partnerId: `${process.env.KEYSMITH_PARTNER_ID ?? ""}`,
        redirect_url: `${process.env.KEYSMITH_REDIRECT_URI ?? ""}`,
      });
    }
    return Me3Instance.instance;
  }
}
