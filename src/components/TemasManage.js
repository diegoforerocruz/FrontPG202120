import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import TemasList from "./temas/TemasList.js";



const TemasManage = () => {
    const [selectedItem, setSelectedItem] = useState({});
    const [hide, setHide] = useState("");

    const selectItem= (item) => {
        setSelectedItem(item);
        setHide("hideEditDisplay");
    };

    return(
        <div className="variableList">
            <TemasList selectItem={selectItem}/>
            <div className="fixedEditPanel">
            <div className={"scroll-panel variableEditAbsolute " +hide}>
            </div>
            </div>
        </div>
    );
};

export default TemasManage;