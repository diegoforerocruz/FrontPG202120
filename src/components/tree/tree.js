import React from "react";
import Search from "../search/Search.js";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { getBins } from "../../services/gruposUtils.js";
import CreateGroupTree from "../tree/createGroupTree.js";
import FaseSettingsModal from "../tree/faseSettingsModal.js";
import { FcSettings } from 'react-icons/fc';
import Select from "react-select";
import TreeClass from "./TreeClass.js";


function Tree(props) {

  const [listaTrees, setListaTrees] = useState({});
  const [listaTreesC, setListaTreesC] = useState({});

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '30px',
      width: '210px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      width: '210px',
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
      width: '180px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      width: '180px',
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
    {fase:"fase1", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]},
    {fase:"fase2", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]},
    {fase:"fase3", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]},
    {fase:"fase4", variable_real: null, tipo: null, significados: [], min: 0, max: 10000, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]}
  ]);
  
  const [show, setShow] = useState({show:false,data:[],significados:[],datasource:null,estadisticas:{}});
  const [showFaseSettings, setShowFaseSettings] = useState({show:false,fase:{}});
  const canvas = useRef();
  const canvasCluster = useRef();

  const handleShow = (selectedGroup,significados,datasource,estadisticas) => setShow(s=> ({data:selectedGroup,show:true,significados:significados,datasource:datasource,estadisticas:estadisticas}));
  const handleShowFaseSettingsModal = (pFase) => {setShowFaseSettings({show:true,fase:pFase})};

  const geteventosTemporales = (fase) => {
    return (
      <Select
        onChange={(value) => {
          updateFase("changeEvent",fase, null, value.value, null);
        }}
        className="select-optional"
        isClearable={true}
        aria-labelledby="aria-label"
        inputId="aria-example-input"
        name="aria-live-color"
        placeholder="etapa/evento"
        options={props.etapas}
        styles={customStylesEtapas}
        />
    );
  };

  const getVariables = (fase) => {
    return (
      <Select
      onChange={(value) => {
        updateFase("changeVar",fase, value.value, null, null);
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


  useEffect(() => {
    setFase0(s=>({...s,grupos:props.groupsCluster}))
    console.log("DEBIO CAMBIAR",fase0,props.groupsCluster);
  }, [props.groupsCluster]);

  useEffect(()=>{
    buildArbol("fase0");
    console.log(`ENTRO AL USEEFFECT`);
  },[fase0]);

  const updateFase = (source, pFase, pVariable, pEtapa, bins) => {

    let newArr = [...fases];
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
              return;//SE DEBERÍA DESHABILITAR LA ETAPA O ALGO ASÍ
            }
          }
          newArr[i].etapa = pEtapa;
        }
        else if(source === "changeVar"){
          if(newArr[i].etapa !== null){//ya tiene una etapa asignada
            let f = props.data_real.filter(s=> (s.nombre_general === pVariable && (s.evento === newArr[i].etapa || s.etapa === newArr[i].etapa)));
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
              return;//SE DEBERÍA DESHABILITAR LA ETAPA O ALGO ASÍ
            }
          }
          newArr[i].variable = pVariable;
        }
      }
    }
  };

  const clickMinus = (node,index) => {
    if(node.data.tipo ===1){
      listaTrees[index].hideChildren(node.data);
    }
    else{
      listaTreesC[index].hideChildren(node.data);
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
      listaTrees[index].deleteNode(node.data);
    }
    else{
      listaTreesC[index].deleteNode(node.data);
    }
    redrawTree();
  };


  function graph(rot,svgid,index,{
    highlight = () => false,
    marginLeft = 40,
    width= 900,
    xScale = (j) => j*0.5,
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
              .attr("fill", d => highlight(d) ? "red" : null)
              .attr("dy", "-0.7em")
              .attr("x", d => d.children ? 0 : 6)
              .attr("text-anchor", d => d.children ? "center" : "start")
              .text(d => label(d.data));
              let nodeCancel = nodeEnter.append("circle")
              .attr("r", 8)
              .attr("fill","gray")
              .attr("cx", 98)
              .attr("id", (d,i) => {return "a"+parseInt(d.x).toString()+parseInt(d.y).toString();})
              .on("mouseover", (event, [a]) => {nodeEnter.select("#a"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","red");})
              .on("mouseout",  (event, [a]) => {nodeEnter.select("#a"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","gray");})
              .on("click", (d,i) => clickCancel(i,index));
              nodeEnter.append("image")
              .attr("xlink:href","https://www.svgrepo.com/show/104330/cancel.svg")
              .attr("width", 8)
              .attr("height", 8)
              .attr("x",94)
              .attr("y",-4)
              .attr("color","white");
              let nodeMinus = nodeEnter.append("circle")
              .attr("r", 8)
              .style("fill",d => d.data.oculto?"blue":"lightgray")
              .attr("cx", 82)
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
              .attr("x",77)
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
    xScale = (j) => j*0.5,
    yScale = (j) => j*0.7
  }={}) => {
    d3.selectAll(`.listaTree`).remove();
    for (let i of Object.keys(listaTrees)){
      console.log(`LISTA ${i}`,listaTrees[i].getRoot());
      let h = d3.hierarchy(listaTrees[i].getRoot(), function(d){return d.children});
      graph(h,`svg${i}`,i,{
        xScale : fase0.grupos.length > 0? (j)=>230+j*0.5:xScale,
        yScale : yScale,
        class_name: "listaTree"
      });
    }
    d3.selectAll(`.listaTreeC`).remove();
    for (let i of Object.keys(listaTreesC)){
      d3.selectAll(`#svgC${i}`).remove();
      console.log(`LISTA ${i}`,listaTreesC[i].getRoot());
      let h = d3.hierarchy(listaTreesC[i].getRoot(), function(d){return d.children});
      graph(h,`svgC${i}`,i,{
        xScale : xScale,
        yScale : yScale,
        class_name: "listaTreeC"
      });
    }
  }


  useEffect(()=>{
    console.log(`ENTRÓ AL QUE TENPIA QUE ENTRAR`,listaTreesC);
    redrawTree();
  },[listaTrees,listaTreesC]);


  const loadOtherFases = (numFaseActual,item,var_act,tipos_permitidos,avaliable_lists) =>{
    let faseAnterior = "fase"+(numFaseActual-1).toString();
    for(let itemm of avaliable_lists){
      let temArr = itemm ==="a"? Object.assign([],listaTrees):Object.assign([],listaTreesC);
      console.log(`ENTRÓ A LOAD OTHER, TIpo`,itemm,temArr);
      for(let arbol of temArr){
        var listaConHojas = arbol.getNodesInLevel(faseAnterior, arbol.getRoot());
        for(let hoja of listaConHojas){
          console.log("LISTA CON HOJAS", listaConHojas);
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
                itemm ==="a"? setListaTrees((s)=>temArr):setListaTreesC((s)=>temArr);
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
            console.log("R",r);
            listaNewNodos.push(r);
          }
        }
        let tempRoots={};//Este arreglo es necesario si solo se activa la fase 1
        if(pRoot){
          console.log("pRoot",pRoot);
          console.log("addChildren Before",pPadre,listaNewNodos);
          pRoot.addChildren(pPadre,listaNewNodos);
          console.log("pRoot después",pRoot);
        }
        else if(pTipoArbol === 1){
          for(let j=0;j<listaNewNodos.length;j++){
            tempRoots[j]=new TreeClass(listaNewNodos[j]);
          }
        }
        console.log("tempRoots",tempRoots);

        let nextFase = `fase${numFaseActual+1}`;
        console.log("nextFase",nextFase);
        let faseFound = fases.filter((d)=>(d.fase===nextFase));
        console.log("faseFound",faseFound);
        if(faseFound[0] && listaNewNodos.length>0){//existe una fase siguiente
          if(faseFound[0].variable_real){//existe una fase siguiente y ya se le asignó una variable
            let i = 0;
            for (let child of listaNewNodos){//BUSCAR LOS HIJOS DE LOS NODOS YA AÑADIDOS AL ARBOL
              if(pRoot){
                console.log("let child of .. pRoot",pIndex,pRoot);
                recursiveBins(numFaseActual+1,faseFound[0].bins,faseFound[0].variable_real,faseFound[0].tipo,child.grupo,faseFound[0].estructura_grupo,pDataSource,child,pIndex,pRoot,pTipoArbol);
              }
              else if(pTipoArbol === 1){
                console.log("i y tempRoots",i,tempRoots[i]);
                recursiveBins(numFaseActual+1,faseFound[0].bins,faseFound[0].variable_real,faseFound[0].tipo,child.grupo,faseFound[0].estructura_grupo,pDataSource,child,i,tempRoots[i],pTipoArbol);
              }
            i+=1;
            }
          }
          else{
            console.log("pIndex && pRoot",pIndex, pRoot);
            if(pTipoArbol === 1){
              if(pRoot!==null){
                console.log("LISTATREES & tempArr",listaTrees);
                let tempArr = Object.assign({},listaTrees);
                tempArr[pIndex] = pRoot;
                console.log(" pTipoArbol === 1  tempArr ",tempArr);
                setListaTrees(tempArr);
              }
              else{
                console.log(" pTipoArbol === 1  tempRoots ",tempRoots);
                setListaTrees(tempRoots);
              }
            }
            else if(pTipoArbol === 2){
              if(pRoot && pIndex){
                let tempArr = Object.assign({},listaTreesC);
                tempArr[pIndex] = pRoot;
                setListaTreesC(tempArr);
              }
            }
          }
        }
        else{
          if(pTipoArbol === 1){
            if(pIndex && pRoot){
              let tempArr = Object.assign({},listaTrees);
              tempArr[pIndex] = pRoot;
              console.log(" pTipoArbol === 1  tempArr ",tempArr);
              setListaTrees(tempArr);
            }
            else{
              console.log(" pTipoArbol === 1  tempRoots ",tempRoots);
              setListaTrees(tempRoots);
            }
          }
          else if(pTipoArbol === 2){
            if(pRoot && pIndex){
              let tempArr = Object.assign({},listaTreesC);
              tempArr[pIndex] = pRoot;
              setListaTreesC(tempArr);
            }
          }
        }

      }
      else{
        //mostrar mensaje de error
      }
    });
  }

  function buildArbol(faseComienzo) {
    let numFaseComienzo = parseInt(faseComienzo.slice(-1));
    let fase = fases.filter((d)=>(d.fase===faseComienzo));
    let fasetemp1 = fases.filter((d)=>(d.fase==="fase1"))[0];
    if(faseComienzo ==="fase0"){
      let tArr = {};
      let gr = JSON.parse(JSON.stringify(fase0.grupos));
      console.log(`fase0 1step gr`,gr);
      let indx = 0;
      for (let gr_item2 of gr){
        let gr_item= Object.assign({},gr_item2);
        let r = convertToTree(gr_item,"fase0",null,null, gr_item.nombre,gr_item.nombre,2);
        tArr[indx]=new TreeClass(r);
        if(fasetemp1.variable_real){//SI HAY UNA FASE DESPUÉS DE ESTO
          recursiveBins(1,fasetemp1.bins,fasetemp1.variable_real,fasetemp1.tipo,[],fasetemp1.estructura_grupo,gr_item.nombre,tArr[indx].getRoot(),indx,tArr[indx],2);
        }
        indx+=1;
      }
      console.log(`fase0 2step tArr`,tArr);
      if(!fasetemp1.variable_real){
        setListaTreesC(tArr);
      }
    }
    console.log("FASE COMIENZO",fase,faseComienzo);
    if(fase[0]){
      if(faseComienzo ==="fase1"){

        recursiveBins(numFaseComienzo,fase[0].bins,fase[0].variable_real,fase[0].tipo,[],fase[0].estructura_grupo,"data",null,null,null,1);
        for (let i of Object.keys(listaTreesC)){
          let refRoot = Object.assign([],[listaTreesC[i]]);
          let hojas = listaTreesC[i].getNodesInLevel(`fase${numFaseComienzo-1}`,listaTreesC[i].getRoot());
          for(let hoja of hojas){
            recursiveBins(numFaseComienzo,fase[0].bins,fase[0].variable_real,fase[0].tipo,[],fase[0].estructura_grupo,hoja.datasource,hoja,i,refRoot[0],2);
          }
        }  

      }
      else{
        for (let i of Object.keys(listaTrees)){
          let refRoot = Object.assign([],[listaTrees[i]]);
          let hojas = listaTrees[i].getNodesInLevel(`fase${numFaseComienzo-1}`,listaTrees[i].getRoot());
          for(let hoja of hojas){
            recursiveBins(numFaseComienzo,fase[0].bins,fase[0].variable_real,fase[0].tipo,hoja.grupo,fase[0].estructura_grupo,hoja.datasource,hoja,i,refRoot[0],1);
          }
        }
        console.log("for re",listaTreesC);
        for (let i of Object.keys(listaTreesC)){
          let refRoot = Object.assign([],[listaTreesC[i]]);
          let hojas = listaTreesC[i].getNodesInLevel(`fase${numFaseComienzo-1}`,listaTreesC[i].getRoot());
          for(let hoja of hojas){
            recursiveBins(numFaseComienzo,fase[0].bins,fase[0].variable_real,fase[0].tipo,hoja.grupo,fase[0].estructura_grupo,hoja.datasource,hoja,i,refRoot[0],2);
          }
        }
      }
    }
  }

/**
  function buildArbol(faseComienzo) {
    if(faseComienzo==="fase0"){
        let tArr = [];
        let gr = JSON.parse(JSON.stringify(fase0.grupos));
        console.log(`EDITANDO ListaTreesC fase0 1step`,gr);
        for (let gr_item2 of gr){
          let gr_item= Object.assign({},gr_item2);
          let r = convertToTree(gr_item,"fase0",null,null, gr_item.nombre,"tipo0",gr_item.nombre);
          tArr.push(new TreeClass(r));
        }
        console.log(`ASÍ QUEDÓ ListaTreesC fase0 2step`,tArr);
        setListaTreesC(tArr);
    }
      let numFaseComienzo = parseInt(faseComienzo.slice(-1));
      for (let item of fases){
        let var_act = props.data_real.filter((d)=>(d.nombre_real === item.variable_real));
        let numFaseActual = parseInt(item.fase.slice(-1));
        if(item.variable_real && item.tipo && numFaseActual>=numFaseComienzo){
          if (item.fase === "fase1"){
            if(fase0.grupos.length !== 0){
              console.log(`CREE QUE HAY ITEMS EN FASE0`,numFaseActual,item,var_act,["tipo0"],["b"]);
              loadOtherFases(numFaseActual,item,var_act,["tipo0"],["b"]);
            }
            getBins(item.bins,item.variable_real,item.tipo,convertConditionsToRequest([],item.estructura_grupo),"data").then((res) => {
              if(res){
                let tArr2 = [];
                res = res.filter((d)=>(d.igual!=="no hay dato"));//O no está en significados
                for (let response of res){
                  let traduccion = null;
                  if(item.tipo === 2 && var_act[0]){
                    let lista_respuestas = var_act[0].significados.filter((f)=>(parseInt(f.valor_db) === parseInt(response.igual)));
                    if(lista_respuestas[0])traduccion=lista_respuestas[0].valor_traducido;
                  }
                  let r = JSON.parse(JSON.stringify(convertToTree(response,item.fase,null,null,traduccion,"tipo1","data")));
                  tArr2.push(new TreeClass(r));
                }
                setListaTrees(tArr2);
              }
            })
          }
          else{
            loadOtherFases(numFaseActual,item,var_act,["tipo0","tipo1"],["a","b"]);
          }
        }
      }
  };
*/

  const addFase = () => {
    let newFase = "fase"+ (fases.length+1).toString();
    setFases([...fases,{fase:newFase, variable_real: null, significados:[], tipo: null, min: 0, max: 10000,variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]}]);
  };

  return (
  <div>
    <div className="fases fixed-fases">  
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
                  {geteventosTemporales(fase.fase)}
                  <button className="settingsFase" onClick={() => {handleShowFaseSettingsModal(fase)}}><FcSettings/></button>
                </div>
            </div>
          );
        })
      }
      <button typr="button" className="buttonAddPhase" onClick= {() => addFase()}>+</button>
    </div>
    <div ref={canvasCluster}></div>
    <div ref={canvas}></div>
    <CreateGroupTree show={show.show} setShow={setShow} data={show.data} significados={show.significados} datasource={show.datasource} estadisticas={show.estadisticas}/>
    <FaseSettingsModal show={showFaseSettings.show} setShow={setShowFaseSettings} fase={showFaseSettings.fase} setFases={setFases} fases={fases} buildArbol={buildArbol}/>
  </div>
  );
}

export default Tree;