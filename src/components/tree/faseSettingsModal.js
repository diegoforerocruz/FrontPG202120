import {Modal, Button, Form, Row, Col, Alert} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import RangeSlider from "../tree/RangeSlider.js";
import Select from "react-select";
import { FcTreeStructure } from 'react-icons/fc';
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from 'yup';
import Slider, { createSliderWithTooltip } from 'rc-slider';


const FaseSettingsModal = (props) => {

    const Range = createSliderWithTooltip(Slider.Range);

      const [numBins,setNumBins] =  useState(2);
      const [listaOpciones, setListaOpciones] = useState([]);
      const [estructuraGrupos,setEstructuraGrupos] = useState([]);
      const [tipoDivision, setTipoDivision] = useState({});

      const transformToSelect = (x) =>{
          return { value: x.valor_db , label: x.valor_traducido };
      };

      const changeSelect = (i,x) => {
        let info = (x.name).toString().split("|");
        let index = parseInt(info[0]);
        let key = info[1]
        let newArr = Object.assign([],estructuraGrupos);
        if(key === "igual"){
          newArr[index].igual = i.map(y => {return (y.value).toString()}).join("|");
          newArr[index].limiteinf = null;
          newArr[index].limitesup = null;
        }
        setEstructuraGrupos(newArr);
      };

      const handleButtonClick = (values) =>{
        let newArr = Object.assign([],props.fases);
        for(let i=0; i<newArr.length; i++){
          if(newArr[i].fase === props.fase.fase){
            if(newArr[i].limiteinf === newArr[i].limitesup){
              newArr[i].igual = newArr[i].limiteinf;
              newArr[i].limiteinf = null;
              newArr[i].limitesup = null;
            }
            if(tipoDivision !== "default"){
              newArr[i].tipodivision=tipoDivision;
              newArr[i].estructura_grupo=estructuraGrupos;
            }
            newArr[i].bins = values.numero_bins;
          }
          break;
        }
        props.setFases(newArr);
        props.buildArbol(props.fase.fase);
        props.setShow(s=> ({...s,show:false}));
      };

      const changeRange = (x,i) => {
        let newArr = Object.assign([],estructuraGrupos);
        newArr[i].limiteinf = x[0];
        newArr[i].limitesup = x[1];
        setEstructuraGrupos(newArr);
      };


      useEffect(() => {
          //aquí se busca la lista de opciones de la variable escogida, se devuelve error si no se ha escogido la variable
          setTipoDivision(props.fase.tipodivision);
          let min = props.fase.min;
          let max = props.fase.max;
          let newArr = Object.assign([],estructuraGrupos);
          let ltemp =  props.fase.tipo === 2 ? props.fase.significados: [];
          let chosen = ltemp.length > 0 ? []: null;
          let limit = numBins? numBins : props.fase.bins;
          let resta = parseInt(limit) - newArr.length; //si es positivo hay que agregar items al array, en caso contrario, se quitan
          if(resta>0){
            for(let i=0; i<resta; i++){
            let obj = {
              numerogrupo: (newArr.length+1),
              limitesup: max,
              limiteinf: min,
              igual: chosen
             };
            newArr.push(obj);
            }
          }
          else if (resta <0){
            newArr = newArr.splice(0, numBins);
          }
          setEstructuraGrupos(newArr);
          setListaOpciones(ltemp.map(x=>transformToSelect(x)));
          //setMinMax({min:min,max:max});
      }, [props, numBins]);

    const handleSubmit = (values,i,o) => {};

    const changeBins = (values) => {
      setNumBins(parseInt(values));
    };
    /**
    const schema = Yup.object().shape({
      numero_bins: Yup.number().min(2), // mayor o igual que 2, menor que 10
      tipodivision: Yup.boolean().required(),//solo default o la otra
      estructura_grupos: Yup.array().of(
        Yup.object().shape({
          numerogrupo:Yup.string(),//requerido
          limitesup: Yup.number(),//mayor o igual que limiteinf, puede ser nulo
          limiteinf: Yup.number().when("limitesup", {
            is: (x) =>{x < 8},
            then: Yup.number().required("Debe ingresar un máximo mayor que el mínimo")
          }),//menor o igual que limitesup, puede ser nulo
          igual: Yup.string(),//debe ser una lista de valores
        })
      )}
    );
     */

    const handleClose = () => props.setShow((s)=> ({...s,show:false}));

    return (
        <>
          <Modal show={props.show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Editar nivel</Modal.Title>
            </Modal.Header>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                numero_bins: 2,
                estructura_grupos: [],
                }}
              >
              {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Modal.Body>
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontal">
                          <Form.Label column sm={4}>
                            ¿cómo desea manejar las divisiones?
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Check
                            type="radio"
                            label="Por defecto"
                            name="tipodivision"
                            id="formHorizontalRadios1"
                            value={tipoDivision ==="default"}
                            onChange={(d)=>{
                              if(d.target.checked===true){
                                setTipoDivision("default");
                              }
                            }}
                            />
                            <Form.Check
                            type="radio"
                            label="Especificar los rangos"
                            name="tipodivision"
                            id="formHorizontalRadios2"
                            value={tipoDivision !== "default"}
                            onChange={(d)=>{
                              if(d.target.checked===true){
                                setTipoDivision("nodefault");
                              }
                            }}
                            />
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3" controlId="formHorizontal">
                          <Form.Label column sm={4}>
                            Número de divisiones
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                            type="number"
                            name="numero_bins"
                            placeholder={2}
                            defaultValue={numBins}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                changeBins(event.target.value);
                              }
                            }}
                            />
                          </Col>
                      </Form.Group>
                      <Form.Group>
                        {tipoDivision !== "default"?
                          <div>
                          {props.fase.tipo === 2?
                          estructuraGrupos.map((x,index)=>{
                              return (<Form.Group as={Row} className="mb-3" controlId="formHorizontal" key={index}>
                                  <Form.Label column sm={4}>
                                      grupo {x.numerogrupo}
                                  </Form.Label>
                                  <Col sm={8}>
                                      <Select
                                      isMulti={true}
                                      name={`${index}|igual`}
                                      onChange={changeSelect}
                                      className="select-optional"
                                      isClearable={true}
                                      aria-labelledby="aria-label"
                                      inputId="aria-example-input"
                                      options={listaOpciones}
                                      />
                                  </Col>
                              </Form.Group>)
                          }):null}
                          {props.fase.tipo === 1?estructuraGrupos.map((x,index)=>{
                              return (
                              <Form.Group as={Row} className="mb-3" controlId="formHorizontal" key={index}>
                                <Form.Label column sm={4}>
                                  grupo {x.numerogrupo}
                                </Form.Label>
                                <Col sm={7}>
                                  <Row>
                                    <Range allowCross={false}
                                    defaultValue={[x.limiteinf, x.limitesup]}
                                    min={props.fase.min}
                                    max={props.fase.max}
                                    disabled={false}
                                    step={5}
                                    onChange={()=>{}}
                                    onAfterChange={value => {changeRange(value,index)}}
                                    />
                                  </Row>
                                  <Row>
                                    <div>
                                      <div className="left">
                                      <div className="fases">
                                        <p className="margin-right">Min:</p>
                                        <Form.Control
                                        type="number"
                                        name="min"
                                        size="sm"
                                        value={x.limiteinf}
                                        className="size-small"
                                        width="50px"
                                        onChange={() => {}}/>
                                      </div>
                                      </div>
                                      <div className="right">
                                        <div className="fases">
                                          <p className="margin-right">Max:</p>
                                          <Form.Control
                                          type="number"
                                          value={x.limitesup}
                                          name="max"
                                          size="sm"
                                          width="50px"
                                          className="right size-small"
                                          onChange={(x,i) => {console.log("yo no se",x,i)}}/>
                                        </div>
                                      </div>
                                    </div>
                                  </Row>
                                </Col>
                              </Form.Group>)
                          }):null}
                          {props.fase.tipo !== 1 && props.fase.tipo !== 2 ? 
                          <Alert key={props.fase.variable_real} variant="danger">
                              No ha seleccionado ninguna variable
                          </Alert>:null}
                        </div>:null}
                      </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="primary" type="button"  onClick={() => handleButtonClick(values)}>
                      Editar divisiones
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
              </Formik>
          </Modal>
        </>
  );
};

export default FaseSettingsModal;