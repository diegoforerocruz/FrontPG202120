import React, { useState } from "react";
import "./sidebar.css";
import Groupform from "./groupform";
import {GrFormNextLink} from "react-icons/gr";
import {BsCheckLg} from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import { deleteGrupo } from "../../services/gruposUtils.js"

const GroupsItem = (props) => {
  const [selected, setSelected] = useState(false);

  const removeGroupFromnTree = () =>{
    setSelected(false);
    let newArr = Object.assign([],props.groupsCluster);
    newArr = newArr.filter((d)=>(d.id !== props.id && d.nombre !== props.name));
    props.setGroupsCluster(newArr);
  }

  const removeGroupFromDatabase = () =>{
    if(props.tipo ==="manual"){
      setSelected(false);
      deleteGrupo(props.id).then((res)=>{
        if(res["res"]==="group deleted successfuly"){
          props.eliminarFunc(props.id,props.name,props.tipo);
        }
        else{
          //indicarle al usuario que no se pudo eliminar el grupo
        }
      })
    }
  }

  return(
    <div className="row my-2 lenghtgrupos" key={props.name}>
      <div className="col-12 fases">
        <button
          className={props.grupoClicked? ( props.grupoClicked.nombre === props.name ? "btn btn-primary buttongrupos":"btn btn-light buttongrupos"):"btn btn-light buttongrupos"}
          onClick={() => {
              if(props.grupoClicked){
                if(props.grupoClicked.nombre === props.name){
                  props.handleClick({nombre:""});
                }
                else{
                  props.handleClick(props.groupInfo);
                }
              }
              else{
                props.handleClick({nombre:""});
              }
          }}
        >
          {props.name}
        </button>
        <button
        className="btn btn-light"
        title="Eliminar grupo"
        onClick={() =>{
          if(selected){//antes de eliminarlo lo saca del tree
            removeGroupFromnTree();
          }
          removeGroupFromDatabase();
        }}>
          <AiFillDelete/>
        </button>
        <button
        className={selected? "btn btn-danger":"btn btn-light"}
        title="Añadir al arbol"
        onClick={() =>{
          if(selected){
            removeGroupFromnTree();
          }
          else{
            setSelected(true);
            props.setGroupsCluster(s=>([...s,props.groupInfo]));
          }
        }}>
          {selected ? <BsCheckLg/>:<GrFormNextLink/>}
        </button>
      </div>
    </div>
  );
};

export default GroupsItem;
