import CaesarEncrypt from "./CaesarEncrypt";

const CaesarDecrypt = (key, text) => {
  var result = "";
  key = (26 - key) % 26;
  result = CaesarEncrypt(key, text);
  return result;
};

export default CaesarDecrypt;
