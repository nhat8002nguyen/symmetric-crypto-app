const RailFenceEach8LetterEncrypt = (key, text) => {
  let paragraphResults = [];
  let paragraphs = text.split("\n");

  paragraphs.forEach((paragraph) => {
    let paragraphResult = [];

    for (let i = 0; i < paragraph.length; i = i + 8) {
      let aBlock8letter =
        i + 8 <= paragraph.length
          ? paragraph.slice(i, i + 8)
          : paragraph.slice(i, paragraph.length);
      paragraphResult.push(RailFenceEncrypt(key, aBlock8letter));
    }

    paragraphResults.push(paragraphResult.join(""));
  });

  return paragraphResults.join("\n");
};

const RailFenceEncrypt = (key, text) => {
  let rail = [];

  for (let i = 0; i < key; i++) {
    for (let j = 0; j < text.length; j++) {
      rail.push([]);
      rail[i][j] = "\n";
    }
  }

  let dir_down = false;
  let [row, col] = [0, 0];

  for (let i = 0; i < text.length; i++) {
    if (row === 0 || row === key - 1) {
      dir_down = !dir_down;
    }

    rail[row][col++] = text[i];

    dir_down ? row++ : row--;
  }

  let result = [];
  for (let i = 0; i < key; i++) {
    for (let j = 0; j < text.length; j++) {
      if (rail[i][j] !== "\n") {
        result.push(rail[i][j]);
      }
    }
  }

  return result.join("");
};

export default RailFenceEach8LetterEncrypt;
