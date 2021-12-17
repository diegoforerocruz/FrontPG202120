import React, { useState, useEffect } from "react";
import VariablesList from "./variables/VariablesList.js";
import VariableEdit from "./variables/VariableEdit.js";
import { Row, Col, Container } from 'react-bootstrap';
import DropdownItem from "react-bootstrap/esm/DropdownItem";


const VariableManage = () => {

    const [selectedItem, setSelectedItem] = useState({});
    const [hide, setHide] = useState("");
    const [aux, setAux] = useState({});

    const selectItem= (item) => {
        setSelectedItem(item);
        setHide("hideEditDisplay");
    };

    const unSelectItem= (item) => {
        setAux(item);
        setSelectedItem({});
        setHide("");
    };

    return(
        <div className="variableList">
            <VariablesList setAux={setAux} aux={aux} selectItem={selectItem}/>
            <div className={"fixedEditPanel "+hide}>
            <div className={"scroll-panel variableEditAbsolute " +hide}>
                <button onClick={() => setHide("")} className="cancelEditButton">X</button>   
                <div className="marginEditAbsolute">
                    <VariableEdit title={"Editar"} item={selectedItem} unSelectItem={unSelectItem} setSelectedItem={setSelectedItem}/>
                </div>
            </div>
            </div>
        </div>
    );
};

export default VariableManage;