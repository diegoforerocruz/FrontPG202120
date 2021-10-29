import React, { useState, useEffect } from "react";
import { ArrowsAngleContract } from "react-bootstrap-icons";

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

let fullList = [
  { value: "IQ12", label: "IQ12", tipo: "C" },
  { value: "IQ6", label: "IQ6", tipo: "C" },
  { value: "Estudios", label: "Estudios", tipo: "C" },
  { value: "PC", label: "PC", tipo: "N" },
];

let standardVars = [
  { value: "Peso", label: "Peso", tipo: "N" },
  { value: "Talla", label: "Talla", tipo: "N" },
  { value: "Ali", label: "Ali", tipo: "C" },
];

const Groupform = () => {
  const [selectValue, setSelectValue] = useState(null);
  const [fList, setFList] = useState(fullList);
  const [inputCatFields, setInputCatFields] = useState([]);

  const handleChange = (value) => {
    setSelectValue(value);
  };

  const handleChangeCat = (name, value) => {
    let arr = [];
    inputCatFields.map((field) => {
      if (field.variable != name) {
        arr.push(field);
      }
    });
    let valor;
    if (value == null) {
      valor = null;
    } else {
      valor = value.value;
    }
    setInputCatFields([
      ...arr,
      {
        variable: name,
        limiteinf: null,
        limitesup: null,
        igual: valor,
        tipo: "C",
      },
    ]);
  };

  const handleVarAdding = (pvariable) => {
    if (pvariable != null) {
      let index;
      fList.map((item) => {
        if (pvariable.value == item.value) {
          standardVars.push(pvariable);
          index = fList.indexOf(pvariable);
          setSelectValue(null);

          setFList(fullList);
        }
      });
      let arr = [];
      for (let i = 0; i < fList.length; i++) {
        if (i != index) {
          arr.push(fList[i]);
        }
      }
      setFList(arr);
    }
  };

  const handleVarDeleting = (pvariable) => {
    if (pvariable != null) {
      let arr2 = [];
      inputCatFields.map((field) => {
        if (field.variable != pvariable.label) {
          arr2.push(field);
        }
      });
      setInputCatFields(arr2);
      let index;
      standardVars.map((item) => {
        if (pvariable.value == item.value) {
          fList.push(pvariable);

          index = standardVars.indexOf(pvariable);
          setSelectValue(null);
        }
      });
      let arr = [];
      for (let i = 0; i < standardVars.length; i++) {
        if (i != index) {
          arr.push(standardVars[i]);
        }
      }
      standardVars = arr;
    }
  };

  const getnumfieldsdata = () => {
    let arr = [];
    standardVars.map((item) => {
      let down;
      let up;
      if (item.tipo == "N") {
        down = parseInt(
          document.getElementById(`lowerlimit${item.label}`).value
        );
        if (down != down) {
          down = null;
        }

        up = parseInt(document.getElementById(`upperlimit${item.label}`).value);
        if (up != up) {
          up = null;
        }
        let jobj = {
          variable: item.label,
          limiteinf: down,
          limitesup: up,
          igual: null,
          tipo: "N",
        };
        if (up != null || down != null) {
          arr.push(jobj);
        }
      }
    });
    inputCatFields.map((field) => {
      arr.push(field);
    });
    let ng = document.getElementById("nombre1").value;
    if (ng == "") {
      ng = "grupo sin nombre";
    }
    let postbody = {
      nombregrupo: ng,
      variables: arr,
    };
    console.log(postbody);
    console.log(arr);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="">
        <h5>Crear Grupo</h5>
      </div>
      <div className="row">
        <div className="col-5 offset-1">
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            del Vars
          </button>
        </div>
        <div className="col-5 ">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            add Vars
          </button>
        </div>
      </div>

      <form>
        <div className="groupform">
          <div className="innerformcontent">
            <div className="mb-3">
              <h5>Nombre del grupo</h5>
              <input
                className="form-control"
                type="text"
                id="nombre1"
                aria-describedby="emailHelp"
              />
            </div>
            {standardVars.map((vname) => {
              if (vname.tipo == "N") {
                return (
                  <div className="mb-3" key={vname.label}>
                    <div>
                      <h5>{vname.label}</h5>
                    </div>
                    <div className="row">
                      <div className="col-4  namevar">
                        <p className="align-middle">Desde:</p>
                      </div>
                      <div className="col-8 ">
                        <input
                          type="number"
                          id={`lowerlimit${vname.label}`}
                          className="form-control"
                          aria-describedby="lowerlimit"
                        />
                      </div>
                      <div className="col-4 ">
                        <p className="align-middle">Hasta:</p>
                      </div>
                      <div className="col-8 ">
                        <input
                          type="number"
                          id={`upperlimit${vname.label}`}
                          className="form-control"
                          aria-describedby="upperlimit"
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              } else {
                return (
                  <div className="mb-3" key={vname.label}>
                    <div>
                      <h5>{vname.label}</h5>
                    </div>
                    <Select
                      isClearable={true}
                      onChange={(value) => {
                        handleChangeCat(vname.label, value);
                      }}
                      aria-labelledby="aria-label"
                      inputId="aria-example-input"
                      name="aria-live-color"
                      options={colourOptions}
                    />
                    <hr />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </form>
      <button
        type=""
        className="btn btn-primary"
        onClick={() => {
          getnumfieldsdata();
        }}
      >
        Submit
      </button>
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalLabel">
                Agregar Variables
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Select
                isClearable={true}
                onChange={(value) => {
                  handleChange(value);
                }}
                aria-labelledby="aria-label"
                inputId="aria-example-input"
                name="aria-live-color"
                options={fList}
                id="selectagregarvariable"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  handleVarAdding(selectValue);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalLabel">
                Quitar Variables
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Select
                isClearable={true}
                onChange={(value) => {
                  handleChange(value);
                }}
                aria-labelledby="aria-label"
                inputId="aria-example-input"
                name="aria-live-color"
                options={standardVars}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  handleVarDeleting(selectValue);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groupform;
