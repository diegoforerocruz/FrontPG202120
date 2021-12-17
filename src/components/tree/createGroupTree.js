import {Modal, Button, Container, Row, Col, Form} from 'react-bootstrap';
import React, { useState } from "react";
import {createGroup} from "../../services/gruposUtils.js";
import ConditionPanelCrearGrupo from "../tree/ConditionPanelCrearGrupo.js";
import { Formik } from "formik";


const CreateGroupTree = (props) => {

    const handleClose = () => props.setShow(s=> ({...s,show:false}));

    const handleSubmit = (values) => {
      let request = {
                nombregrupo: values.nombre,
                variables: props.data,
                datasource: props.datasource
              };
      createGroup(request).then((res)=>{
        console.log("SUBMIT", res);
        handleClose();
      });
    };

    return (
        <>    
          <Modal show={props.show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Agregar grupo</Modal.Title>
            </Modal.Header>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                nombre: "",
                }}
            >
            {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <Col md={7}>
                      <Row>
                        <h5>Información del grupo:</h5>
                        <p>Conteo: {props.estadisticas.conteo}</p>
                        <p>Porcentaje: {parseFloat(props.estadisticas.percentage).toFixed(2)}%</p>
                      </Row>
                      <Row>
                        <ConditionPanelCrearGrupo data_real={props.data_real} data={props.data} significados={props.significados}/> 
                      </Row>
                    </Col>
                    <Col md={5}>
                      <Form.Group as={Row} className="mb-3" controlId="formGridState">
                        <Form.Label>Nombre del grupo</Form.Label>
                        <Form.Control
                        required
                        type="text"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
                        placeholder="nombre del grupo"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar grupo
                </Button>
              </Modal.Footer>
            </Form>
            )}
            </Formik>
          </Modal>
        </>
      );
};

export default CreateGroupTree;