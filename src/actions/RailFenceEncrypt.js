const RailFenceEach8LetterEncrypt = (key, text) => {
  let result = [];

  for (let i = 0; i < text.length; i = i + 8) {
    let aBlock8letter =
      i + 8 <= text.length ? text.slice(i, i + 8) : text.slice(i, text.length);
    result.push(RailFenceEncrypt(key, aBlock8letter));
  }

  return result.join("");
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
