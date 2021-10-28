import React, { useEffect, useState } from "react";
import Select from "react-select";

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

const FormCatField = (props) => {
  const [selectValue, setSelectValue] = useState(null);

  const handleChange = (value) => {
    setSelectValue(value);
  };

  useEffect(() => {}, []);
  //console.log(selectValue);

  return (
    <div className="mb-3">
      <div>
        <h5>{props.namevar}</h5>
      </div>
      <Select
        isClearable={true}
        onChange={(value) => {
          handleChange(value);
        }}
        aria-labelledby="aria-label"
        inputId="aria-example-input"
        name="aria-live-color"
        options={colourOptions}
      />
      <hr />
    </div>
  );
};

export default FormCatField;
