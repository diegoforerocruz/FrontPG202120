import React, { useState } from "react";
import "./sidebar.css";
import Groupform from "./groupform";

const GroupsItem = (props) => {
  const [isChecked, setIsChecked] = useState(1);

  const handleCheckBox = () => {
    if (isChecked == 1) {
      setIsChecked(0);
    } else {
      setIsChecked(1);
    }
    props.hCheck(props.name, isChecked);
  };

  return (
    <div className="row my-2 lenghtgrupos" key={props.name}>
      <div className="col-1">
        <input
          className="form-check-input"
          type="checkbox"
          id="checkboxNoLabel"
          value=""
          onClick={() => {
            handleCheckBox();
          }}
        />
      </div>

      <div className="col">
        <button
          className="btn btn-light buttongrupos"
          onClick={() => {
            props.hClick(props.name);
          }}
        >
          {props.name}
        </button>
      </div>
    </div>
  );
};

export default GroupsItem;
