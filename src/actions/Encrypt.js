import CaesarEncrypt from "./CaesarEncrypt";
import RailFenceEach8LetterEncrypt from "./RailFenceEncrypt";

const Encrypt = (cryptoMethod, key, text) => {
  if (cryptoMethod === "Caesar Cipher") {
    return CaesarEncrypt(key, text);
  } else if (cryptoMethod === "Rail Fence") {
    return RailFenceEach8LetterEncrypt(key, text);
  } else {
    // combine 2 method
    const firstEncrypt = CaesarEncrypt(key, text);
    return RailFenceEach8LetterEncrypt(key, firstEncrypt);
  }
};

export default Encrypt;
