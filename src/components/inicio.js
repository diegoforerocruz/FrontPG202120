import React from "react";
import SidebarContent from "./sidebar/sidebarContent";
import Tree from "./tree/tree.js";
import { useEffect, useState } from "react";
import { getVariables } from "../services/variablesUtils.js";
import GrupoTreeDetail from "./tree/GrupoTreeDetail.js";
import {Modal, Button} from 'react-bootstrap';


const Inicio = () => {

  const [state,setState] = useState({data_real:[], variables:[], etapas: ["parto y post-parto","entorno","nacimiento","salida hospitalización","entrada Programa canguro","semana 40","mes 3","mes 6","mes 9","mes 12","entrada posición canguro","salida posición canguro"]});
  const [groupsCluster, setGroupsCluster] = useState([]);
  const [hide, setHide] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [aux, setAux] = useState({});
  const [show, setShow] = useState({value:false,grupo:{}});
  const [deleted, setDeleted] = useState({});

  const handleClose = () => setShow({value:false,grupo:{}});
  const handleShow = (groupInfo) => setShow({value:true,grupo:groupInfo});

  const selectItem= (item) => {
      setSelectedItem(item);
      setHide("hideEditDisplay");
  };

  const unSelectItem= (item) => {
      setAux(item);
      setSelectedItem({});
      setHide("");
  };

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

  function getEtapa(r){
    let x = r.etapa?r.etapa:r.evento;
    return { value: x, label: x };
  }

  useEffect(() => {
    getVariables().then((res) => {
      let r = groupBy(res, "nombre_general");
      var arr = [];
      for (var key in r) {
        if (r.hasOwnProperty(key)) {
          arr.push(
            {
              title: key,
              values: r[key],
              etapa : r[key].map(x=>{
                return getEtapa(x)
              })
            }
          );
        }
      }
      setState(s => ({...state, variables:arr, data_real: res}));
    });
  }, []);

  const transformToSelect = (x) =>{
    return { value: x.title, label: x.title };
  };

  const transformToSelectEtapas = (x) =>{
    return { value: x, label: x};
  };

  return (
    <div className="row mx-1">
      <SidebarContent deleted={deleted} handleShow={handleShow} selectItem={selectItem} className="col" setGroupsCluster={setGroupsCluster} groupsCluster={groupsCluster}/>
      <div className="col-8">
        <Tree groupsCluster={groupsCluster} variables_real={state.variables} variables={state.variables.map(x => transformToSelect(x))} etapas={state.etapas.map(x => transformToSelectEtapas(x))} data_real={state.data_real}/>
        <div className={"fixedEditPanel "+hide}>
          <div className={"scroll-panel variableEditAbsolute " +hide}>
            <button onClick={() => setHide("")} className="cancelEditButton">X</button>   
            <div className="marginEditAbsolute">
              <GrupoTreeDetail grupo={selectedItem} data_real={state.data_real} unSelectItem={unSelectItem} setSelectedItem={setSelectedItem}/>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show.value} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar el grupo: {show.grupo.nombre}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={()=>{
            setDeleted(show.grupo);
            handleClose();
          }}>
            Eliminar grupo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inicio;
