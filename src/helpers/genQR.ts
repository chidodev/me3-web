import qrcode, { ErrorCorrectLevel, QRKanji } from "qrcode-generator-ts";

export function genQR(text: string) {
  const qr = new qrcode.QRCode();
  qr.setTypeNumber(12);
  qr.setErrorCorrectLevel(ErrorCorrectLevel.M);
  qr.addData(new QRKanji(text));
  return qr.make();
}

// function createImgTag (width: number, height: number) {
//     var gif = qrcode.G
//     for (var y = 0; y < height; y += 1) {
//         for (var x = 0; x < width; x += 1) {
//             gif.setPixel(x, y, qrcode.getPixel(x, y));
//         }
//     }
//     var b = qrcode.byteArrayOutputStream()
//     gif.write(b)

//     var base64 = qrcode.base64EncodeOutputStream()

//     var bytes = b.toByteArray()

//     for (var i = 0; i < bytes.length; i += 1) {
//         base64.writeByte(bytes[i]);
//     }
//     base64.flush();

//     var img = '';
//     img += 'data:image/gif;base64,';
//     img += base64;

//     return img;
// }
