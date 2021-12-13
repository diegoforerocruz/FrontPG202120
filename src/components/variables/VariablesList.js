import React, { useState, useEffect } from "react";
import { Table, Button, Accordion, Container, Row, Col } from 'react-bootstrap';
import { getVariables } from "../../services/variablesUtils.js";
import { AiTwotoneEdit } from "react-icons/ai";


const VariablesList = (props) => {

    const [variables, setVariables] = useState([]);

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

    useEffect(()=>{
        getVariables().then((res) => {
            let r = groupBy(res, "nombre_general");
            var arr = [];
            for (var key in r) {
                if (r.hasOwnProperty(key)) {
                arr.push( {title: key, values: r[key] } );
                }
            }
            setVariables(arr);
        });
    },[]);
    
    return(
        <div className="marginLeftTitle">
        <br/><br/>
        <h3>Lista de variables</h3>
        <br/><br/>
        <Container fluid>
            <Row>
                <Col md={8}>
                    <Accordion>
                    {
                    variables.map(
                        val => { 
                        return <Accordion.Item eventKey={val.title}>
                        <Accordion.Header>
                            <div className="fases">
                                <div className="ac-item">{val.title}</div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nombre real</th>
                                        <th>Evento</th>
                                        <th>Tipo</th>
                                        <th>Unidad</th>
                                        <th>Etiqueta</th>
                                        <th>Evento inicial</th>
                                        <th>Evento final</th>
                                        <th>Etapa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {val.values.map(variable => {
                                    return <tr>
                                        <td><Button onClick={() => props.selectItem(variable)}><AiTwotoneEdit/></Button></td>
                                        <td>{variable.nombre_real}</td>
                                        <td>{variable.evento}</td>
                                        {variable.tipo === 1? <td>numérica</td>:<td>categórica</td>}
                                        <td>{variable.unidad}</td>
                                        <td>{variable.etiqueta}</td>
                                        <td>{variable.evento_inicial}</td>
                                        <td>{variable.evento_final}</td>
                                        <td>{variable.etapa}</td>
                                    </tr>
                                    })}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>;
                    })}
                    </Accordion>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
        </div>
    );
};

export default VariablesList;