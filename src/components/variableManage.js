import React, { useState, useEffect } from "react";
import VariablesList from "./variables/VariablesList.js";
import VariableEdit from "./variables/VariableEdit.js";
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { ToastContainer, toast } from 'react-toastify';



const VariableManage = () => {

    const [selectedItem, setSelectedItem] = useState({});
    const [hide, setHide] = useState("");
    const [aux, setAux] = useState({});
    const [deleted, setDeleted] = useState({});
    const [show, setShow] = useState({value:false,variableitem:{}});
    const handleClose = () => setShow({value:false,variableitem:{}});
    const handleShow = (varInfo) => setShow({value:true,variableitem:varInfo});
    const [funcion,setFuncion] = useState("");
    const [createdItem, setCreatedItem] = useState(null);

    const notify = (m,d) => {
        if(m==="error")toast.error(d);
        else if(m==="success")toast.success(d);
        else toast(d);
    }

    const selectItem= (item) => {
        console.log("ENTRO3 selectItem",funcion);
        setSelectedItem(item);
        setFuncion("Editar");
        setHide("hideEditDisplay");
    };

    const createVariable = () => {
        setSelectedItem({evento:"",nombre_real:"",nombre_general:"",unidad:"",tipo:1,acumulado:null});
        setFuncion("Crear variable");
        setHide("hideEditDisplay");
    };

    const unSelectItem= (item,funcc) => {
        if(funcc==="Editar")setAux(item);
        else if(funcc==="Crear variable"){
            setCreatedItem(item);
        }
        setSelectedItem({});
        setHide("");
    };

    return(
        <div className="variableList">
            <VariablesList createdItem={createdItem} createVariable={createVariable} deleted={deleted} handleShow={handleShow}  setAux={setAux} aux={aux} selectItem={selectItem}/>
            <div className={"fixedEditPanel "+hide}>
                <div className={"scroll-panel variableEditAbsolute " +hide}>
                    <button onClick={() => setHide("")} className="cancelEditButton">X</button>   
                    <div className="marginEditAbsolute">
                    <VariableEdit notify={notify} title={funcion} evento={selectedItem.evento} item={selectedItem} unSelectItem={unSelectItem} setSelectedItem={setSelectedItem}/>
                    </div>
                </div>
            </div>
            <Modal show={show.value} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Eliminar variable</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro de que desea eliminar la variable: {show.variableitem.nombre_real}?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={()=>{
                    setDeleted(show.variableitem);
                    handleClose();
                }}>
                    Eliminar variable
                </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default VariableManage;