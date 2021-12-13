import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import "./detailsidebar.css";

const GroupDetailSidebar = (props) => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const [groupDetail, setGroupDetail] = useState([]);

  const calculateDetail = () => {
    if (props.groupInfo != null && props.groupInfo != undefined) {
      let arr = [];
      let etapas = [];
      props.groupInfo.info.map((item) => {
        if (!etapas.includes(item.etapa)) {
          etapas.push(item.etapa);
        }
      });
      etapas.map((etapa) => {
        let aux = [];
        props.groupInfo.info.map((item) => {
          if (etapa == item.etapa) {
            aux.push(item);
          }
        });
        arr.push(aux);
      });
      setGroupDetail([...arr]);
    }
  };
  const onSetSidebarOpen = (open) => {
    setsidebarOpen(open);
  };

  const resetInputValues = () => {
    let etapasArr = ["semana 40", "mes 3", "mes 6", "mes 9", "mes 12"];
    etapasArr.map((item) => {
      if (document.getElementById(`cambio1${item}`) != null)
        document.getElementById(`cambio1${item}`).value = 0;
      if (document.getElementById(`cambio2${item}`) != null)
        document.getElementById(`cambio2${item}`).value = 0;
    });
  };

  const handleUpdate = async (etapa, cambio1, cambio2) => {
    if (cambio1 != "" && cambio2 != "") {
      if (cambio1 !== cambio2) {
        try {
          const response = await fetch(
            "http://localhost:5000/analisis/handleGroupUpdate/" +
              props.groupInfo.nombre +
              "/" +
              etapa +
              "/" +
              cambio1 +
              "/" +
              cambio2
          );
          const jsonData = await response.json();
          window.location.reload();
          alert(
            "Ya se realizó el cambio, seleccione el grupo" +
              props.groupInfo.nombre
          );
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  };

  useEffect(() => {
    resetInputValues();
    calculateDetail();
  }, [props]);

  return (
    <Sidebar
      sidebar={
        <div className="my-2 mx-2">
          <h4>Información de los Clusters</h4>
          <hr />
          {groupDetail.map((etapa) => {
            return (
              <div key={`${etapa[0].etapa}`}>
                <div className="card">
                  <div className="card-body tableContainer">
                    <h6>{etapa[0].etapa}</h6>
                    <table className="table">
                      <thead>
                        <tr>
                          {Object.keys(etapa[0]).map((header) => {
                            if (header != "etapa") {
                              return (
                                <th scope="col" key={`header${header}`}>
                                  {header}
                                </th>
                              );
                            }
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {etapa.map((element) => {
                          return (
                            <tr key={`row${element.labels}`}>
                              {Object.entries(element).map((entry) => {
                                if (entry[0] != "etapa") {
                                  return (
                                    <td key={`${entry[0]}-${entry[1]}`}>
                                      {entry[1]}
                                    </td>
                                  );
                                }
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="row my-4">
                      <div className="offset-1 col-2">
                        <input
                          id={`cambio1${etapa[0].etapa}`}
                          type="number"
                          className="form-control "
                          aria-label="firstToChange"
                          min={0}
                          max={props.numberLimit}
                        />
                      </div>
                      <span className="col-1 py-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-left-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
                          />
                        </svg>
                      </span>
                      <div className="col-2">
                        <input
                          id={`cambio2${etapa[0].etapa}`}
                          type="number"
                          className="form-control "
                          aria-label="secondToChange"
                          min={0}
                          max={props.numberLimit}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-success col-3"
                        onClick={() =>
                          handleUpdate(
                            etapa[0].etapa,
                            document.getElementById(`cambio1${etapa[0].etapa}`)
                              .value,
                            document.getElementById(`cambio2${etapa[0].etapa}`)
                              .value
                          )
                        }
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{ sidebar: { background: "white", width: "50%" } }}
      pullRight={true}
    >
      <div className="row mx-2 my-4">
        <div className="col-10 align-self-start">
          <h3>Analisis Grupo {props.groupInfo.nombre}</h3>
        </div>
        <div className=" col-2 float-right">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSetSidebarOpen(true)}
          >
            Info. Clusters
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

export default GroupDetailSidebar;
