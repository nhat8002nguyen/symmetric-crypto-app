import React, { useState } from "react";
import Select from "react-select";

function CryptoSelect(props) {
  const [cryptoMethod, setCryptoMethod] = useState("");
  const methodOptions = [
    { value: "Caesar Cipher", label: "Caesar Cipher" },
    { value: "Rail Fence", label: "Rail Fence" },
    { value: "combination", label: "Combination" },
  ];

  return (
    <div className="form">
      <div id="select">
        <Select
          placeholder="Symmetric Crypto Method"
          options={methodOptions}
          onChange={(e) => {
            setCryptoMethod(e.value);
            props.onUpdate(e.value);
          }}
        />
      </div>
    </div>
  );
}

export default CryptoSelect;
