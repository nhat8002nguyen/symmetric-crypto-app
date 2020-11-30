export default function Encrypt(cryptoMethod, key, text) {
  if (cryptoMethod === "Single Character") {
    let result = [];

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      let newChar;
      console.log(char);
      if (char === char.toUpperCase()) {
        newChar = String.fromCharCode(
          ((char.charCodeAt(0) + parseInt(key, 10) - 65) % 26) + 65
        );
      } else {
        newChar = String.fromCharCode(
          ((char.charCodeAt(0) + parseInt(key, 10) - 97) % 26) + 97
        );
      }

      result.push(newChar);
    }

    console.log(result.join(""));

    return result.join("");
  }
}
