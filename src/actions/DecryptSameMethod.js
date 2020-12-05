import RailFenceEach8LetterDecrypt from "./RailFenceDecrypt";
import CaesarDecrypt from "./CaesarDecrypt";
import Decrypt from "./Decrypt";

export default function DecryptSameMethod(cryptoMethod, cipherTexts) {
  if (cipherTexts.length <= 1) return null;
  var plainTexts = [];
  var possibleOutcomes = [];
  if (cryptoMethod === "Caesar Cipher") {
    for (var i = 0; i < cipherTexts.length; i++) {
      plainTexts[i] = [];
      for (var key = 0; key < 26; key++) {
        plainTexts[i][key] = CaesarDecrypt(key, cipherTexts[i]);
      }
    }
  } else if (cryptoMethod === "Rail Fence") {
    for (var i = 0; i < cipherTexts.length; i++) {
      plainTexts[i] = [];
      for (var key = 2; key <= 7; key++) {
        plainTexts[i][key] = RailFenceEach8LetterDecrypt(key, cipherTexts[i]);
      }
    }
  } else {
    for (var i = 0; i < cipherTexts.length; i++) {
      plainTexts[i] = [];
      for (var key = 2; key <= 7; key++) {
        plainTexts[i][key] = Decrypt("Combination", key, cipherTexts[i]);
      }
    }
  }
  DecryptSameMethodRecursive(plainTexts, possibleOutcomes, []);
  return possibleOutcomes;
}

function DecryptSameMethodRecursive(plainTexts, possibleOutcomes, currentKeys) {
  if (currentKeys.length == plainTexts.length) {
    possibleOutcomes.push({
      keys: currentKeys,
      plainText: plainTexts[0][currentKeys[0]],
    });
    return;
  }

  for (var key in plainTexts[currentKeys.length]) {
    var plainText = plainTexts[currentKeys.length][key];
    if (currentKeys.length > 0) {
      if (
        plainText !==
        plainTexts[currentKeys.length - 1][currentKeys[currentKeys.length - 1]]
      )
        continue;
    }
    DecryptSameMethodRecursive(
      plainTexts,
      possibleOutcomes,
      currentKeys.concat([key])
    );
  }
}
