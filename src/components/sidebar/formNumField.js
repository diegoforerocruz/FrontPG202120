import React, { useEffect, useState } from "react";

const FormNumField = (props) => {
  const [lowerLimit, setlowerLimit] = useState(null);
  const [upperLimit, setupperLimit] = useState(null);
  const [specific, setSpecific] = useState({
    variable: props.namevar,
    limiteinf: lowerLimit,
    limitesup: upperLimit,
    igual: null,
    tipo: "C",
  });

  const handleChangeLower = (value) => {
    setlowerLimit(value);
  };

  const handleChangeSpecific = (a, b) => {
    setSpecific({
      variable: specific.variable,
      limiteinf: a,
      limitesup: b,
      igual: null,
      tipo: "C",
    });
  };

  const handleChangeUpper = (value) => {
    setupperLimit(value);
  };

  const hacer = () => {
    let arr = [];
    for (let i = 0; i < props.createObject.lenght; i++) {
      if (props.createObject[i].variable != props.namevar) {
        arr.push(props.createObject[i]);
      }
    }

    arr.push(specific);
    props.setcreateObject(arr);
  };

  useEffect(() => {}, []);

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
              handleChangeSpecific(e.target.value, upperLimit);
              hacer();
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
              handleChangeSpecific(lowerLimit, e.target.value);
              hacer();
            }}
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default FormNumField;
