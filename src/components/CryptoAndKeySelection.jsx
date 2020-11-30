import React, { useState } from "react";
import Select from "react-select";

const CryptoAndKeySelection = (props) => {
  const [cryptoMethod, setCryptoMethod] = useState("");
  const [key, setKey] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const methodOptions = [
    { value: "Single Character", label: "Single Character" },
    { value: "Permutation", label: "Permutation" },
    { value: "Multiple", label: "Multiple" },
  ];

  return (
    <div className="form">
      <div id="select">
        <Select
          placeholder="Symmetric Crypto Method"
          options={methodOptions}
          onChange={(e) => {
            setCryptoMethod(e.value);
            setConfirmed(false);
          }}
        />
      </div>

      <input
        id="key"
        type="text"
        placeholder="key"
        autoComplete="off"
        onChange={(e) => {
          setKey(e.target.value);
          setConfirmed(false);
        }}
      />

      <button
        onClick={() => {
          if (!cryptoMethod || parseInt(key, 10).toString() !== key) {
            alert("Method or key is wrong!, please re-enter");
            return false;
          }

          props.onUpdate(cryptoMethod, key);
          setConfirmed(true);
        }}
      >
        <span style={{ backgroundColor: confirmed ? "green" : "red" }}>
          Confirm Method And Key
        </span>
      </button>
    </div>
  );
};

export default CryptoAndKeySelection;
