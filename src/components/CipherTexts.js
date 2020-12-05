import React, { useState } from "react";

function CipherTexts(props) {
  const [inputText, setInputText] = useState("");

  function onAdd() {
    if (inputText.length === 0) {
      alert("wrong!, missing input");
      return false;
    }

    props.onAddCiphers(inputText);
    setInputText("");
  }

  return (
    <div>
      <textarea
        style={{ marginTop: "30px" }}
        placeholder="Cipher Text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        rows="2"
      />
      <div>
        <button onClick={onAdd}>
          {" "}
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}

export default CipherTexts;
