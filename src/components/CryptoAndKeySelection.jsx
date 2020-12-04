import React, { useState } from "react";
import Select from "react-select";

const CryptoAndKeySelection = (props) => {
  const [cryptoMethod, setCryptoMethod] = useState("");
  const [key, setKey] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const methodOptions = [
    { value: "Caesar Cipher", label: "Caesar Cipher" },
    { value: "Rail Fence", label: "Rail Fence" },
    { value: "combination", label: "Combination" },
  ];

  function handleChangeKey(e) {
    setKey(e.target.value);
    setConfirmed(false);
  }

  function handleClick() {
    const keyValue = parseInt(key, 10);
    if (cryptoMethod === "Caesar Cipher") {
      if (keyValue < 0 || keyValue > 25) {
        alert("Key value should in [0, 25]. ");
        return false;
      }
    } else {
      if (keyValue < 2 || keyValue > 7) {
        alert("Key value should in [2, 7]");
        return false;
      }
    }

    if (!cryptoMethod || parseInt(key, 10).toString() !== key) {
      alert("Method or key is wrong!, please re-enter");
      return false;
    }

    props.onUpdate(cryptoMethod, key);
    setConfirmed(true);
  }

  return (
    <div className="form">
      <div id="select">
        <Select
          placeholder="Symmetric Crypto Method"
          options={methodOptions}
          onChange={(e) => {
            setCryptoMethod(e.value);
            setKey("");
            setConfirmed(false);
          }}
        />
      </div>

      <input
        id="key"
        type="text"
        placeholder={
          cryptoMethod === "Caesar Cipher" ? "key: 0 - 25" : "key: 2 - 7"
        }
        autoComplete="off"
        onChange={handleChangeKey}
        value={key}
      />

      <button onClick={handleClick}>
        <span style={{ backgroundColor: confirmed ? "green" : "red" }}>
          Confirm Method And Key
        </span>
      </button>
    </div>
  );
};

export default CryptoAndKeySelection;
