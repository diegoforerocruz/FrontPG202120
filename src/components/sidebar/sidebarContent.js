import React, { useState } from "react";
import "./sidebar.css";
import GroupsItem from "./groupsItem";
import Groupform from "./groupform";
import data from "./fakedatagroups";

function SidebarContent() {
  const [grupoClicked, setgrupoClicked] = useState(null);
  const handleClick = (grupo, name) => {
    console.log(`${name} has been clicked`);
    setgrupoClicked(grupo);
  };

  const handleCheck = (name, ischeked) => {
    if (ischeked == 1) {
      console.log(`${name} has been cliked and is checked`);
    } else {
      console.log(`${name} has been cliked and is not checked`);
    }
  };

  console.log(grupoClicked);
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
                name={grupo.nombregrupo}
                hClick={() => handleClick(grupo, grupo.nombregrupo)}
                hCheck={() => handleCheck}
                key={grupo.nombregrupo}
                groupInfo={grupo}
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
