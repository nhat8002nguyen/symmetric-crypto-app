const RailFenceEach8LetterDecrypt = (key, cipher) => {
  console.log(cipher);
  let paragraphResults = [];
  let paragraphs = cipher.split("\n");

  paragraphs.forEach((paragraph) => {
    let paragraphResult = [];

    for (let i = 0; i < paragraph.length; i = i + 8) {
      let aBlock8letter =
        i + 8 <= paragraph.length
          ? paragraph.slice(i, i + 8)
          : paragraph.slice(i, paragraph.length);
      paragraphResult.push(RailFenceDecrypt(key, aBlock8letter));
    }

    paragraphResults.push(paragraphResult.join(""));
  });

  return paragraphResults.join("\n");
};

const RailFenceDecrypt = (key, cipher) => {
  let rail = [];

  for (let i = 0; i < key; i++) {
    for (let j = 0; j < cipher.length; j++) {
      rail.push([]);
      rail[i][j] = "\n";
    }
  }

  let dir_down = null;
  let [row, col] = [0, 0];

  for (let i = 0; i < cipher.length; i++) {
    if (row === 0) {
      dir_down = true;
    }
    if (row === key - 1) {
      dir_down = false;
    }

    rail[row][col] = "*";
    col += 1;

    if (dir_down) {
      row += 1;
    } else {
      row -= 1;
    }
  }

  let index = 0;
  for (let i = 0; i < key; i++) {
    for (let j = 0; j < cipher.length; j++) {
      if (rail[i][j] === "*" && index < cipher.length) {
        rail[i][j] = cipher[index++];
      }
    }
  }

  let result = [];
  [row, col] = [0, 0];
  for (let i = 0; i < cipher.length; i++) {
    if (row === 0) {
      dir_down = true;
    }
    if (row === key - 1) {
      dir_down = false;
    }

    if (rail[row][col] !== "*") {
      result.push(rail[row][col++]);
    }

    if (dir_down) {
      row++;
    } else {
      row--;
    }
  }

  return result.join("");
};

export default RailFenceEach8LetterDecrypt;
