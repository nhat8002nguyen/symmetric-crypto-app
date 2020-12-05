import React, { useState } from "react";

function CipherText2(props) {
  const [inputText, setInputText] = useState("");

  function onAdd() {
    if (inputText.length === 0) {
      alert("wrong!, missing input");
      return false;
    }

    props.onConfirm(inputText);
    setInputText("");
  }

  return (
    <div>
      <textarea
        style={{ marginTop: "30px" }}
        placeholder={props.onChangePlaceHolder(props.typeCipher)}
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        rows="2"
      />
      <div>
        <button onClick={onAdd}>
          {" "}
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );
}

export default CipherText2;
