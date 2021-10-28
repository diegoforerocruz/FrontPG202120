import React, { useState, useEffect } from "react";
import FormNumField from "./formNumField";
import FormCatField from "./formCatField";
import Select from "react-select";

let fullList = [
  { value: "iq12", label: "IQ 12 meses", tipo: "C" },
  { value: "iq6", label: "IQ 6 meses", tipo: "C" },
  { value: "estudios", label: "Estudios", tipo: "C" },
  { value: "pc", label: "Perimetro Cefalico", tipo: "N" },
];

let standardVars = [
  { value: "peso", label: "Peso", tipo: "N" },
  { value: "talla", label: "Talla", tipo: "N" },

  { value: "ali", label: "Alimentación", tipo: "C" },
];

const Groupform = () => {
  const [selectValue, setSelectValue] = useState(null);
  const [fList, setFList] = useState(fullList);

  const handleChange = (value) => {
    setSelectValue(value);
  };

  const handleVarAdding = () => {
    if (selectValue != null) {
      let index;
      fList.map((item) => {
        if (selectValue.value == item.value) {
          standardVars.push(selectValue);
          index = fList.indexOf(selectValue);
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

  const handleVarDeleting = () => {
    if (selectValue != null) {
      let index;
      standardVars.map((item) => {
        if (selectValue.value == item.value) {
          fList.push(selectValue);

          index = standardVars.indexOf(selectValue);
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

  const showstatus = () => {
    console.log("estado");
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
            {standardVars.map((vname) => {
              if (vname.tipo == "N") {
                return (
                  <FormNumField
                    key={`${vname.label}input`}
                    namevar={vname.label}
                  />
                );
              } else {
                return (
                  <FormCatField
                    key={`${vname.label}input`}
                    namevar={vname.label}
                  />
                );
              }
            })}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            showstatus();
          }}
        >
          Submit
        </button>
      </form>
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
                  handleVarAdding();
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
                  handleVarDeleting();
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
