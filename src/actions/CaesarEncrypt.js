const CaesarEncrypt = (key, text) => {
  var result = "";

  //loop through each caharacter in the text
  for (var i = 0; i < text.length; i++) {
    //get the character code of each letter
    var c = text.charCodeAt(i);

    // handle uppercase letters
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 + key) % 26) + 65);

      // handle lowercase letters
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 + key) % 26) + 97);

      // its not a letter, let it through
    } else {
      result += text.charAt(i);
    }
  }
  return result;
};

export default CaesarEncrypt;
