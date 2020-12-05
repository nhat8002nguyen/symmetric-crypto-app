import React, { useState } from "react";
import CryptoAndKeySelection from "./CryptoAndKeySelection";
import { saveAs, encodeBase64 } from "@progress/kendo-file-saver";
import InputTextOrFile from "./InputTextOrFile";
import CryptoSelect from "./CryptoSelect";
import CipherTexts from "./CipherTexts";
import CipherText2 from "./CipherText2";
import Encrypt from "../actions/Encrypt";
import Decrypt from "../actions/Decrypt";
import DecryptSameMethod from "../actions/DecryptSameMethod";
import DecryptSameKey from "../actions/DecryptSameKey";

function App() {
  const [methodAndKey, setMethodAndKey] = useState({
    cryptoMethod: "",
    key: "",
  });
  const [content, setContent] = useState("");
  const [output, setOutput] = useState("");
  const [method2, setMethod2] = useState("");
  const [ciphers, setCiphers] = useState([]);
  const [DecryptSameMethodOutput, setDecryptSameMethodOutput] = useState([]);
  const [sameKeyCipher1, setSameKeyCipher1] = useState("");
  const [sameKeyCipher2, setSameKeyCipher2] = useState("");
  const [sameKeyCipher3, setSameKeyCipher3] = useState("");
  const [DecryptSameKeyOutput, SetDecryptSameKeyOutput] = useState("");

  function handleEncrypt(e) {
    try {
      setOutput(
        "ENCRYPTION OUTPUT:" +
          "\n" +
          Encrypt(
            methodAndKey.cryptoMethod,
            parseInt(methodAndKey.key, 10),
            content
          )
      );
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
      setOutput(
        "DECRYPTION OUTPUT:" +
          "\n" +
          Decrypt(
            methodAndKey.cryptoMethod,
            parseInt(methodAndKey.key, 10),
            content
          )
      );
    } catch (e) {
      alert(e);
    }
  }

  function saveOutputAs() {
    try {
      if (output) {
        const dataURI = "data:text/plain;base64," + encodeBase64(output);
        saveAs(dataURI, "undefined.txt");
      } else {
        alert("Output not found.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addCipher(cipher) {
    setCiphers((prevValue) => {
      return [...prevValue, cipher];
    });
  }

  function HandleDecryptSameMethod() {
    if (!method2 || ciphers.length <= 1) {
      alert("Missing input! or input must > 1");
      return null;
    }
    setDecryptSameMethodOutput(DecryptSameMethod(method2, ciphers));
  }

  function saveOutputAs2() {
    try {
      if (DecryptSameMethodOutput.length > 1) {
        const dataURI =
          "data:text/plain;base64," +
          encodeBase64(
            String(
              DecryptSameMethodOutput.map((output) => {
                return output.keys + "\n" + output.plainText + "\n";
              })
            )
          );
        saveAs(dataURI, "undefined.txt");
      } else {
        alert("Output not found.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleDecryptSameKey() {
    const result = DecryptSameKey(
      sameKeyCipher1,
      sameKeyCipher2,
      sameKeyCipher3
    );
    if (result) {
      SetDecryptSameKeyOutput(
        "plaintext: " + result.plainText + "\n" + "key:" + result.key
      );
    } else {
      alert("Not have output ");
    }
  }

  return (
    <div>
      <table>
        <tr>
          <td>
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
                <InputTextOrFile onUpdate={(input) => setContent(input)} />
                <hr></hr>
                <div>
                  <button id="action" onClick={handleEncrypt}>
                    <span>Encrypt</span>
                  </button>
                  <button id="action" onClick={handleDecrypt}>
                    <span>Decrypt</span>
                  </button>
                </div>

                <textarea
                  name="outputPart"
                  id="OP"
                  style={{ marginTop: "30px", backgroundColor: "#e6e6e6" }}
                  value={output}
                  rows="4"
                  readOnly={true}
                />

                <div>
                  <button id="action" onClick={() => setOutput("")}>
                    <span>Clear</span>
                  </button>
                  <button id="action" onClick={saveOutputAs}>
                    <span>Save As</span>
                  </button>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="container">
              <div className="heading">
                <h1>Decrypt Same key</h1>
              </div>
              <div className="form">
                <CipherText2
                  onConfirm={(cipher) => setSameKeyCipher1(cipher)}
                  onChangePlaceHolder={(type) => type}
                  typeCipher={"Caesar Cipher"}
                />
                <CipherText2
                  onConfirm={(cipher) => setSameKeyCipher2(cipher)}
                  onChangePlaceHolder={(type) => type}
                  typeCipher={"Rail Fence Cipher"}
                />
                <CipherText2
                  onConfirm={(cipher) => setSameKeyCipher3(cipher)}
                  onChangePlaceHolder={(type) => type}
                  typeCipher={"Combincation Cipher"}
                />
                <hr></hr>
                <div>
                  <button id="action" onClick={handleDecryptSameKey}>
                    <span>Decrypt</span>
                  </button>
                </div>

                <textarea
                  name="outputPart"
                  id="OP"
                  style={{ marginTop: "30px", backgroundColor: "#e6e6e6" }}
                  value={DecryptSameKeyOutput}
                  rows="3"
                  readOnly={true}
                />

                <div>
                  <button
                    id="action"
                    onClick={() => SetDecryptSameKeyOutput("")}
                  >
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="container">
              <div className="heading">
                <h1>Decrypt Same Method</h1>
              </div>
              <div className="form">
                <CryptoSelect onUpdate={(method) => setMethod2(method)} />
                <hr></hr>
                <CipherTexts onAddCiphers={addCipher} />
                <textarea
                  name="outputPart"
                  style={{ marginTop: "30px", backgroundColor: "#e6e6e6" }}
                  value={ciphers.map((cipher) => {
                    return cipher + "\n";
                  })}
                  rows="2"
                  readOnly={true}
                />
                <button id="action" onClick={() => setCiphers([])}>
                  <span>Clear Input</span>
                </button>
                <hr></hr>
                <div>
                  <button id="action" onClick={HandleDecryptSameMethod}>
                    <span>Decrypt Same Method</span>
                  </button>
                </div>

                <textarea
                  name="outputPart"
                  id="OP"
                  style={{ marginTop: "30px", backgroundColor: "#e6e6e6" }}
                  value={DecryptSameMethodOutput.map((output) => {
                    return output.keys + "\n" + output.plainText + "\n\n";
                  })}
                  rows="4"
                  readOnly={true}
                />

                <div>
                  <button
                    id="action"
                    onClick={() => setDecryptSameMethodOutput([])}
                  >
                    <span>Clear</span>
                  </button>
                  <button id="action" onClick={saveOutputAs2}>
                    <span>Save As</span>
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
