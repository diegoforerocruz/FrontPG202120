import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {Row, Col, Form} from 'react-bootstrap';
import ConditionPanelCrearGrupo from "../tree/ConditionPanelCrearGrupo.js"

const GrupoTreeDetail = (props) => {

    return (
        <div>
            <Row>
                <h1>Editar: {props.grupo.nombre}</h1>
            </Row>
            <Row>
                <Col md={12}>
                    <Row>
                        <br /> 
                        <div className="fases">
                            <p>Número de neonatos: {props.grupo.conteo}</p>
                        </div>
                        <br /> 
                        <div className="fases">
                            <p>Porcentaje: {parseFloat(props.grupo.percentage).toFixed(2)}% de 57216</p>
                        </div>
                    </Row>
                    <ConditionPanelCrearGrupo data={props.grupo.condiciones?props.grupo.condiciones:[]} data_real={props.data_real}/>
                    <button className="btn btn-primary">Editar</button>
                </Col>
            </Row>
        </div>
    );

};

export default GrupoTreeDetail;