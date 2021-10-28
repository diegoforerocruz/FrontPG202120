import React from "react";
import "./sidebar.css";
import GroupsItem from "./groupsItem";
import * as Icon from "react-bootstrap-icons";
import Groupform from "./groupform";

function SidebarContent() {
  const data = [
    {
      name: "juan algoalgoalgo",
      peso: { mayor: null, igual: null, menor: 3000 },
      talla: { mayor: 100, igual: null, menor: 200 },
      pc: { mayor: 30, igual: null, menor: null },
    },
    {
      name: "diego",
      peso: { mayor: null, igual: null, menor: 1000 },
      talla: { mayor: 100, igual: null, menor: 200 },
      pc: { mayor: 30, igual: null, menor: null },
    },
    {
      name: "arturo",
      peso: { mayor: null, igual: null, menor: 2000 },
      talla: { mayor: 100, igual: null, menor: 200 },
      pc: { mayor: 30, igual: null, menor: null },
    },
    {
      name: "nicolas",
      peso: { mayor: null, igual: null, menor: 4000 },
      talla: { mayor: 100, igual: null, menor: 200 },
      pc: { mayor: 30, igual: null, menor: null },
    },
    {
      name: "jose",
      peso: { mayor: null, igual: null, menor: 5000 },
      talla: { mayor: 100, igual: null, menor: 200 },
      pc: { mayor: 30, igual: null, menor: null },
    },
  ];

  const handleClick = (name) => {
    console.log(`${name} has been clicked`);
  };

  const handleCheck = (name, ischeked) => {
    if (ischeked == 1) {
      console.log(`${name} has been cliked and is checked`);
    } else {
      console.log(`${name} has been cliked and is not checked`);
    }
  };

  return (
    <div className="mx-1 my-2 sidebarwidth card">
      <div className="card-body">
        <div className="row my-2 ">
          <h3 className="col-8">Grupos</h3>
        </div>
        <div className="grouplist ">
          {data.map((grupo) => {
            return (
              <GroupsItem
                name={grupo.name}
                hClick={handleClick}
                hCheck={handleCheck}
                key={grupo.name}
              />
            );
          })}
        </div>

        <hr />
        <Groupform />
      </div>
    </div>
  );
}

export default SidebarContent;
