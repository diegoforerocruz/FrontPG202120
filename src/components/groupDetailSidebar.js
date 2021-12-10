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
  useEffect(() => {
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
