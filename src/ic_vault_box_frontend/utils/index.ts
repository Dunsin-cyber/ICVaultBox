export const hex_decode = (hexString: any) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
export const hex_encode = (bytes: any) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
