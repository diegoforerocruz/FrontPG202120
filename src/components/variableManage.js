import React, { useState, useEffect } from "react";
import VariablesList from "./variables/VariablesList.js";
import VariableEdit from "./variables/VariableEdit.js";
import { Row, Col, Container } from 'react-bootstrap';


const VariableManage = () => {

    const [selectedItem, setSelectedItem] = useState({});
    const [hide, setHide] = useState("");

    const selectItem= (item) => {
        setSelectedItem(item);
        setHide("hideEditDisplay");
    };

    return(
        <div className="variableList">
            <VariablesList selectItem={selectItem}/>
            <div className="fixedEditPanel">
            <div className={"scroll-panel variableEditAbsolute " +hide}>
                <button onClick={() => setHide("")} className="cancelEditButton">X</button>   
                <div className="marginEditAbsolute">
                    <VariableEdit title={"Editar"} item={selectedItem}/>
                </div>
            </div>
            </div>
        </div>
    );
};

export default VariableManage;