import React from "react";
import SidebarContent from "./sidebar/sidebarContent";
import Tree from "./tree/tree.js";
import { useEffect, useState } from "react";
import { getVariables } from "../services/variablesUtils.js";



const Inicio = () => {

  const [state,setState] = useState({data_real:[], variables:[], etapas: ["parto y post-parto","entorno","nacimiento","salida hospitalización","entrada Programa canguro","semana 40","mes 3","mes 6","mes 9","mes 12","entrada posición canguro","salida posición canguro"]});
  const [groupsCluster, setGroupsCluster] = useState([]);
  function groupBy(arr, criteria) {
    const newObj = arr.reduce(function (acc, currentValue) {
      if (!acc[currentValue[criteria]]) {
        acc[currentValue[criteria]] = [];
      }
      acc[currentValue[criteria]].push({...currentValue, name: currentValue["nombre_general"]+" "+currentValue["evento"]});
      return acc;
   }, {});
   return newObj;
  };

  useEffect(() => {
    getVariables().then((res) => {
      let r = groupBy(res, "nombre_general");
      var arr = [];
      for (var key in r) {
        if (r.hasOwnProperty(key)) {
          arr.push( {title: key, values: r[key] } );
        }
      }
      setState(s => ({...state, variables:arr, data_real: res}));
    });
  }, []);

  const transformToSelect = (x) =>{
    return { value: x.title, label: x.title };
  };

  const transformToSelectEtapas = (x) =>{
    return { value: x, label: x };
  };

  return (
    <div className="row mx-1">
      <SidebarContent className="col" setGroupsCluster={setGroupsCluster} groupsCluster={groupsCluster}/>
      <div className="col-8">
        <Tree groupsCluster={groupsCluster} variables={state.variables.map(x => transformToSelect(x))} etapas={state.etapas.map(x => transformToSelectEtapas(x))} data_real={state.data_real}/>
      </div>
    </div>
  );
};

export default Inicio;
