import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import {Row, Col, Form, Button} from 'react-bootstrap';
import ConditionPanelCrearGrupo from "../tree/ConditionPanelCrearGrupo.js";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import {updateGroup} from "../../services/gruposUtils.js";
import { ToastContainer, toast } from 'react-toastify';


const GrupoTreeDetail = (props) => {

    const [body,setBody]=useState({});

    const notify = (m,d) => {
        if(m==="error")toast.error(d);
        else if(m==="success")toast.success(d);
        else toast(d);
    }

    const testCondiciones = (conds) => {
        let rta = false;
        for(let c of conds){
            if(c.igual === null && c.limitesup === null && c.limiteinf === null){
                rta = true;
                break;
            }
        }
        return rta;
    };

    const handleButtonClick = (values) => {
        let request = {
            nombregrupo:values.nombregrupo?values.nombregrupo:props.grupo.nombre,
            datasource:"data",
            variables:body.condiciones
        }
        if(!(/^[a-z_](?:[a-z0-9_]{0,30})?$/.test(request.nombregrupo))){
            notify("error","El nombre solo puede contener minúsculas, digitos o guiones bajos (_). No puede comenzar por digitos");
        }
        else if(testCondiciones(request.variables) === true){
            notify("error","Las variables deben tener por lo menos un valor asignado");
        }
        else{
            updateGroup(props.grupo.id,request).then(res => {
                if(res){
                    if(res["error"]){
                        props.notify("error",res["error"].replace("404 Not Found: ",""));
                    }
                    else{
                        props.setEdited(true);
                        props.setHide("");
                    }
                }
            });
        }

    };

    useEffect(() => {
        props.setEdited(false);
        setBody(Object.assign({},props.grupo));
    }, [props.grupo]);

    return (
        <div>
            <Row>
                <h1>Editar</h1>
            </Row>
            <Row>
            <Formik
                initialValues={{
                nombregrupo: body.nombre,
                }}
              >
              {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                <Col md={12}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formGridState">
                            <Form.Label as="legend" column sm={2}>
                                Nombre:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                required
                                type="text"
                                name="nombregrupo"
                                value={values.nombregrupo}
                                onChange={handleChange}
                                placeholder={body.nombre}
                                />
                            </Col>
                        </Form.Group>
                      </Form>
                    <Row>
                        <br /> 
                        <div className="fases">
                            <p>Número de neonatos: {body.conteo}</p>
                        </div>
                        <br /> 
                        <div className="fases">
                            <p>Porcentaje: {parseFloat(body.percentage).toFixed(2)}% de 57216</p>
                        </div>
                    </Row>
                    <ConditionPanelCrearGrupo setGrupo={setBody} data={body.condiciones?body.condiciones:[]} data_real={props.data_real}/>
                    <Button onClick={() => handleButtonClick(values)} variant="primary" type="button">Editar</Button>
                </Col>
              )}
              </Formik>
            </Row>
        </div>
    );

};

export default GrupoTreeDetail;