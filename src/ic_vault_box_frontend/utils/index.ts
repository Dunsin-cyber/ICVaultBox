export const hex_decode = (hexString: any) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
export const hex_encode = (bytes: any) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

export const DateFormatter = (motokoTime: number) => {
  // Convert nanoseconds to milliseconds
  let motokoTimeInMilliseconds = motokoTime / 1e6;

  // Create a JavaScript Date object
  let jsDate = new Date(motokoTimeInMilliseconds);

  // Format the date as needed
  return jsDate.toLocaleString();
};

export default DateFormatter;
