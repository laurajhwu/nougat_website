import crypto from "crypto-js";

export function encrypt(password, id) {
  const cipher = crypto.AES.encrypt(password, id);
  return cipher.toString();
}

export function decrypt(cipher, id) {
  const decipher = crypto.AES.decrypt(cipher, id);
  return decipher.toString(crypto.enc.Utf8);
}
