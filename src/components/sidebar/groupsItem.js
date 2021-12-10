import React, { useState } from "react";
import "./sidebar.css";
import Groupform from "./groupform";
import {GrFormNextLink} from "react-icons/gr";
import {BsCheckLg} from "react-icons/bs";

const GroupsItem = (props) => {
  const [selected, setSelected] = useState(false);

  const removeGroupFromnTree = () =>{
    setSelected(false);
    let newArr = Object.assign([],props.groupsCluster);
    newArr = newArr.filter((d)=>(d.id !== props.id && d.nombre !== props.name));
    props.setGroupsCluster(newArr);
  }

  return (
    <div className="row my-2 lenghtgrupos" key={props.name}>
      <div className="col-12 fases">
        <button
          className="btn btn-light buttongrupos"
          onClick={() => {
            props.hClick(props.name);
          }}
        >
          {props.name}
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
