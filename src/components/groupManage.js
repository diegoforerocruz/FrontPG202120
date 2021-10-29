import React, { useState, useEffect } from "react";
import "./sidebar/sidebar.css";
import GroupsItem from "./sidebar/groupsItem";

import data from "./sidebar/fakedatagroups";
import Groupform from "./sidebar/groupform";
import Groupdetail from "./groupdetail";

const GroupManage = () => {
  const [grupoClicked, setgrupoClicked] = useState(null);

  useEffect(() => {}, []);
  console.log(grupoClicked);
  return (
    <div className="row  mx-1">
      <div className="mx-1 my-2 sidebarwidth card col-3">
        <div className="card-body">
          <div className="row my-2 ">
            <h3 className="col-8">Grupos</h3>
          </div>
          <div className="gestionGrupos ">
            {data.map((grupo) => {
              return (
                <div className="row my-2 lenghtgrupos" key={grupo.nombregrupo}>
                  <div className="col">
                    <button
                      className="btn btn-light buttongrupos"
                      onClick={() => {
                        setgrupoClicked(grupo);
                      }}
                    >
                      {grupo.nombregrupo}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-8 card mx-1 my-2 ">
        <div className="card-body">
          {grupoClicked == null ? (
            <div>
              <h1>Escoga un grupo</h1>
              <Groupdetail groupInfo={grupoClicked} visibility={"d-none"} />
            </div>
          ) : (
            <Groupdetail groupInfo={grupoClicked} visibility={""} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupManage;
