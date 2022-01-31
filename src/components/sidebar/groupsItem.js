import React, { useState, useEffect  } from "react";
import "./sidebar.css";
import Groupform from "./groupform";
import {GrFormNextLink} from "react-icons/gr";
import {BsCheckLg} from "react-icons/bs";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import { deleteGrupo, deleteGrupoCluster } from "../../services/gruposUtils.js"

const GroupsItem = (props) => {
  const [selected, setSelected] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState(false);

  const removeGroupFromnTree = () =>{
    setSelected(false);
    let newArr = Object.assign([],props.groupsCluster);
    newArr = newArr.filter((d)=>(d.id !== props.id && d.nombre !== props.name));
    props.setGroupsCluster(newArr);
  }

  useEffect(() => {
    if(props.deleted.nombre === props.groupInfo.nombre && props.deleted.id === props.groupInfo.id){
      if(selected){//antes de eliminarlo lo saca del tree
        removeGroupFromnTree();
      }
      removeGroupFromDatabase();
    }
  }, [props.deleted]);

  /**
   * <button
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
   */

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
    else if(props.tipo ==="cluster"){
      setSelected(false);
      deleteGrupoCluster(props.id).then((res)=>{
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
        className="btn btn-light"
        title="Eliminar grupo"
        onClick={() =>{
          props.handleShow(props.groupInfo);
        }}>
          <AiFillDelete/>
        </button>
        <button
        className={selectedEdit? "btn btn-primary":"btn btn-light"}
        title="Editar grupo"
        onClick={() =>{
          /**
          if(selectedEdit){
            setSelectedEdit(false);
            hideEditPanel();
          }
          else{
            setSelectedEdit(true);
            showEditPanel();
          }*/
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


        }}>
          <AiFillEdit/>
        </button>
        <button
        title="Añadir al arbol"
        className={selected? "btn btn-danger buttongrupos":"btn btn-light buttongrupos"}
        onClick={() => {
          if(selected){
            removeGroupFromnTree();
          }
          else{
            setSelected(true);
            props.setGroupsCluster(s=>([...s,props.groupInfo]));
          }
        }}
        >
          {props.name}{" "}{selected ? <BsCheckLg/>:<GrFormNextLink/>}
        </button>
      </div>
    </div>
  );
};

export default GroupsItem;
