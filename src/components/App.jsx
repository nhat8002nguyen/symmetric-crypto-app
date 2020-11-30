import React, { useState } from "react";
import CryptoAndKeySelection from "./CryptoAndKeySelection";
import { saveAs, encodeBase64 } from "@progress/kendo-file-saver";
import InputTextOrFile from "./InputTextOrFile";
import Encrypt from "../actions/Encrypt";
import Decrypt from "../actions/Decrypt";

function App() {
  const [methodAndKey, setMethodAndKey] = useState({
    cryptoMethod: "",
    key: "",
  });
  const [content, setContent] = useState("");
  const [outputCipher, setOutputCipher] = useState("");

  function handleEncrypt(e) {
    try {
      setOutputCipher(
        "ENCRYPTION OUTPUT:  " +
          Encrypt(methodAndKey.cryptoMethod, methodAndKey.key, content)
      );

      console.log(outputCipher);
    } catch (error) {
      if (
        !methodAndKey.cryptoMethod ||
        !(parseInt(methodAndKey.key) == methodAndKey.key) ||
        content.length === 0
      )
        alert("Something wrong!. Are you miss method or key or input.");
      console.log(error);
    }
  }

  function handleDecrypt(e) {
    try {
      Decrypt(methodAndKey.cryptoMethod, methodAndKey.key, content);
    } catch (e) {
      alert(e);
    }
  }

  function saveOutputAs() {
    try {
      if (outputCipher) {
        const dataURI = "data:text/plain;base64," + encodeBase64(outputCipher);
        saveAs(dataURI, "undefined.txt");
      } else {
        alert("Output not found.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>Crypto App MMANM</h1>
      </div>
      <div className="form">
        <CryptoAndKeySelection
          onUpdate={(method, key) =>
            setMethodAndKey({ cryptoMethod: method, key: key })
          }
        />
        <hr></hr>
        <InputTextOrFile
          onUpdate={(type, input) =>
            setContent(type === "text" ? input : "Text File: " + input + ".txt")
          }
        />
        <hr></hr>

        <textarea
          name="displayOutput"
          style={{ marginTop: "30px", backgroundColor: "#e6e6e6" }}
          value={outputCipher}
          rows="4"
          readOnly={true}
        />
        <button id="action" onClick={saveOutputAs}>
          <span>saveAs</span>
        </button>
        <div>
          <button id="action" onClick={handleEncrypt}>
            <span>Encrypt</span>
          </button>
          <button id="action" onClick={handleDecrypt}>
            <span>Decrypt</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
