import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { getBins } from "../../services/gruposUtils.js";
import CreateGroupTree from "../tree/createGroupTree.js";
import FaseSettingsModal from "../tree/faseSettingsModal.js";
import { FcSettings } from 'react-icons/fc';
import { HiSave } from 'react-icons/hi';
import { AiOutlineReload } from 'react-icons/ai';
import Select from "react-select";
import TreeClass from "./TreeClass.js";

function Tree(props) {

  const d3ToPng = require('d3-svg-to-png');

  const [listaTrees, setListaTrees] = useState({lista:{},flag:{}});
  const [listaTreesC, setListaTreesC] = useState({lista:{},flag:{}});

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      width: '227px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      width: '227px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),
  };

  const customStylesEtapas = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      width: '197px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      width: '197px',
      padding: '0 6px'
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),
  };

  const [fase0, setFase0] = useState({fase:"fase0",grupos:[]});
  const [fases, setFases] = useState([
    {fase:"fase1", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]},
    {fase:"fase2", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]},
    {fase:"fase3", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]},
    {fase:"fase4", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]}
  ]);
  
  const [show, setShow] = useState({show:false,data:[],significados:[],datasource:null,estadisticas:{}});
  const [showFaseSettings, setShowFaseSettings] = useState({show:false,fase:{}});
  const canvas = useRef();
  const canvasDownload= useRef();

  const handleShow = (selectedGroup,significados,datasource,estadisticas) => setShow(s=> ({data:selectedGroup,show:true,significados:significados,datasource:datasource,estadisticas:estadisticas}));
  const handleShowFaseSettingsModal = (pFase) => {setShowFaseSettings({show:true,fase:pFase})};

  const geteventosTemporales = (fase,etapas) => {
    return (
      <Select
        onChange={(value) => {
          if(value){
            updateFase("changeEvent",fase, null, value.value, null);
          }
        }}
        className="select-optional"
        isClearable={true}
        aria-labelledby="aria-label"
        inputId="aria-example-input"
        name="aria-live-color"
        placeholder="etapa/evento"
        options={etapas}
        styles={customStylesEtapas}
        />
    );
  };


  const getVariables = (fase) => {
    return (
      <Select
      onChange={(value) => {
        if(value){
          updateFase("changeVar",fase, value.value, null, null);
        }
      }}
      className="select-optional"
      isClearable={true}
      aria-labelledby="aria-label"
      inputId="aria-example-input"
      name="aria-live-color"
      placeholder="Ingresar variable"
      options={props.variables}
      styles={customStyles}
      />
    );
  };

  const cleanRequest = (x) => {
    let rta = {
      limiteinf: x.limiteinf ? parseFloat(x.limiteinf):null,
      limitesup: x.limitesup ? parseFloat(x.limitesup):null,
      igual: x.igual,
      variable: x.variable,
      tipo: x.tipo
    };
    return rta;
  };

  const convertToTree = (x,fase,parent,conditions, meaning,datasource,tipo) => {
    let newArr = conditions ? JSON.parse(JSON.stringify(conditions)) : [];
    newArr.push(cleanRequest(x));
    x.children = [];
    x.fase = fase;
    x.grupo = newArr;
    x.tipo = tipo;
    x.datasource = datasource;
    x.oculto = false;
    x.id = (parent ? parent.id : "null")+"inf"+(x.limiteinf ? x.limiteinf.toString() : "null")+"sup"+(x.limitesup ? x.limitesup.toString() : "null")+"igual"+(x.igual ? x.igual.toString() : "null");
    x.uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    x.color = "#"+Math.floor(Math.random()*16777215).toString(16);
    x.traduccion = meaning ? meaning : x.igual;
    return x
  };
  
  const label = (d) => {
    let r="";
    if (d.limiteinf && d.limitesup) r=` [ ${d.limiteinf} , ${d.limitesup} ]`;
    else if (d.limiteinf) r=`${d.variable} > ${d.limiteinf}`;
    else if(d.limitesup) r=`${d.variable} < ${d.limitesup}`;
    else if(d.igual || (d.nombre && d.id)) r=`${d.traduccion}`;
    return r;
  };

  const getColor = (d) => {
    return d.parent == null ? "#19c2bf" : d.parent.data.color;
  }

  const convertConditionsToRequest = (x,y) => {
    var neww = {
      condiciones_previas:x,
      estructura_grupos:y
    }
    return neww;
  };

  const downloadSVG = () => {
    d3.selectAll(`.listaTreeDownload`).remove();
    for (let i of Object.keys(listaTrees.lista)){
      let h = d3.hierarchy(listaTrees.lista[i].getRoot(), function(d){return d.children});
      graphDownload(h,`svgD${i}`,i,{
        xScale : props.groupsCluster.length >0? (j) => 267+j*0.5: (j) => 32+j*0.5 ,
        descXScale: props.groupsCluster.length >0? (j) => 235+(235*j-9):(j) => (235*j-9),
        class_name: "listaTreeDownload"});
    }
    d3.selectAll(`.listaTreeCDownload`).remove();
    for (let i of Object.keys(listaTreesC.lista)){
      if( props.groupsCluster.filter((d)=>(d.nombre === listaTreesC.lista[i].getRoot().traduccion))[0]){
        let h = d3.hierarchy(listaTreesC.lista[i].getRoot(), function(d){return d.children});
        graphDownload(h,`svgCD${i}`,i,{
          descXScale: props.groupsCluster.length >0? (j) => 235+(235*j-9):(j) => (235*j-9),
          class_name: "listaTreeCDownload"
        });
      }
    }
    for (let i of Object.keys(listaTrees.lista)){
      d3ToPng(`#svgD${i}`, `diagrama arbol ${i}`, {
        scale: 1,
        format: 'png',
        quality: 0.92,
        download: true,
        ignore: null,
        width:900,
        cssinline: 1
      }).then(fileData => {
      });
    }
    for (let i of Object.keys(listaTreesC.lista)){
      d3ToPng(`#svgCD${i}`, `diagrama arbol grupo ${i}`, {
        scale: 1,
        format: 'png',
        quality: 0.92,
        download: true,
        ignore: null,
        width:900,
        cssinline: 1
      }).then(fileData => {
      });
    }
  };

  useEffect(() => {
    setFase0(s=>({...s,grupos:props.groupsCluster}))
  }, [props.groupsCluster]);

  useEffect(()=>{
    buildArbol("fase0");
  },[fase0]);

  const updateFase = (source, pFase, pVariable, pEtapa, bins) => {
    let newArr = Object.assign([],fases);
    for (let i = 0; i< newArr.length; i++){
      if (newArr[i].fase === pFase){
        if(source === "changeEvent"){
          if(newArr[i].variable !== null){//ya tiene una variable asignada
            let f = props.data_real.filter(s=> (s.nombre_general === newArr[i].variable && (s.evento === pEtapa || s.etapa === pEtapa)));
            if (f.length > 0){
              newArr[i].variable_real = f[0].nombre_real;
              newArr[i].tipo = f[0].tipo;
              newArr[i].min = f[0].min;
              newArr[i].max = f[0].max;
              newArr[i].significados = f[0].significados;
              setFases(newArr);
              buildArbol(pFase);
              //SI EXISTE SE ACTUALIZA EL ARBOL
            }
            else{//EXCEPCIÓN PORQUE NO EXISTE
              newArr[i].variable_real = null;
              newArr[i].tipo = null;
              newArr[i].min = 0;
              newArr[i].max = 10000;
              newArr[i].significados = [];
              setFases(newArr);
            }
          }
          newArr[i].etapa = pEtapa;
        }
        else if(source === "changeVar"){
          let tapas = props.variables_real.filter((d)=>(d.title === pVariable))[0];
          if(newArr[i].etapa !== null){//ya tiene una etapa asignada
            let f = props.data_real.filter(s=> (s.nombre_general === pVariable && (s.evento === newArr[i].etapa || s.etapa === newArr[i].etapa)));
            if (f.length > 0){
              newArr[i].variable_real = f[0].nombre_real;
              newArr[i].tipo = f[0].tipo;
              newArr[i].min = f[0].min;
              newArr[i].max = f[0].max;
              newArr[i].significados = f[0].significados;
              newArr[i].lista_etapas = tapas?tapas.etapa:[];
              setFases(newArr);
              buildArbol(pFase);
              //SI EXISTE SE ACTUALIZA EL ARBOL
            }
            else{
              newArr[i].variable_real = null;
              newArr[i].tipo = null;
              newArr[i].min = 0;
              newArr[i].max = 10000;
              newArr[i].significados = [];
              newArr[i].lista_etapas = tapas?tapas.etapa:[];
              setFases(newArr);
            }
          }
          else{
            newArr[i].lista_etapas = tapas?tapas.etapa:[];
            setFases(newArr);
          }
          newArr[i].variable = pVariable;
        }
      }
    }
  };

  const clickMinus = (node,index) => {
    if(node.data.tipo ===1){
      listaTrees.lista[index].hideChildren(node.data);
    }
    else{
      listaTreesC.lista[index].hideChildren(node.data);
    }
    
    redrawTree();
  }

  const addGroup = (d,i) => {
    let sigs = [];
    if(i.data.tipo !== 2){
      let t = props.data_real.filter((d)=>(d.nombre_real === i.data.variable))[0];
      if(t){
        sigs = t.significado;
      }
    }
    handleShow(i.data.grupo,sigs,i.data.datasource,{conteo:i.data.conteo, percentage:i.data.percentage});
  }

  const clickCancel = (node,index) => {
    if(node.data.tipo ===1){
      listaTrees.lista[index].deleteNode(node.data);
    }
    else{
      listaTreesC.lista[index].deleteNode(node.data);
    }
    redrawTree();
  };

  function graphDownload(rot,svgid,index,{
    highlight = () => false,
    marginLeft = 40,
    width= 900,
    xScale = (j) => 32+j*0.5,
    yScale = (j) => j*0.7,
    descXScale = (j) => (235*j-9),
    class_name= ""
  } = {}) {

    let depthScale = 470; //fase 3: 350, fase 3:
    let dx=100;
    let dy=25;
    let treeLink = d3.linkHorizontal().x(d => (xScale(d.y))).y(d => (yScale(d.x)));
    let tre = d3.tree().nodeSize([dx,dy]);
    rot = tre(rot);

    rot.each(function(d) { d.y = d.depth * depthScale; });

    let x0 = Infinity;
    let x1 = -x0;
    rot.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3.select(canvasDownload.current)
        .append("svg")
        .attr("viewBox", [0, 0, width, (x1 - x0 + dx * 2)])
        .attr("id",svgid)
        .attr("class",class_name)
        .style("overflow", "visible");

    const g = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("transform", `translate(${marginLeft},${dx - x0})`);

    g.append("g")
    .attr("fill","none")
    .selectAll("g")
    .data(fases.filter((d)=> (d.variable_real!=null)))
    .join(enter =>{
      let desc = enter
        .append("g");
      desc.append("rect")
      .attr("width", 227)
      .attr("height",1)
      .attr("y",x0-15)
      .attr("fill","black")
      .attr("x",(d,i)=>descXScale(i));
      desc.append("text")
      .attr("fill","black")
      .attr("y",x0-30)
      .attr("x",(d,i)=>descXScale(i))
      .attr("text-anchor", "start")
      .style("font-weight",700)
      .text(d =>d.variable);
      desc.append("text")
      .attr("fill","black")
      .attr("y",x0-19)
      .attr("x",(d,i)=>descXScale(i))
      .attr("text-anchor", "start")
      .text(d => d.etapa);
      return desc;
    });
      
    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(rot.links())
      .join("path")
        .attr("stroke", d => highlight(d.source) && highlight(d.target) ? "red" : null)
        .attr("stroke-opacity", d => highlight(d.source) && highlight(d.target) ? 1 : null)
        .attr("d", treeLink);
    
    const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(rot.descendants())
      .join(enter => {
              var nodeEnter = enter
              .append("g")
              .attr("class", "node");
              nodeEnter.append("rect")
              .attr("width", 100)
              .attr("height",25)
              .attr('class', 'rect0')
              nodeEnter.append("rect")
              .attr("width", d => d.data.percentage)
              .attr("height",25)
              .attr('class', 'rect')
              .attr("fill",d => getColor(d));
              nodeEnter.append("rect")
              .attr("width", 100)
              .attr("height",25)
              .attr('class', 'rect2')
              .on("click",(d,i)=>addGroup(d,i));
              nodeEnter.append("text")
              .attr("x", d => d.children ? 0:102)
              .attr("font-weight", 700)
              .attr("y",d => d.children ?-7:22)
              .text(d => `(${parseFloat(d.data.percentage).toFixed(2)}%)`);
              nodeEnter.append("text")
              .attr("fill", d => highlight(d) ? "red" : null)
              .attr("y", d => d.children ? -19:10)
              .attr("x", d => d.children ? 0 : 102)
              .attr("text-anchor", d => d.children ? "center" : "start")
              .text(d => label(d.data));
              return nodeEnter;
      })
        .attr("transform", d => `translate(${xScale(d.y)-40},${yScale(d.x)-12})`);

    return svg.node();
  }

  function graph(rot,svgid,index,{
    highlight = () => false,
    marginLeft = 40,
    width= 900,
    xScale = (j) => 32+j*0.5,
    yScale = (j) => j*0.7,
    class_name= ""
  } = {}) {

    let depthScale = 470; //fase 3: 350, fase 3:
    let dx=100;
    let dy=25;
    let treeLink = d3.linkHorizontal().x(d => (xScale(d.y))).y(d => (yScale(d.x)));
    let tre = d3.tree().nodeSize([dx,dy]);
    rot = tre(rot);

    rot.each(function(d) { d.y = d.depth * depthScale; });

    let x0 = Infinity;
    let x1 = -x0;
    rot.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const svg = d3.select(canvas.current)
        .append("svg")
        .attr("viewBox", [0, 0, width, (x1 - x0 + dx * 2)])
        .attr("id",svgid)
        .attr("class",class_name)
        .style("overflow", "visible");

    const g = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("transform", `translate(${marginLeft},${dx - x0})`);
      
    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(rot.links())
      .join("path")
        .attr("stroke", d => highlight(d.source) && highlight(d.target) ? "red" : null)
        .attr("stroke-opacity", d => highlight(d.source) && highlight(d.target) ? 1 : null)
        .attr("d", treeLink);
    
    const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(rot.descendants())
      .join(enter => {
              var nodeEnter = enter
              .append("g")
              .attr("class", "node");
              nodeEnter.append("rect")
              .attr("width", 100)
              .attr("height",25)
              .attr('class', 'rect0');
              nodeEnter.append("rect")
              .attr("width", d => d.data.percentage)
              .attr("height",25)
              .attr('class', 'rect')
              .attr("fill",d => getColor(d));
              nodeEnter.append("rect")
              .attr("width", 100)
              .attr("height",25)
              .attr('class', 'rect2')
              .on("click",(d,i)=>addGroup(d,i));
              nodeEnter.append("text")
              .attr("x", d => d.children ? 0:106)
              .attr("font-weight", 700)
              .attr("y",d => d.children ?-7:22)
              .text(d => `(${parseFloat(d.data.percentage).toFixed(2)}%)`);
              nodeEnter.append("text")
              .attr("fill", d => highlight(d) ? "red" : null)
              .attr("y", d => d.children ? -19:10)
              .attr("x", d => d.children ? 0 : 106)
              .attr("text-anchor", d => d.children ? "center" : "start")
              .text(d => label(d.data));
              nodeEnter.append("circle")
              .attr("r",(d)=> d.parent? 8:0)
              .attr("fill","gray")
              .attr("cx",(d)=> d.parent? 98:0)
              .attr("id", (d,i) => {return "a"+parseInt(d.x).toString()+parseInt(d.y).toString();})
              .on("mouseover", (event, [a]) => {nodeEnter.select("#a"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","red");})
              .on("mouseout",  (event, [a]) => {nodeEnter.select("#a"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","gray");})
              .on("click", (d,i) => clickCancel(i,index));
              nodeEnter.append("image")
              .attr("xlink:href",(d)=> d.parent? "https://www.svgrepo.com/show/104330/cancel.svg":null)
              .attr("width", (d)=> d.parent? 8: 0)
              .attr("height", (d)=> d.parent? 8:0)
              .attr("x",(d)=> d.parent? 94:0)
              .attr("y",(d)=> d.parent? -4:0)
              .attr("color","white");
              let nodeMinus = nodeEnter.append("circle")
              .attr("r", 8)
              .style("fill",d => d.data.oculto?"blue":"lightgray")
              .attr("cx", (d)=> d.parent? 82: 98)
              .attr("id", (d,i) => {return "b"+parseInt(d.x).toString()+parseInt(d.y).toString();})
              .on("mouseover", (event, [a]) => {
                if(a.data.oculto === false)nodeEnter.select("#b"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","blue");
              })
              .on("mouseout",  (event, [a]) => {
                if(a.data.oculto === false)nodeEnter.select("#b"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","lightgray");
              })
              .on("click", (d,i) => clickMinus(i,index));
              nodeEnter.append("image")
              .attr("xlink:href","https://www.svgrepo.com/show/376008/dash.svg")
              .attr("width", 10)
              .attr("height", 10)
              .attr("x",(d)=> d.parent? 77:93)
              .attr("y",-5)
              .attr("color","white");
              nodeEnter.append("title")
              .text(d => `${parseFloat(d.data.percentage).toFixed(2)}%\nConteo: ${parseFloat(d.data.conteo)}`);
              return nodeEnter;
      })
        .attr("transform", d => `translate(${xScale(d.y)-40},${yScale(d.x)-12})`);
    return svg.node();
  }

  const redrawTree = ({
    xScale = (j) => 32+j*0.5,
    yScale = (j) => j*0.7
  }={}) => {
    d3.selectAll(`.listaTree`).remove();
    for (let i of Object.keys(listaTrees.lista)){
      let h = d3.hierarchy(listaTrees.lista[i].getRoot(), function(d){return d.children});
      graph(h,`svg${i}`,i,{
        xScale : fase0.grupos.length > 0? (j)=>267+j*0.5:xScale,
        yScale : yScale,
        class_name: "listaTree"
      });
    }
    d3.selectAll(`.listaTreeC`).remove();
    for (let i of Object.keys(listaTreesC.lista)){
      if( props.groupsCluster.filter((d)=>(d.nombre === listaTreesC.lista[i].getRoot().traduccion))[0]){
        d3.selectAll(`#svgC${i}`).remove();
        let h = d3.hierarchy(listaTreesC.lista[i].getRoot(), function(d){return d.children});
        graph(h,`svgC${i}`,i,{
          class_name: "listaTreeC"
        });
      }
    }
  }


  useEffect(()=>{
    redrawTree();
  },[listaTrees.lista,listaTreesC.lista]);


  const loadOtherFases = (numFaseActual,item,var_act,tipos_permitidos,avaliable_lists) =>{
    let faseAnterior = "fase"+(numFaseActual-1).toString();
    for(let itemm of avaliable_lists){
      let temArr = itemm ==="a"? Object.assign([],listaTrees.lista):Object.assign([],listaTreesC.lista);
      for(let arbol of temArr){
        var listaConHojas = arbol.getNodesInLevel(faseAnterior, arbol.getRoot());
        for(let hoja of listaConHojas){
          let tipo_arb= hoja.tipo_arbol;
          if(tipos_permitidos.indexOf(tipo_arb) !== -1){
            getBins(item.bins,item.variable_real,item.tipo,convertConditionsToRequest(hoja.grupo,item.estructura_grupo),tipo_arb === "tipo0"?hoja.datasource:"data").then((res) => {
              if(res){
                res = res.filter((d)=>(d.igual!=="no hay dato"));//o no está en significados
                let tempArr2 = [];
                for (let response of res){
                  let traduccion = null;
                  if(item.tipo === 2 && var_act[0]){
                    let lista_respuestas = var_act[0].significados.filter((f)=>(parseInt(f.valor_db) === parseInt(response.igual)));
                    if(lista_respuestas[0])traduccion=lista_respuestas[0].valor_traducido;
                  }
                  let r = JSON.parse(JSON.stringify(convertToTree(response,item.fase,hoja,hoja.grupo,traduccion,hoja.tipo_arbol,hoja.datasource)));
                  tempArr2.push(r);
                }
                hoja.children = tempArr2;
                //itemm ==="a"? setListaTrees((s)=>temArr):setListaTreesC((s)=>temArr);
              }
            });
          }
        }
      }
    }
  };

  //fase 1
  //recursiveBins(1,pBins,pVar,pTipo,[],[],"data",null,null,null,1)

  function recursiveBins(numFaseActual,pBins,pVar,pTipo,pGrupoNodoPadre,pEstructuraGrupo,pDataSource,pPadre,pIndex,pRoot,pTipoArbol){
    getBins(pBins,pVar,pTipo,convertConditionsToRequest(pGrupoNodoPadre,pEstructuraGrupo),pDataSource).then((res)=>{
      if(res){
        //TRANFORMAR LOS NODOS Y LIMPIARLOS 
        let varObject = props.data_real.filter((d)=>(d.nombre_real === pVar))[0];
        let listaNewNodos = [];
        for (let nodo of res){
          let traduccion = null;
          if(pTipo === 2 && varObject){
            let significado = varObject.significados.filter((f)=>( (f.valor_db).toString() === (nodo.igual).toString() ))[0];
            if(significado)traduccion= significado.valor_traducido;
          }
          if((pTipo === 1 && nodo.igual !== "no hay dato")||(pTipo === 2 && traduccion !== null && nodo.igual !== "no hay dato")){
            let r = JSON.parse(JSON.stringify(convertToTree(nodo,`fase${numFaseActual}`,pPadre,pGrupoNodoPadre,traduccion,pDataSource,pTipoArbol)));
            listaNewNodos.push(r);
          }
        }
        let tempRoots={};//Este arreglo es necesario si solo se activa la fase 1
        if(pRoot){
          pRoot.addChildren(pPadre,listaNewNodos);
        }
        else if(pTipoArbol === 1){
          for(let j=0;j<listaNewNodos.length;j++){
            tempRoots[j]=new TreeClass(listaNewNodos[j]);
          }
        }

        let nextFase = `fase${numFaseActual+1}`;
        let faseFound = fases.filter((d)=>(d.fase===nextFase));
        if(faseFound[0] && listaNewNodos.length>0){//existe una fase siguiente
          if(faseFound[0].variable_real){//existe una fase siguiente y ya se le asignó una variable
            let i = 0;
            for (let child of listaNewNodos){//BUSCAR LOS HIJOS DE LOS NODOS YA AÑADIDOS AL ARBOL
              if(pRoot){
                recursiveBins(numFaseActual+1,faseFound[0].bins,faseFound[0].variable_real,faseFound[0].tipo,child.grupo,faseFound[0].estructura_grupo,pDataSource,child,pIndex,pRoot,pTipoArbol);
              }
              else if(pTipoArbol === 1){
                recursiveBins(numFaseActual+1,faseFound[0].bins,faseFound[0].variable_real,faseFound[0].tipo,child.grupo,faseFound[0].estructura_grupo,pDataSource,child,i,tempRoots[i],pTipoArbol);
              }
            i+=1;
            }
          }
          else{
            if(pTipoArbol === 1){
              if(pRoot!==null){
                let tempArr = Object.assign({},listaTrees.lista);
                tempArr[pIndex] = pRoot;
                setListaTrees((s)=>({...s,lista:tempArr}));
              }
              else{
                setListaTrees((s)=>({...s,lista:tempRoots}));
              }
            }
            else if(pTipoArbol === 2){
              if(pRoot && pIndex){
                let tempArr = Object.assign({},listaTreesC.lista);
                tempArr[pIndex] = pRoot;
                setListaTreesC((s)=>({...s,lista:tempArr}));
              }
            }
          }
        }
        else{
          if(pTipoArbol === 1){
            if(pIndex && pRoot){
              let tempArr = Object.assign({},listaTrees.lista);
              tempArr[pIndex] = pRoot;
              setListaTrees((s)=>({...s,lista:tempArr}));
            }
            else{
              setListaTrees((s)=>({...s,lista:tempRoots}));
            }
          }
          else if(pTipoArbol === 2){
            if(pRoot && pIndex){
              let tempArr = Object.assign({},listaTreesC.lista);
              tempArr[pIndex] = pRoot;
              setListaTreesC((s)=>({...s,lista:tempArr}));
            }
          }
        }

      }
      else{
        //mostrar mensaje de error
      }
    });
  }

  useEffect(()=>{
    let fase1temp = fases.filter((d)=>(d.fase==="fase1"))[0];
    if(fase0.grupos && fase1temp.variable_real){
      for (let i of Object.keys(listaTreesC.lista)){
        let refRoot = Object.assign([],[listaTreesC.lista[i]]);
        let refHoja = Object.assign({},listaTreesC.lista[i].getRoot());
        recursiveBins(1,fase1temp.bins,fase1temp.variable_real,fase1temp.tipo,[],fase1temp.estructura_grupo,refHoja.datasource,refHoja,i,refRoot[0],2);
      }
    }
  },[listaTreesC.flag]);

  useEffect(()=>{
    let fase1temp = fases.filter((d)=>(d.fase==="fase1"))[0];
    if(fase1temp.variable_real){
        recursiveBins(1,fase1temp.bins,fase1temp.variable_real,fase1temp.tipo,[],fase1temp.estructura_grupo,"data",null,null,null,1);
    }
  },[listaTrees.flag]);

  function buildArbol(faseComienzo) {
    let numFaseComienzo = parseInt(faseComienzo.slice(-1));
    let fase = fases.filter((d)=>(d.fase===faseComienzo));
    if(faseComienzo ==="fase0"){
      let tArr = {};
      let gr = JSON.parse(JSON.stringify(fase0.grupos));
      let indx = 0;
      for (let gr_item2 of gr){
        let gr_item= Object.assign({},gr_item2);
        let r = convertToTree(gr_item,"fase0",null,null, gr_item.nombre,gr_item.nombre,2);
        tArr[indx]=new TreeClass(r);
        indx+=1;
      }
      setListaTreesC((s)=>({ lista:tArr, flag:!(s.flag) }));
    }
    if(fase[0]){
      if(faseComienzo ==="fase1"){
        setListaTrees((s)=>({ lista:{}, flag:!(s.flag) }));
        for (let i of Object.keys(listaTreesC.lista)){
          let refRoot = Object.assign([],[listaTreesC.lista[i]]);
          let hojas = listaTreesC.lista[i].getNodesInLevel(`fase${numFaseComienzo-1}`,listaTreesC.lista[i].getRoot());
          for(let hoja of hojas){
            recursiveBins(numFaseComienzo,fase[0].bins,fase[0].variable_real,fase[0].tipo,[],fase[0].estructura_grupo,hoja.datasource,hoja,i,refRoot[0],2);
          }
        }  

      }
      else{
        for (let i of Object.keys(listaTrees.lista)){
          let refRoot = Object.assign([],[listaTrees.lista[i]]);
          let hojas = listaTrees.lista[i].getNodesInLevel(`fase${numFaseComienzo-1}`,listaTrees.lista[i].getRoot());
          for(let hoja of hojas){
            recursiveBins(numFaseComienzo,fase[0].bins,fase[0].variable_real,fase[0].tipo,hoja.grupo,fase[0].estructura_grupo,hoja.datasource,hoja,i,refRoot[0],1);
          }
        }
        for (let i of Object.keys(listaTreesC.lista)){
          let refRoot = Object.assign([],[listaTreesC.lista[i]]);
          let hojas = listaTreesC.lista[i].getNodesInLevel(`fase${numFaseComienzo-1}`,listaTreesC.lista[i].getRoot());
          for(let hoja of hojas){
            recursiveBins(numFaseComienzo,fase[0].bins,fase[0].variable_real,fase[0].tipo,hoja.grupo,fase[0].estructura_grupo,hoja.datasource,hoja,i,refRoot[0],2);
          }
        }
      }
    }
  }

  const refresh = () =>{
    setFases([
      {fase:"fase1", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]},
      {fase:"fase2", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]},
      {fase:"fase3", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]},
      {fase:"fase4", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[], lista_etapas:[]}
    ]);
    setFase0({fase:"fase0",grupos:[]});
    setListaTrees({lista:{},flag:{}});
    setListaTreesC({lista:{},flag:{}});
    d3.selectAll(`.listaTree`).remove();
    d3.selectAll(`.listaTreeC`).remove();
    d3.selectAll(".listaTreeDownload").remove();
    d3.selectAll(".listaTreeCDownload").remove();
  };

  const addFase = () => {
    let newFase = "fase"+ (fases.length+1).toString();
    setFases([...fases,{fase:newFase, variable_real: null, significados:[], tipo: null, min: 0, max: 10000,variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]}]);
  };

  return (
  <div>
    <div className="fases fixed-fases">
    <div>
      <button className="settingsArbol" onClick={() => {downloadSVG()}}><HiSave/></button>
      <button className="settingsArbol" onClick={() => {refresh()}}><AiOutlineReload/></button>
    </div>
      {fase0.grupos.length > 0? (
        <div>
          <div  className="fase0"></div>
        </div>): null
      }    
      {
        fases.map(fase => {
          return (
            <div>
                {getVariables(fase.fase)}
                <div className="fases">
                  {geteventosTemporales(fase.fase,fase.lista_etapas)}
                  <button
                  className="settingsFase"
                  onClick={() => {
                    handleShowFaseSettingsModal(fase)
                  }}
                  >
                    <FcSettings/>
                  </button>
                </div>
            </div>
          );
        })
      }
      <button typr="button" className="buttonAddPhase" onClick= {() => addFase()}>+</button>
    </div>
    <div ref={canvas} id="canvas"></div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <div ref={canvasDownload}></div>
    <CreateGroupTree show={show.show} setShow={setShow} data={show.data} significados={show.significados} datasource={show.datasource} estadisticas={show.estadisticas} data_real={props.data_real}/>
    <FaseSettingsModal show={showFaseSettings.show} setShow={setShowFaseSettings} fase={showFaseSettings.fase} setFases={setFases} fases={fases} buildArbol={buildArbol}/>
  </div>
  );
}

export default Tree;