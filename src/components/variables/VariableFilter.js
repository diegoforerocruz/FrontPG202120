import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Table, Button, Accordion, Container, Form, Row, Col } from 'react-bootstrap';
import { propTypes } from "react-bootstrap/esm/Image";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";




const VariableFilter = (props) => {

    const [filterData, setFilterData] = useState({text:"",tipo:0,tiempo: ""});


    const filt = (d) =>{
        if(d){
        let textoCond = true;
        if(filterData.text !== ""){
            let f = filterData.text.toLowerCase();
            textoCond = d.nombre_real?d.nombre_real.toLowerCase().includes(f):false || d.unidad? d.unidad.toLowerCase().includes(f):false || d.etiqueta?d.etiqueta.toLowerCase().includes(f):false || d.nombre_general?d.nombre_general.toLowerCase().includes(f):false;
        }
        let tipoCond = true;
        if(filterData.tipo !== 0){
            tipoCond = parseInt(d.tipo) === parseInt(filterData.tipo)
        }
        let tiempoCond = true;
        if(filterData.tiempo !== ""){
            tiempoCond = d.etapa === filterData.tiempo  || d.evento === filterData.tiempo || d.evento_inicial === filterData.tiempo || d.evento_final === filterData.tiempo;
        }
        return textoCond && tipoCond && tiempoCond
        }
    };

    useEffect(()=>{
        if(props.reales){
            let newArr = Object.assign([], props.reales);
            let rta = [];
            for (let i = 0; i < newArr.length; i++){
                let copia = Object.assign(newArr[i].values);
                copia = copia.filter(filt);
                if (copia.length > 0){
                    newArr[i].values = copia;
                    rta.push(newArr[i]);
                }
            }
            props.setVariables((s)=>({...s,filtradas:rta}));
        }
    },
    [filterData]);

    const geteventosTemporales = (etapas) => {
        return (
          <Select
            onChange={(value) => {
                setFilterData((s)=>({...s,tiempo:value.value}));
            }}
            className="select-optional"
            isClearable={true}
            aria-labelledby="aria-label"
            inputId="aria-example-input"
            name="aria-live-color"
            placeholder="etapa/evento"
            options={etapas}
            />
        );
    };

    const handleSubmit = (values,i,o) => {};

    return(
        <div>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                tipo: 0,
                }}
              >
              {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalNombreGeneral">
                            <Col sm={12}>
                            <Form.Control
                            type="text"
                            name="nombre_general"
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    setFilterData((s)=>({...s,text:event.target.value}));
                                }
                            }}
                            placeholder={"Buscar"} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalTipo">
                            <Form.Label column sm={4}>
                                Tipo
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Check
                                type="radio"
                                label="Categórica"
                                name="tipo"
                                id="formHorizontalRadiosTipo1"
                                onChange={(d)=>{
                                    console.log("SELECTED");
                                    if(d.target.checked===true){
                                        setFilterData((s)=>({...s,tipo:2}));
                                    }
                                    else{
                                        setFilterData((s)=>({...s,tipo:0}));
                                    }
                                }}
                                />
                                <Form.Check
                                type="radio"
                                label="Numérica"
                                name="tipo"
                                id="formHorizontalRadiosTipo2"
                                onChange={(d)=>{
                                    if(d.target.checked===true){
                                        setFilterData((s)=>({...s,tipo:1}));
                                    }
                                    else{
                                        setFilterData((s)=>({...s,tipo:0}));
                                    }
                                }}
                                />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        <p>Evento/etapa:</p>
                        {geteventosTemporales(props.etapas)}
                    </Row>
                </Form>
              )}
              </Formik>
        </div>
    );
};

export default VariableFilter;