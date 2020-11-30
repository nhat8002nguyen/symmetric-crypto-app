import React, { useState } from "react";
import axios from "axios";

function InputTextOrFile(props) {
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  function onFileChange(e) {
    setSelectedFile(e.target.files[0]);
    setUploaded(false);
  }

  function onClickedUpload() {
    if (inputText.length === 0 && !selectedFile) {
      alert("wrong!, missing input");
      return false;
    }

    setUploaded(true);
    if (selectedFile) {
      const formData = new FormData();

      // Update the formData object
      formData.append("myFile", selectedFile, selectedFile.name);

      // Details of the uploaded file
      console.log(selectedFile);
      // Request made to the backend api
      // Send formData object
      axios.post("api/uploadfile", formData);

      props.onUpdate("file", selectedFile.name);
    } else {
      props.onUpdate("text", inputText);
    }
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
