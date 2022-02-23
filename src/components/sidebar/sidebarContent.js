import React, { useState, useEffect } from "react";
import "./sidebar.css";
import GroupsItem from "./groupsItem";
import Groupform from "./groupform";
import data from "./fakedatagroups";
import {getGrupos, getGruposCluster} from "../../services/gruposUtils.js";

const SidebarContent = (props) => {
  const [grupoClicked, setgrupoClicked] = useState({nombre:""});
  const [grupos,setGrupos] = useState({grupos:[],grupos_cluster:[]});

  const updateGrupos = () => {
    getGrupos().then((res) => {
      setGrupos(s => ({...s, grupos: res}));
    });
    getGruposCluster().then((res) => {
      setGrupos(s => ({...s, grupos_cluster: res}));
    });
  };

  useEffect(()=>{
    if(props.groupCreated){
      setGrupos(s => ({...s, grupos: [...s.grupos,props.groupCreated]}));
    }
  },[props.groupCreated]);

  useEffect(() => {
    updateGrupos();
  }, []);

  useEffect(() => {
    if(props.edited)updateGrupos();
  }, [props.edited]);

  const removeFromOriginalList = (id,name,tipo) => {
    if(tipo==="manual"){
      let newArr = Object.assign([],grupos.grupos);
      newArr = newArr.filter((d)=>(d.id !== id && d.nombre !== name));
      setGrupos(s => ({...s, grupos: newArr}));
    }
    else if(tipo==="cluster"){
      let newArr = Object.assign([],grupos.grupos_cluster);
      newArr = newArr.filter((d)=>(d.id !== id && d.nombre !== name));
      setGrupos(s => ({...s, grupos_cluster: newArr}));
    }
  };

  const handleClick = (grupo) => {
    if(grupoClicked.nombre === grupo.nombre || grupo.nombre==="" ){
      setgrupoClicked({nombre:""});
      props.selectItem((s)=>({nombre:""}));
    }
    else{
      setgrupoClicked(grupo);
      props.selectItem((s)=>(grupo));
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
                key={grupo.nombre}
                handleClick={handleClick}
                grupoClicked={grupoClicked}
                groupInfo={grupo}
                deleted={props.deleted}
                handleShow={props.handleShow}
                tipo={"manual"}
                eliminarFunc={removeFromOriginalList}
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
                handleShow={props.handleShow}
                handleClick={handleClick}
                grupoClicked={grupoClicked}
                id={grupo.id}
                deleted={props.deleted}
                tipo={"cluster"}
                key={grupo.nombre}
                groupInfo={grupo}
                eliminarFunc={removeFromOriginalList}
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
