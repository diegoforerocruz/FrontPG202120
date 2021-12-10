import React, { useState, useEffect } from "react";
import "./sidebar.css";
import GroupsItem from "./groupsItem";
import Groupform from "./groupform";
import data from "./fakedatagroups";
import {getGrupos, getGruposCluster} from "../../services/gruposUtils.js";

const SidebarContent = (props) => {
  const [grupoClicked, setgrupoClicked] = useState(null);
  const [grupos,setGrupos] = useState({grupos:[],grupos_cluster:[]});

  useEffect(() => {
    getGrupos().then((res) => {
      setGrupos(s => ({...s, grupos: res}));
    });
    getGruposCluster().then((res) => {
      setGrupos(s => ({...s, grupos_cluster: res}));
    });
  }, []);

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

  return (
    <div className="mx-1 my-2 sidebarwidth card">
      <div className="card-body">
        <div className="row my-2 ">
          <h3 className="col-8">Grupos</h3>
        </div>
        <div className="grouplist ">
          <p className="subtitleSidebar">Grupos creados manualmente</p>
          {grupos.grupos.map((grupo) => {
            return (
              <GroupsItem
                groupsCluster={props.groupsCluster}
                setGroupsCluster={props.setGroupsCluster}
                name={grupo.nombre}
                id={grupo.id}
                hClick={() => handleClick(grupo, grupo.nombre)}
                hCheck={() => handleCheck}
                key={grupo.nombre}
                groupInfo={grupo}
              />
            );
          })}
          <p className="subtitleSidebar">Grupos creados con clusters</p>
          {grupos.grupos_cluster.map((grupo) => {
            return (
              <GroupsItem
                groupsCluster={props.groupsCluster}
                setGroupsCluster={props.setGroupsCluster}
                name={grupo.nombre}
                id={grupo.id}
                hClick={() => handleClick(grupo, grupo.nombre)}
                hCheck={() => handleCheck}
                key={grupo.nombre}
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
