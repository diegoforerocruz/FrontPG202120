import React from "react";
import SidebarContent from "./sidebar/sidebarContent";

const Inicio = () => {
  return (
    <div className="row mx-1">
      <SidebarContent className="col" />
      <div className="col-8">
        <h1 className="display-1">Seccion de inicio</h1>
      </div>
    </div>
  );
};

export default Inicio;
