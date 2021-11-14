import React, { useState, useEffect } from "react";
import "./sidebar/sidebar.css";
import data from "./sidebar/fakedatagroups";
import Groupdetail from "./groupdetail";
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
let populationList = [
  { value: "IQ12", label: "IQ12", tipo: "C" },
  { value: "IQ6", label: "IQ6", tipo: "C" },
  { value: "Estudios", label: "Estudios", tipo: "C" },
  { value: "PC", label: "PC", tipo: "N" },
  { value: "Peso", label: "Peso", tipo: "N" },
  { value: "Talla", label: "Talla", tipo: "N" },
  { value: "Ali", label: "Ali", tipo: "C" },
];
let populationVarList = [...populationList];
let standardPopulationVarList = [];
let analisisList = [
  { value: "IQ12", label: "IQ12", tipo: "C" },
  { value: "IQ6", label: "IQ6", tipo: "C" },
  { value: "Estudios", label: "Estudios", tipo: "C" },
  { value: "PC", label: "PC", tipo: "N" },
  { value: "Peso", label: "Peso", tipo: "N" },
  { value: "Talla", label: "Talla", tipo: "N" },
  { value: "Ali", label: "Ali", tipo: "C" },
];
let analisisVarList = [...analisisList];
let standardAnalisisVarList = [];

