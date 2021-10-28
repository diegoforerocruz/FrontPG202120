import React from "react";

import Enviroment from "./etapas/enviroment";
import Pregnancy from "./etapas/pregnancy";
import Birth from "./etapas/birth";
import Programacanguro from "./etapas/programacanguro";

const Intraetapas = () => {
  return (
    <div>
      <h1>Seccion intraetapas</h1>
      <div className="container">
        <ul className="nav" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="enviroment-tab"
              data-bs-toggle="tab"
              data-bs-target="#enviroment"
              type="button"
              role="tab"
              aria-controls="enviroment"
              aria-selected="true"
              href="#"
            >
              Ambiente
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="pregnancy-tab"
              data-bs-toggle="tab"
              data-bs-target="#pregnancy"
              type="button"
              role="tab"
              aria-controls="pregnancy"
              aria-selected="false"
              href="#"
            >
              Embarazo
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="birth-tab"
              data-bs-toggle="tab"
              data-bs-target="#birth"
              type="button"
              role="tab"
              aria-controls="birth"
              aria-selected="false"
              href="#"
            >
              Nacimiento
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-expanded="false"
              href="#"
            >
              Programa Canguro
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item nav-link"
                  id="kangarooPEntrance-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kangarooPEntrance"
                  type="button"
                  role="tab"
                  aria-controls="kangarooPEntrance"
                  aria-selected="false"
                  href="#"
                >
                  Ingreso
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item nav-link"
                  id="kangarooP40-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kangarooP40"
                  type="button"
                  role="tab"
                  aria-controls="kangarooP40"
                  aria-selected="false"
                  href="#"
                >
                  40 semanas
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item nav-link"
                  id="kangarooP3-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kangarooP3"
                  type="button"
                  role="tab"
                  aria-controls="kangarooP3"
                  aria-selected="false"
                  href="#"
                >
                  3 meses
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item nav-link"
                  id="kangarooP6-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kangarooP6"
                  type="button"
                  role="tab"
                  aria-controls="kangarooP6"
                  aria-selected="false"
                  href="#"
                >
                  6 meses
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item nav-link"
                  id="kangarooP9-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kangarooP9"
                  type="button"
                  role="tab"
                  aria-controls="kangarooP9"
                  aria-selected="false"
                  href="#"
                >
                  9 meses
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item nav-link"
                  id="kangarooP12-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kangarooP12"
                  type="button"
                  role="tab"
                  aria-controls="kangarooP12"
                  aria-selected="false"
                  href="#"
                >
                  12 meses
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item nav-link"
                  id="kangarooPFinish-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kangarooPFinish"
                  type="button"
                  role="tab"
                  aria-controls="kangarooPFinish"
                  aria-selected="false"
                  href="#"
                >
                  Salida
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="enviroment"
            role="tabpanel"
            aria-labelledby="enviroment-tab"
          >
            <Enviroment />
          </div>
          <div
            className="tab-pane fade"
            id="pregnancy"
            role="tabpanel"
            aria-labelledby="pregnancy-tab"
          >
            <Pregnancy />
          </div>
          <div
            className="tab-pane fade"
            id="birth"
            role="tabpanel"
            aria-labelledby="birth-tab"
          >
            <Birth />
          </div>
          <div
            className="tab-pane fade"
            id="kangarooPEntrance"
            role="tabpanel"
            aria-labelledby="kangarooPEntrance-tab"
          >
            <Programacanguro />
          </div>
          <div
            className="tab-pane fade"
            id="kangarooP40"
            role="tabpanel"
            aria-labelledby="kangarooP40-tab"
          >
            <Programacanguro />
          </div>
          <div
            className="tab-pane fade"
            id="kangarooP3"
            role="tabpanel"
            aria-labelledby="kangarooP3-tab"
          >
            <Programacanguro />
          </div>
          <div
            className="tab-pane fade"
            id="kangarooP6"
            role="tabpanel"
            aria-labelledby="kangarooP6-tab"
          >
            <Programacanguro />
          </div>
          <div
            className="tab-pane fade"
            id="kangarooP9"
            role="tabpanel"
            aria-labelledby="kangarooP9-tab"
          >
            <Programacanguro />
          </div>
          <div
            className="tab-pane fade"
            id="kangarooP12"
            role="tabpanel"
            aria-labelledby="kangarooP12-tab"
          >
            <Programacanguro />
          </div>
          <div
            className="tab-pane fade"
            id="kangarooPFinish"
            role="tabpanel"
            aria-labelledby="kangarooPFinish-tab"
          >
            <Programacanguro />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intraetapas;
