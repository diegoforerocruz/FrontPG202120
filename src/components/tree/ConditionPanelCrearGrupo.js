import React from "react";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import {Row, Col, Form} from 'react-bootstrap';
import RangeSlider from "../tree/RangeSlider.js";
import Slider, { createSliderWithTooltip } from 'rc-slider';


const ConditionPanelCrearGrupo = (props) => {

    const Range = createSliderWithTooltip(Slider.Range);

    const transformToSelect = (x) =>{
        return { value: x, label: x };
    };

    useEffect(() => {
    }, [props.data]);

    const getSelect = (listaCondiciones, seleccionado) => {
        return (
          <Select
            isMulti={true}
            isDisabled={true}
            className="select-optional"
            isClearable={true}
            aria-labelledby="aria-label"
            inputId="aria-example-input"
            name="aria-live-color"
            defaultValue={seleccionado}
            options={listaCondiciones}
            />
        );
    };


    const getSliders = (limiteinf, limitesup, igual, nombre) => {
        let nombre_final = nombre;
        let etapa_final = "";
        if(props.data_real){
            let lissta = props.data_real.filter((d)=>(d.nombre_real === nombre));
            if(lissta[0]){
                nombre_final = lissta[0].nombre_general;
                etapa_final = lissta[0].evento?lissta[0].evento:lissta[0].etapa;
            }
        }
        if(igual || (limitesup && limiteinf)){
            return (
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalUnidad">
                    <Form.Label column sm={5}>
                        <p className="bigtext">{nombre_final}</p>
                        <p className="smalltext">{etapa_final}</p>
                    </Form.Label>
                    <Col sm={7}>
                        <Row>
                            <Range allowCross={false}
                            value={[igual?igual:limiteinf, igual?igual:limitesup]}
                            min={igual?igual-100:limitesup-100}
                            max={igual?igual+50:limitesup+50}
                            disabled={false}
                            step={5}
                            onChange={()=>{}}
                            onAfterChange={value => {}}
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
                                        value={igual?igual:limiteinf}
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
                                            value={igual?igual:limitesup}
                                            name="max"
                                            size="sm"
                                            width="50px"
                                            className="right size-small"
                                            onChange={(x,i) => {}}/>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Form.Group>);
        }
        else{
            return (<div className="fases">
                    <Form.Control disabled type="text" placeholder="N/A" />
                </div>);
        }
    };

    const getInputText = (nombre,valor) => {
        if(valor === null || valor === undefined) valor = "N/A";
        let p = valor.toString().split("|");
        let sigs = [];
        let lissta = [];
        let nombre_final = nombre;
        let etapa_final = "";
        if(props.data_real){
            lissta = props.data_real.filter((d)=>(d.nombre_real === nombre));
            if(lissta[0]){
                sigs = lissta[0].significados;
                nombre_final = lissta[0].nombre_general;
                etapa_final = lissta[0].evento?lissta[0].evento:lissta[0].etapa;
            }
        }
        p = p.map((x)=>{
            let found = sigs.filter((d)=>(parseInt(d.valor_db) === parseInt(x)))[0];
            if(found){
                return found.valor_traducido;
            }
            else return x;
        });

        /**
        if(props.significados){
            p = p.map((x)=>{
                let found = props.significados.filter((d)=>(parseInt(d.valor_db) === parseInt(x)))[0];
                if(found){
                    return found.valor_traducido;
                }
                else return x;
            });
        }*/
        let p2 = p.map(x =>transformToSelect(x));
        return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalUnidad">
                <Form.Label column sm={5}>
                    <p className="bigtext">{nombre_final}</p>
                    <p className="smalltext">{etapa_final}</p>
                </Form.Label>
                <Col sm={6}>
                    {getSelect(p2,p2)}
                </Col>
            </Form.Group>
        </Form>
        );
    };

    return(
        <div>
            <h5>{props.data? props.data.length > 0? "Condiciones": "": ""}</h5>
            {props.data.map(c => {return <div>
                {c.tipo === 1?
                <div>
                    <Form>
                        {getSliders(c.limiteinf,c.limitesup,c.igual,c.variable)}
                    </Form>
                </div>:null}
                {c.tipo === 2?getInputText(c.variable,c.igual):null}
            </div>})}
        </div>
    );
};

export default ConditionPanelCrearGrupo;