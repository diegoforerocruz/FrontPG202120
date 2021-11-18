import React, { useState, useEffect } from "react";

const Groupdetail = (props) => {
  //console.log(props.groupInfo);
  return (
    <div className={props.visibility}>
      <form>
        <fieldset disabled>
          {props.groupInfo != null ? (
            <legend>
              Informacion del grupo: {props.groupInfo.nombregrupo}
            </legend>
          ) : (
            <div></div>
          )}
          {props.groupInfo != null ? (
            props.groupInfo.variables.length != 0 ? (
              <div>
                {props.groupInfo.variables.map((item) => {
                  if (item.tipo == "N") {
                    return (
                      <div key={item.variable} className="mb-3">
                        <h5 className="form-label">{item.variable}</h5>
                        <div className="row">
                          <div className="col-4  namevar">
                            <p className="align-middle">Desde:</p>
                          </div>
                          <div className="col-8 ">
                            <input
                              type="number"
                              className="form-control"
                              placeholder={item.limiteinf}
                            />
                          </div>
                          <div className="col-4 ">
                            <p className="align-middle">Hasta:</p>
                          </div>
                          <div className="col-8 ">
                            <input
                              type="number"
                              className="form-control"
                              placeholder={item.limitesup}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    <div key={item.variable} className="mb-3">
                      <h5 className="form-label">{item.variable}</h5>
                      <div className="row">
                        <div className="col-4  namevar">
                          <p className="align-middle">Igual a:</p>
                        </div>
                        <div className="col-8 ">
                          <select className="form-select">
                            <option>{props.igual}</option>
                          </select>
                        </div>
                      </div>
                    </div>;
                  }
                })}
              </div>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Groupdetail;
