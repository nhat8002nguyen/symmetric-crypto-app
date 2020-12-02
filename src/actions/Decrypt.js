import RailFenceEach8LetterDecrypt from "./RailFenceDecrypt";
import CaesarDecrypt from "./CaesarDecrypt";

export default function Decrypt(cryptoMethod, key, input) {
  if (cryptoMethod === "Rail Fence") {
    return RailFenceEach8LetterDecrypt(key, input);
  } else if (cryptoMethod === "Caesar Cipher") {
    return CaesarDecrypt(key, input);
  } else {
    const firstDecrypt = RailFenceEach8LetterDecrypt(key, input);
    return CaesarDecrypt(key, firstDecrypt);
  }
}
