import React, { useState, useEffect } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryGroup,
  VictoryLegend,
  VictoryScatter,
} from "victory";
import Select from "react-select";
import GroupDetailSidebar from "./groupDetailSidebar";
import { nacimientoVars } from "../data/nacimientovars";

const Groupdetail = (props) => {
  const [headers, setheaders] = useState(
    props.groupInfo != null && props.groupInfo != undefined
      ? Object.keys(props.groupInfo.info[0])
      : []
  );

  const [groupsInfo, setgroupsInfo] = useState(
    props.groupInfo != null && props.groupInfo != undefined
      ? props.groupInfo.info
      : []
  );
  const [dataToGraph, setdataToGraph] = useState([]);
  const [dataToGraphlvl2, setdataToGraphlvl2] = useState([]);
  const [labelsTG, setlabelsTG] = useState([]);
  const [selectedBar, setselectedBar] = useState(null);
  const [analisisVars, setanalisisVars] = useState("");
  const [additionalVars, setadditionalVars] = useState([]);
  const [avtg, setavtg] = useState([]);

  const handleBarSelection = (etapa, grupo) => {
    let arr = [props.groupInfo.nombre, etapa, grupo];
    setselectedBar([...arr]);
  };

  const formatjson = () => {
    let arr = [];
    let grupos = [];
    let grupos2 = [];
    if (props.groupInfo != null) {
      props.groupInfo.info.map((item) => {
        if (!grupos.includes(item.labels)) {
          grupos.push(item.labels);
        }
      });
      grupos.map((grupo) => {
        grupos2.push({ name: `${grupo}` });
      });
      grupos.map((grupo) => {
        let arrporgrupo = [];
        props.groupInfo.info.map((item) => {
          if (grupo == item.labels) {
            let jsonobj = {
              x: `${item.etapa}`,
              y: item.count,
              label: item.count,
              etapa: `${item.etapa}`,
              group: `${item.labels}`,
            };
            arrporgrupo.push(jsonobj);
          }
        });
        arr.push(arrporgrupo);
      });
    }
    setlabelsTG([...grupos2]);
    setdataToGraph([...arr]);
  };

  const formatjsonlevel2 = (backresponse) => {
    let arr = [];
    let grupos = [];
    let etapasGrupos = ["semana 40", "mes 3", "mes 6", "mes 9", "mes 12"];

    backresponse.datos.map((item) => {
      if (!grupos.includes(item.labels)) {
        grupos.push(item.labels);
      }
    });
    grupos.sort();
    grupos.map((grupo) => {
      let defaultArr = [];
      for (let i = 0; i < etapasGrupos.length; i++) {
        let index = -1;
        for (let j = 0; j < backresponse.datos.length; j++) {
          if (
            etapasGrupos[i] == backresponse.datos[j].etapa &&
            grupo == backresponse.datos[j].labels
          )
            index = j;
        }
        let jsonobj = null;
        if (index != -1) {
          jsonobj = backresponse.datos[index];
        } else {
          jsonobj = {
            etapa: etapasGrupos[i],
            count: 0,
            labels: grupo,
            etapanum: etapasGrupos[i],
          };
          let arrAV = analisisVars.split("--");
          arrAV.map((v) => {
            jsonobj[v] = 0;
          });
        }

        defaultArr.push(jsonobj);
      }

      arr.push(defaultArr);
    });
    setdataToGraphlvl2([...arr]);
    setavtg(backresponse.additional[0]);
  };

  const handleGroupHistory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/analisis/getgrouphistory/" +
          selectedBar[0] +
          "/" +
          selectedBar[1] +
          "/" +
          selectedBar[2] +
          "/" +
          analisisVars +
          "/" +
          additionalVars.join("-") +
          ""
      );
      const jsonData = await response.json();

      formatjsonlevel2(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAnalisisVars = () => {
    let arr = "";
    if (props.groupInfo != null && props.groupInfo != undefined) {
      Object.keys(props.groupInfo.info[0]).map((header) => {
        if (header.startsWith("maximo")) {
          const myArray = header.split("maximo");
          if (arr == "") {
            arr = arr + myArray[1];
          } else {
            arr = arr + "--" + myArray[1];
          }
        }
      });
      setanalisisVars(arr);
    }
  };

  useEffect(() => {
    formatjson();
    setdataToGraphlvl2([]);
    setselectedBar(null);
    handleAnalisisVars();
  }, [props]);

  return (
    <div className={props.visibility}>
      {props.groupInfo == null ? (
        <h3>Analisis Grupo</h3>
      ) : (
        <div className="my-5">
          <GroupDetailSidebar groupInfo={props.groupInfo} />
        </div>
      )}
      <div className="row">
        <div className="col-12 col-md-8">
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 50, y: 50 }}
            height={400}
            width={400}
          >
            <VictoryAxis style={{ tickLabels: { angle: -60 } }} />
            <VictoryAxis dependentAxis theme={VictoryTheme.material} />
            <VictoryLegend
              x={125}
              y={10}
              title="Clusters"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" } }}
              colorScale={"qualitative"}
              data={labelsTG}
            />
            <VictoryGroup
              horizontal
              offset={10}
              style={{ data: { width: 8 } }}
              colorScale={"qualitative"}
            >
              {dataToGraph.map((dtg) => {
                return (
                  <VictoryBar
                    key={`dataof${dtg[0].y}`}
                    barWidth={8}
                    events={[
                      {
                        target: "data",
                        eventHandlers: {
                          onClick: () => {
                            return [
                              {
                                target: "data",
                                mutation: (props) => {
                                  const fill = props.style && props.style.fill;
                                  if (fill != "black") {
                                    handleBarSelection(
                                      props.datum.etapa,
                                      props.datum.group
                                    );
                                  }
                                },
                              },
                            ];
                          },
                        },
                      },
                    ]}
                    data={dtg}
                  />
                );
              })}
            </VictoryGroup>
          </VictoryChart>
        </div>
        <div className="col-12 col-md-4 my-3">
          {selectedBar == null ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Barra Seleccionada</h5>
                <hr />
                <p className="card-text">No se ha seleccionado ninguna barra</p>
              </div>
              <div className="card-footer text-muted">
                Permite buscar los individuos de la barra seleccionada en que
                grupo quedaron en las demás etapas
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Barra Seleccionada</h5>
                <hr />

                <p className="card-text">Nombre Grupo: {selectedBar[0]}</p>
                <p className="card-text">Etapa: {selectedBar[1]}</p>
                <p className="card-text">Grupo de Cluster: {selectedBar[2]}</p>
                <p className="card-text">*Variables al nacer</p>
                <Select
                  isMulti
                  name="colors"
                  options={nacimientoVars}
                  className="basic-multi-select my-2"
                  classNamePrefix="select"
                  onChange={(value) => {
                    let values = [];
                    value.map((selectItem) => {
                      values.push(selectItem.value);
                    });
                    setadditionalVars([...values]);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleGroupHistory()}
                >
                  Buscar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      {dataToGraphlvl2.length == 0 ? (
        <div></div>
      ) : (
        <div className="row">
          <div className="col-12 col-md-6">
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 50, y: 50 }}
              height={400}
              width={400}
            >
              <VictoryAxis style={{ tickLabels: { angle: -60 } }} />
              <VictoryAxis dependentAxis theme={VictoryTheme.material} />
              <VictoryLegend
                x={125}
                y={10}
                title="Clusters"
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={{ border: { stroke: "black" } }}
                colorScale={"qualitative"}
                data={labelsTG}
              />
              <VictoryGroup
                horizontal
                offset={10}
                style={{ data: { width: 8 } }}
                colorScale={"qualitative"}
              >
                {dataToGraphlvl2.map((dtg) => {
                  return (
                    <VictoryBar
                      barWidth={8}
                      key={`lvl2dataof${dtg.count}`}
                      data={dtg}
                      x="etapa"
                      y="count"
                      labels={({ datum }) => `${datum.count}`}
                    />
                  );
                })}
              </VictoryGroup>
            </VictoryChart>
          </div>
          <div className="row">
            {analisisVars.split("--").map((av) => {
              return (
                <div className="col-12 col-md-6" key={`lvl2${av}`}>
                  Gráfica {av}
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 50, y: 50 }}
                    height={400}
                    width={400}
                  >
                    <VictoryAxis style={{ tickLabels: { angle: -60 } }} />
                    <VictoryAxis dependentAxis theme={VictoryTheme.material} />

                    <VictoryGroup
                      horizontal
                      offset={10}
                      style={{ data: { width: 8 } }}
                      colorScale={"qualitative"}
                    >
                      {dataToGraphlvl2.map((dtg) => {
                        return (
                          <VictoryBar
                            barWidth={8}
                            key={`lvl2dataof${dtg.count}`}
                            data={dtg}
                            x="etapa"
                            y={av}
                          />
                        );
                      })}
                    </VictoryGroup>
                  </VictoryChart>
                </div>
              );
            })}
          </div>
          <div className="row">
            <h5>Datos al nacer</h5>
            <div className="row">
              {additionalVars.map((addv) => {
                let avl = "";
                let artg = [];

                nacimientoVars.map((avli) => {
                  if (avli.value == addv) {
                    avl = avli.label;
                  }
                });
                Object.entries(avtg).map((entry) => {
                  if (entry[0].startsWith(addv)) {
                    if (entry[0].includes("MIN")) {
                      artg.push({ x: "MIN", y: parseFloat(entry[1]) });
                    } else if (entry[0].includes("MAX")) {
                      artg.push({ x: "MAX", y: parseFloat(entry[1]) });
                    } else {
                      artg.push({ x: "AVG", y: parseFloat(entry[1]) });
                    }
                  }
                });
                console.log(avtg);

                console.log(artg);

                return (
                  <div className="col-12 col-md-4" key={`${addv}`}>
                    <h5>Gráfica de {avl}</h5>
                    <VictoryChart
                      theme={VictoryTheme.material}
                      domainPadding={{ x: 50, y: 50 }}
                      height={400}
                      width={400}
                    >
                      <VictoryBar
                        barRatio={0.8}
                        style={{
                          data: { fill: "#c43a31" },
                        }}
                        data={artg}
                      />
                    </VictoryChart>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groupdetail;
