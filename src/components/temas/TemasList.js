import { getTemas, getTemasVariables } from "../../services/temasUtils.js";
import React, { useState, useEffect } from "react";
import { Table, Button, Accordion, Container, Row, Col } from 'react-bootstrap';
import {BsTrash} from "react-icons/bs";

const TemasList = (props) => {

    const [temas, setTemas] = useState([]);

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

    const replaceTitle = (x,y) => {
        x.title = y.nombre;
        return x;
    };

    useEffect(()=>{
            getTemas().then((res2) => {
                setTemas(res2);
            });
    },[]);

    return(
        <Container fluid>
            <Row>
                <Col md={7}>
                    <Accordion>
                    {
                    temas.map(
                        val => { 
                        return <Accordion.Item eventKey={val.nombre}>
                        <Accordion.Header>
                            <div className="fases">
                                <div className="ac-item">{val.nombre}</div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th className="first-column"></th>
                                        <th>Nombre general</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {val.variables.map(variable => {
                                    return <tr>
                                        <td className="first-column"><Button variant="light" onClick={() => props.selectItem(variable)}><BsTrash/></Button></td>
                                        <td>{variable.nombre_general}</td>
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
    );

};

export default TemasList;