const GroupManage = () => {
  const [grupoClicked, setgrupoClicked] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
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

  const handleVarAddingPopulation = (pvariable) => {
    if (pvariable != null) {
      let index;
      populationVarList.map((item) => {
        if (pvariable.value == item.value) {
          standardPopulationVarList.push(pvariable);
          index = populationVarList.indexOf(pvariable);
          setSelectValue(null);
        }
      });
      let arr = [];
      for (let i = 0; i < populationVarList.length; i++) {
        if (i != index) {
          arr.push(populationVarList[i]);
        }
      }
      populationVarList = arr;
    }
  };

  const handleVarDeletingPopulation = (pvariable) => {
    if (pvariable != null) {
      let arr2 = [];
      inputCatFields.map((field) => {
        if (field.variable != pvariable.label) {
          arr2.push(field);
        }
      });
      setInputCatFields(arr2);
      let index;
      standardPopulationVarList.map((item) => {
        if (pvariable.value == item.value) {
          populationVarList.push(pvariable);
          index = standardPopulationVarList.indexOf(pvariable);
          setSelectValue(null);
        }
      });
      let arr = [];
      for (let i = 0; i < standardPopulationVarList.length; i++) {
        if (i != index) {
          arr.push(standardPopulationVarList[i]);
        }
      }
      standardPopulationVarList = arr;
    }
  };

  const handleVarAddingAnalisis = (pvariable) => {
    if (pvariable != null) {
      let index;
      analisisVarList.map((item) => {
        if (pvariable.value == item.value) {
          standardAnalisisVarList.push(pvariable);
          index = analisisVarList.indexOf(pvariable);
          setSelectValue(null);
        }
      });
      let arr = [];
      for (let i = 0; i < analisisVarList.length; i++) {
        if (i != index) {
          arr.push(analisisVarList[i]);
        }
      }
      analisisVarList = arr;
    }
  };

  const handleVarDeletingAnalisis = (pvariable) => {
    if (pvariable != null) {
      let index;
      standardAnalisisVarList.map((item) => {
        if (pvariable.value == item.value) {
          analisisVarList.push(pvariable);
          index = standardAnalisisVarList.indexOf(pvariable);
          setSelectValue(null);
        }
      });
      let arr = [];
      for (let i = 0; i < standardAnalisisVarList.length; i++) {
        if (i != index) {
          arr.push(standardAnalisisVarList[i]);
        }
      }
      standardAnalisisVarList = arr;
    }
  };

  const getnumfieldsdata = () => {
    let arr = [];
    standardPopulationVarList.map((item) => {
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

    let cNum = document.getElementById("inputNumberClusters").value;
    if (cNum == "") {
      cNum = "1";
    }
    let postbody = {
      nombregrupo: ng,
      variables: arr,
      analisis: {
        clusterNum: parseInt(cNum),
        variables: standardAnalisisVarList,
      },
    };
    console.log(postbody);
    console.log(arr);
    document.getElementById("nombre1").value = "";
    populationVarList = [...populationList];
    standardPopulationVarList = [];
  };

  useEffect(() => {}, []);
  console.log(grupoClicked);
  return (
    <div className="row  mx-1">
      <div className="mx-1 my-2 sidebarwidth card col-3">
        <div className="card-body">
          <div className="row my-2 ">
            <h3 className="col-8">Grupos</h3>
            <button
              type="button"
              className="btn btn-success col-4"
              onClick={() => {
                setgrupoClicked(null);
              }}
            >
              Crear
            </button>
          </div>
          <div className="gestionGrupos ">
            {data.map((grupo) => {
              return (
                <div className="row my-2 lenghtgrupos" key={grupo.nombregrupo}>
                  <div className="col">
                    <button
                      className="btn btn-light buttongrupos"
                      onClick={() => {
                        setgrupoClicked(grupo);
                      }}
                    >
                      {grupo.nombregrupo}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-8 card mx-1 my-2 ">
        <div className="card-body">
          {grupoClicked == null ? (
            //Crear grupo
            <div>
              <h1>Crear grupo</h1>
              <form>
                <div className="my-1 row">
                  <label htmlFor="nombre1" className="col-2 col-form-label">
                    Nombre de grupo
                  </label>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control"
                      id="nombre1"
                      placeholder="Ejemplo: Analisis de IMC"
                    />
                  </div>
                </div>
                <hr />
                <div>
                  <h4>Delimitar Población</h4>
                  <div className="row">
                    <div className="col-5 offset-1">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#removeVarsPopulationModal"
                      >
                        del Vars
                      </button>
                    </div>
                    <div className="col-5 ">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#addVarsPopulationModal"
                      >
                        add Vars
                      </button>
                    </div>
                  </div>
                  <div>
                    {standardPopulationVarList.map((vname) => {
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
                <hr />
                <div>
                  <h4>Determinar variables</h4>
                  <div className="row">
                    <div className="col-5 offset-1">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#removeVarsAnalisisModal"
                      >
                        del Vars
                      </button>
                    </div>
                    <div className="col-5 ">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#addVarsAnalisisModal"
                      >
                        add Vars
                      </button>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-4">
                      <ul>
                        {standardAnalisisVarList.map((vname) => {
                          return (
                            <li
                              key={`analisisList-${vname.label}`}
                              id={`analisisListItem-${vname.label}`}
                              className="analisisListItem"
                            >
                              {vname.label}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="col-8">
                      <div className="row">
                        <label
                          htmlFor="inputNumberClusters"
                          className="col-4 col-form-label"
                        >
                          Número de Clusters
                        </label>
                        <div className="col-8">
                          <input
                            type="number"
                            className="form-control"
                            id="inputNumberClusters"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    getnumfieldsdata();
                  }}
                >
                  Generar grupos
                </button>
              </form>
              <Groupdetail groupInfo={grupoClicked} visibility={"d-none"} />
            </div>
          ) : (
            //Detail del grupo
            <Groupdetail groupInfo={grupoClicked} visibility={""} />
          )}
        </div>
      </div>
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*-------------------------------------------------MODAL------------------------------------------------*/}
      {/*--------------------------------MODAL add variables to population-------------------------------------*/}
      <div
        className="modal fade"
        id="addVarsPopulationModal"
        tabIndex="-1"
        aria-labelledby="addVarsPopulationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="addVarsPopulationModalLabel">
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
                options={populationVarList}
                id="selectAddVarPopulation"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  handleVarAddingPopulation(selectValue);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*--------------------------------MODAL remove variables to population-------------------------------------*/}
      <div
        className="modal fade"
        id="removeVarsPopulationModal"
        tabIndex="-1"
        aria-labelledby="removeVarsPopulationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="removeVarsPopulationModalLabel">
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
                options={standardPopulationVarList}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  handleVarDeletingPopulation(selectValue);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*--------------------------------MODAL add variables to analisis-------------------------------------*/}
      <div
        className="modal fade"
        id="addVarsAnalisisModal"
        tabIndex="-1"
        aria-labelledby="addVarsAnalisisModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="addVarsAnalisisModalLabel">
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
                options={analisisVarList}
                id="selectAddVarAnalisis"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  handleVarAddingAnalisis(selectValue);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*--------------------------------MODAL remove variables to analisis-------------------------------------*/}
      <div
        className="modal fade"
        id="removeVarsAnalisisModal"
        tabIndex="-1"
        aria-labelledby="removeVarsAnalisisModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="removeVarsAnalisisModalLabel">
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
                options={standardAnalisisVarList}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => {
                  handleVarDeletingAnalisis(selectValue);
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

export default GroupManage;
