import RailFenceEach8LetterDecrypt from "./RailFenceDecrypt";
import CaesarDecrypt from "./CaesarDecrypt";
import Decrypt from "./Decrypt";

export default function DecryptSameKey(
  cipherCaesar,
  cipherRailFence,
  cipherComb
) {
  var plainCaesar, plainRailFence, plainComb;
  for (var key = 2; key <= 7; key++) {
    plainCaesar = CaesarDecrypt(key, cipherCaesar);
    plainRailFence = RailFenceEach8LetterDecrypt(key, cipherRailFence);
    if (plainCaesar === plainRailFence) {
      plainComb = Decrypt("Combination", key, cipherComb);
      if (plainComb === plainCaesar) return { plainText: plainComb, key: key };
    }
  }
}
