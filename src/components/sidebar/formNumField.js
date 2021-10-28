import React, { useEffect, useState } from "react";

const FormNumField = (props) => {
  const [lowerLimit, setlowerLimit] = useState(null);
  const [upperLimit, setupperLimit] = useState(null);

  const handleChangeLower = (value) => {
    setlowerLimit(value);
  };

  const handleChangeUpper = (value) => {
    setupperLimit(value);
  };
  useEffect(() => {}, []);

  //console.log(lowerLimit);
  //console.log(upperLimit);
  return (
    <div className="mb-3">
      <div>
        <h5>{props.namevar}</h5>
      </div>
      <div className="row">
        <div className="col-4  namevar">
          <p className="align-middle">Desde:</p>
        </div>
        <div className="col-8 ">
          <input
            type="number"
            id={`lowerlimit${props.namevar}`}
            className="form-control"
            aria-describedby="lowerlimit"
            onChange={(e) => {
              handleChangeLower(e.target.value);
            }}
          />
        </div>
        <div className="col-4 ">
          <p className="align-middle">Hasta:</p>
        </div>
        <div className="col-8 ">
          <input
            type="number"
            id={`upperlimit${props.namevar}`}
            className="form-control"
            aria-describedby="upperlimit"
            onChange={(e) => {
              handleChangeUpper(e.target.value);
            }}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default FormNumField;
