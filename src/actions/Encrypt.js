import CaesarEncrypt from "./CaesarEncrypt";
import RailFenceEncrypt from "./RailFenceEncrypt";

const Encrypt = (cryptoMethod, key, text) => {
  if (cryptoMethod === "Caesar Cipher") {
    return CaesarEncrypt(key, text);
  } else if (cryptoMethod === "Rail Fence") {
    return RailFenceEncrypt(key, text);
  } else {
    // combine 2 method
    const firstEncrypt = CaesarEncrypt(key, text);
    return RailFenceEncrypt(key, firstEncrypt);
  }
};

export default Encrypt;
