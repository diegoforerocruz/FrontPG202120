import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import {ImCancelCircle} from 'react-icons/im';
import { Formik , FieldArray} from "formik";
import {GrClose} from "react-icons/gr";
import {AiOutlinePlus} from "react-icons/ai";
import { updateVariable } from "../../services/variablesUtils.js";

/**
onSubmit={handleSubmit}
            initialValues={{
            nombre_real:props.item.nombre_real,
            evento: props.item.evento,
            etiqueta: props.item.etiqueta,
            etapa : props.item.etapa,
            evento_inicial: props.item.evento_inicial,
            evento_final: props.item.evento_final,
            nombre_general:props.item.nombre_general,
            tipo: props.item.tipo,
            unidad:props.item.unidad,
            acumulado: props.item.acumulado,
            significados: props.item.significados
 */
const VariableEdit = (props) => {

    const [etiquetas, setEtiquetas] = useState(props.item.etiqueta?(props.item.etiqueta).toString().split("|"):[]);
    const [significados, setSignificados] = useState(props.item.significados?props.item.significados:[]);
    const [sigact, setSigAct] = useState({valor_db:"",valor_traducido:""})
    const addEtiqueta = (tag) => {setEtiquetas([...etiquetas,tag])};

    const addSignificado = () => {
        setSignificados([...significados,sigact]);
    };

    useEffect(()=>{
    },[significados]);

    const modifySignificado = (key,sig,i) => {
        let newArr = Object.assign([],significados);
        if( key === "valor_db") newArr[i].valor_db = sig;
        if( key === "valor_traducido") newArr[i].valor_traducido = sig; 
        setSignificados(newArr);
    };

    const modifySignificadoActual = (key,sig) => {
        let temp = Object.assign({},sigact);
        if(key === "valor_db") temp.valor_db=sig;
        else if(key === "valor_traducido") temp.valor_traducido=sig;
        setSigAct(temp);
    };

    const removeSignificado = (i) => {
        let newArr = Object.assign([],significados);
        newArr.splice(i,1);
        setSignificados(newArr);
    };

    const removeEtiqueta = (i) => {
        let newArr = Object.assign([],etiquetas);
        newArr.splice(i,1);
        setEtiquetas(newArr);
    };

    const handleSubmit = (values) => {};

    const handleButtonClick = (values) => {
        let dir = {
            nombre_real:values.nombre_real,
            evento: values.evento,
            etiqueta: etiquetas.join("|"),
            etapa : values.etapa,
            evento_inicial: values.evento_inicial,
            evento_final: values.evento_final,
            nombre_general:values.nombre_general,
            tipo: values.tipo,
            unidad:values.unidad,
            acumulado: values.acumulado,
            significados:significados
        }
        updateVariable(props.item.nombre_real,dir).then((res)=>{
            props.unSelectItem(res);
        });
    };

    useEffect(()=>{
        setEtiquetas(props.item.etiqueta?(props.item.etiqueta).toString().split("|"):[]);
        setSignificados(props.item.significados?props.item.significados:[]);
    },[props.item]);

    const getOptionsEtapas = (defaultVal, selectvalue, handleChange, pName) => {
        return (
        <Form.Select name={pName} defaultValue={defaultVal} value={selectvalue} onChange={handleChange}>
            <option selected={defaultVal === null} value={null}></option>
            <option selected={defaultVal === "entorno"} value={"entorno"}>entorno</option>
            <option selected={defaultVal === "parto y post-parto"} value={"parto y post-parto"}>parto y post-parto</option>
            <option selected={defaultVal === "nacimiento"} value={"nacimiento"}>nacimiento</option>
            <option selected={defaultVal === "salida hospitalización"} value={"salida hospitalización"}>salida hospitalización</option>
            <option selected={defaultVal === "entrada Programa canguro"} value={"entrada Programa canguro"}>entrada Programa canguro</option>
            <option selected={defaultVal === "semana 40"} value={"semana 40"}>semana 40</option>
            <option selected={defaultVal === "mes 3"} value={"mes 3"}>mes 3</option>
            <option selected={defaultVal === "mes 6"} value={"mes 6"}>mes 6</option>
            <option selected={defaultVal === "mes 9"} value={"mes 9"}>mes 9</option>
            <option selected={defaultVal === "mes 12"} value={"mes 12"}>mes 12</option>
            <option selected={defaultVal === "entrada posición canguro"} value={"entrada posición canguro"}>entrada posición canguro</option>
            <option selected={defaultVal === "salida posición canguro"} value={"salida posición canguro"}>salida posición canguro</option>
        </Form.Select>
        );
    };

    return(
        <Formik
            enableReinitialize
            onSubmit={handleSubmit}
            initialValues={props.item}
        >
        {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
            <h1>{props.title}</h1>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalNombreGeneral">
                <Form.Label column sm={4}>
                Nombre general
                </Form.Label>
                <Col sm={8}>
                <Form.Control
                type="text"
                value={values.nombre_general}
                name="nombre_general"
                onChange={handleChange}
                placeholder={values.nombre_general?values.nombre_general:"Ingresar nombre general"} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalNombreReal">
                <Form.Label column sm={4}>
                Nombre real
                </Form.Label>
                <Col sm={8}>
                <Form.Control
                type="text"
                name="nombre_real"
                onChange={handleChange}
                value={values.nombre_real}
                placeholder={values.nombre_real?values.nombre_real:"Ingresar nombre real"} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalAcumulado">
                <Form.Label column sm={4}>
                Acumulado
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="text"
                value={values.acumulado}
                onChange={handleChange}
                name="acumulado"
                placeholder={values.acumulado === 1 ?"si":"no"} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalUnidad">
                <Form.Label column sm={4}>
                Unidad
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="text"
                value={values.unidad}
                name="unidad"
                onChange={handleChange}
                placeholder={values.unidad?values.unidad:"Ingresar unidad"} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                <Form.Label column sm={4}>Evento</Form.Label>
                <Col sm={8}>
                {
                    getOptionsEtapas(values.evento?values.evento:"",values.evento, handleChange,"evento")
                }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"  controlId="formGridState">
                <Form.Label column sm={4}>Evento inicial</Form.Label>
                <Col sm={8}>
                {
                     getOptionsEtapas(values.evento_inicial?values.evento_inicial:"",values.evento_inicial,handleChange,"evento_inicial")
                }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formGridState">
                <Form.Label column sm={4}>Evento final</Form.Label>
                <Col sm={8}>
                {
                     getOptionsEtapas(values.evento_final?values.evento_final:"",values.evento_final,handleChange,"evento_final")
                }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEtapa">
                <Form.Label column sm={4}>
                Etapa
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="text"
                onChange={handleChange}
                name="etapa"
                placeholder={values.etapa?values.etapa:"Ingresar etapa"} />
                </Col>
            </Form.Group>

            <fieldset>
                <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={4}>
                    Tipo
                </Form.Label>
                <Col sm={8}>
                    <Form.Check
                    type="radio"
                    value={values.tipo}
                    label="numérica"
                    onChange={handleChange}
                    name="tipo"
                    id="formHorizontalRadios1"
                    checked={values.tipo === 1}
                    />
                    <Form.Check
                    type="radio"
                    onChange={handleChange}
                    label="categórica"
                    value={values.tipo}
                    name="tipo"
                    id="formHorizontalRadios2"
                    checked={values.tipo === 2}
                    />
                    <Form.Check
                    type="radio"
                    value={values.tipo}
                    label="fecha"
                    onChange={handleChange}
                    name="tipo"
                    id="formHorizontalRadios3"
                    checked={values.tipo === 3}
                    />
                </Col>
                </Form.Group>
            </fieldset>

            <Form.Group as={Row} className="mb-4" controlId="formHorizontalEtiqueta2">
                <Col sm={4}></Col>
                <Col sm={8}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Valor en Base de datos</th>
                                <th>Significado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {significados.map((x,i)=>{
                            return (
                                <>
                                <tr key={x.valor_db}>
                                    <td>
                                        <Form.Control
                                        type="number"
                                        value={x.valor_db}
                                        onKeyPress={(event) => {
                                            if (event.key === "Enter") {
                                                modifySignificado("valor_db",event.target.value,i);
                                            }
                                        }}
                                        onChange={handleChange}
                                        placeholder={x.valor_db ? x.valor_db:"N/A"} />
                                    </td>
                                    <td>
                                        <Form.Control type="text"
                                        onKeyPress={(event) => {
                                            if (event.key === "Enter") {
                                                modifySignificado("valor_traducido",event.target.value,i);
                                            }
                                        }}
                                        placeholder={x.valor_traducido ? x.valor_traducido:"N/A"}
                                        />
                                    </td>
                                    <td>
                                        <button className="settingsCancel" onClick={() => {removeSignificado(i)}}><GrClose/></button>
                                    </td>
                                </tr>
                                </>
                            );
                        })}
                        <tr key={"last"}>
                            <td>
                                <Form.Control
                                type="number"
                                onChange={(event)=>{
                                    modifySignificadoActual("valor_db",event.target.value);
                                }}
                                placeholder="Ingresar valor" />
                            </td>
                            <td>
                                <Form.Control
                                type="text"
                                onChange={(event)=>{
                                    modifySignificadoActual("valor_traducido",event.target.value);
                                }}
                                placeholder="Ingresar significado" />
                            </td>
                            <td>
                                <button className="settingsAdd" onClick={() => {addSignificado()}}><AiOutlinePlus/></button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEtiqueta">
                <Form.Label column sm={4}>
                Etiqueta
                </Form.Label>
                <Col sm={8}>
                {etiquetas.map((et,i) =>{
                    return(
                        <Alert key={i} variant="primary">
                            {et}
                            <span className="cancel-etiqueta" onClick={()=>{removeEtiqueta(i)}}><a><GrClose/></a></span>
                        </Alert>
                    )
                } 
                )}
                <Form.Control
                type="text"
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        addEtiqueta(event.target.value);
                    }
                }}
                onChange={handleChange}
                placeholder="Ingresar nueva etiqueta" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="button" onClick={() => handleButtonClick(values)}>{props.title}</Button>
                </Col>
            </Form.Group>
        </Form>
    )}
    </Formik>
    );
};

export default VariableEdit;