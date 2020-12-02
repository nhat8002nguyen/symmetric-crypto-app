import React, { useState } from "react";

function InputTextOrFile(props) {
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  function onFileChange(e) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;

      setSelectedFile(text);

      console.log("text in file: " + text);
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0]);
    }

    setInputText(selectedFile);

    setUploaded(false);
  }

  function onClickedUpload() {
    if (inputText.length === 0 && !selectedFile) {
      alert("wrong!, missing input");
      return false;
    }

    setUploaded(true);

    props.onUpdate(inputText);
  }

  return (
    <div>
      <textarea
        style={{ marginTop: "30px" }}
        placeholder="Plain Text / Cipher Text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setUploaded(false);
        }}
        rows="4"
      />
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onClickedUpload}>
          <span style={{ backgroundColor: uploaded ? "green" : "red" }}>
            Upload
          </span>
        </button>
      </div>
    </div>
  );
}

export default InputTextOrFile;
