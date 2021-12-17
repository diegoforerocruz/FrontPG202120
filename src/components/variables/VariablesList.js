import React, { useState, useEffect } from "react";
import { Table, Button, Accordion, Container, Row, Col } from 'react-bootstrap';
import { getVariables } from "../../services/variablesUtils.js";
import { AiTwotoneEdit } from "react-icons/ai";
import VariableFilter from "../variables/VariableFilter.js";


const VariablesList = (props) => {

    const [variables, setVariables] = useState({reales:[],filtradas:[],etapas:[]});

    useEffect(()=>{
        if(props.aux){
            if(props.aux.nombre_real){
                let clon = variables.reales;
                for(let titl of clon){
                    for(let j=0;j <titl.values.length; j++){
                        if (titl.values[j].nombre_real===props.aux.nombre_real){
                            titl.values[j] = props.aux;
                            break;
                        }
                    }
                }
                let clon2 = variables.filtradas;
                for(let title of clon2){
                    for(let i=0; i< title.values.length; i++){
                        if (title.values[i].nombre_real===props.aux.nombre_real){
                            title.values[i] = props.aux;
                            break;
                        }
                    }
                }
                setVariables((s)=>({...s, filtradas:clon2,reales:clon}));
            }
        }
    },[props.aux]);

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
                arr.push( {
                    title: key,values: r[key] } );
                }
            }
            let etap = {};
            for (let g of res){
                if (g.evento){
                    etap[g.evento] = g.evento;
                }
                else if(g.etapa){
                    etap[g.etapa] = g.etapa;
                }
            }
            setVariables((s)=>({...s,reales:arr,filtradas:arr,etapas:Object.keys(etap).map(t=>{
                return { value: t, label: t };
            })}));
        });
    },[]);
    
    return(
        <div className="marginLeftTitle">
        <Container fluid>
            <Row>
                <Col md={8}>
                <br/><br/>
                <h3>Lista de variables</h3>
                <br/><br/>
                    <Accordion>
                    {
                    variables.filtradas.map(
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
                <Col md={4}>
                    <br/><br/>
                    <h3>Filtrar</h3>
                    <br/><br/>
                    <VariableFilter etapas={variables.etapas} reales={variables.reales} variables={variables} setVariables={setVariables} />
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default VariablesList;