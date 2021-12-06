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

  const [listaTrees, setListaTrees] = useState([]);

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

  const [fases, setFases] = useState([
    {fase:"fase1", variable_real: null, tipo: null, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]},
    {fase:"fase2", variable_real: null, tipo: null, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]},
    {fase:"fase3", variable_real: null, tipo: null, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]},
    {fase:"fase4", variable_real: null, tipo: null, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]}
  ]);
  
  const [show, setShow] = useState({show:false,data:[]});
  const [showFaseSettings, setShowFaseSettings] = useState({show:false,fase:{}});
  const [treeData, setTreeData] = useState({temp:[],real:[]});
  const [root,setRoot]=useState([]);
  const [d3Metadata, setD3Metadata] = useState([]);
  const canvas = useRef();

  const handleShow = (selectedGroup) => setShow(s=> ({data:selectedGroup,show:true}));
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
      limiteinf: x.limiteinf ? parseInt(x.limiteinf):null,
      limitesup: x.limitesup ? parseInt(x.limitesup):null,
      igual: x.igual ? parseInt(x.igual):null,
      variable: x.variable,
      tipo: x.tipo
    };
    return rta;
  };

  const convertToTree = (x,fase,parent,conditions, meaning) => {
    let newArr = conditions ? JSON.parse(JSON.stringify(conditions)) : [];
    newArr.push(cleanRequest(x));
    x.children = [];
    x.fase = fase;
    x.grupo = newArr;
    x.oculto = false;
    x.id = (parent ? parent.id : "null")+"inf"+(x.limiteinf ? x.limiteinf.toString() : "null")+"sup"+(x.limitesup ? x.limitesup.toString() : "null")+"igual"+(x.igual ? x.igual.toString() : "null");
    x.uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    x.color = "#"+Math.floor(Math.random()*16777215).toString(16);
    x.traduccion = meaning ? meaning: x.igual;
    return x
  };

  const label = (d) => {
    let r="";
    if (d.limiteinf && d.limitesup) r=` [ ${d.limiteinf} , ${d.limitesup} ]`;
    else if (d.limiteinf) r=`${d.variable} > ${d.limiteinf}`;
    else if(d.limitesup) r=`${d.variable} < ${d.limitesup}`;
    else if(d.igual) r=`${d.traduccion}`;
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

    /**
    const margin = {top: 20, right: 20, bottom: 20, left: 50};
    const width = 1300 - margin.right - margin.left;
    const height = 2060 - margin.top - margin.bottom;
    var svg = d3.select(canvas.current).append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom);
    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var svg1 = d3.select(canvas.current).append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom);
    const g2 = svg1.append("g").attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")");
    
    setD3Metadata(s=> ([{margin:margin, width: width, height:height,g:g},{margin:margin, width: width, height:height,g:g2}]));
     */
  }, []);

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
    listaTrees[index].hideChildren(node.data);
    for(let i=0; i<listaTrees.length;i++){
        d3.selectAll(`#svg${i}`).remove();
        let h = d3.hierarchy(listaTrees[i].getRoot(), function(d){return d.children});
        graph(h,`svg${i}`,i);
    }
    
  }

  const addGroup = (d,i) => {
    handleShow(i.data.grupo);
  }

  const clickCancel = (node,index) => {
    listaTrees[index].deleteNode(node.data);
    for(let i=0; i<listaTrees.length;i++){
        d3.selectAll(`#svg${i}`).remove();
        let h = d3.hierarchy(listaTrees[i].getRoot(), function(d){return d.children});
        graph(h,`svg${i}`,i);
    }
  };


  function graph(rot,svgid,index,{
    highlight = () => false,
    marginLeft = 40
  } = {}) {

    let xScale = 0.5;
    let yScale = 0.7;//fase 2: 0.3 , fase 3:
    let depthScale = 470; //fase 3: 350, fase 3:

    let width=900;
    let dx=100;
    let dy=25;
    let treeLink = d3.linkHorizontal().x(d => (d.y*xScale)).y(d => (d.x*yScale));
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
              .attr("fill","lightgray")
              .attr("cx", 82)
              .attr("id", (d,i) => {return "b"+parseInt(d.x).toString()+parseInt(d.y).toString();})
              .on("mouseover", (event, [a]) => {nodeEnter.select("#b"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","blue");})
              .on("mouseout",  (event, [a]) => {nodeEnter.select("#b"+parseInt(a.x).toString()+parseInt(a.y).toString()).style("fill","lightgray");})
              .on("click", (d,i) => clickMinus(i,index));
              nodeEnter.append("image")
              .attr("xlink:href","https://www.svgrepo.com/show/376008/dash.svg")
              .attr("width", 10)
              .attr("height", 10)
              .attr("x",77)
              .attr("y",-5)
              .attr("color","white");
              return nodeEnter;
      })
        .attr("transform", d => `translate(${((d.y-40)*xScale)},${((d.x-12)*yScale)})`);
    
    return svg.node();
  }

  const [a , setA] = useState({});

  useEffect(()=>{
    for (let i=0; i<listaTrees.length;i++){
      d3.selectAll(`#svg${i}`).remove();
      console.log("LISTA",listaTrees[i].getRoot());
      setA(listaTrees[i].getRoot());
      let h = d3.hierarchy(listaTrees[i].getRoot(), function(d){return d.children});
      graph(h,`svg${i}`,i);
    }
  },[listaTrees]);


  const buildArbol = (faseComienzo) => {
    let numFaseComienzo = parseInt(faseComienzo.slice(-1));
    for (let item of fases){
      let var_act = props.data_real.filter((d)=>(d.nombre_real === item.variable_real));
      let numFaseActual = parseInt(item.fase.slice(-1));
      if(item.variable_real && item.tipo && numFaseActual>=numFaseComienzo){
        if (item.fase === "fase1"){
          getBins(item.bins,item.variable_real,item.tipo,convertConditionsToRequest([],item.estructura_grupo)).then((res) => {
            if(res){
              for (let response of res){
                let traduccion = null;
                if(item.tipo === 2 && var_act[0]){
                  let lista_respuestas = var_act[0].significados.filter((f)=>(parseInt(f.valor_db) === parseInt(response.igual)));
                  if(lista_respuestas[0])traduccion=lista_respuestas[0].valor_traducido;
                }
                let r = JSON.parse(JSON.stringify(convertToTree(response,item.fase,null,null,traduccion)));
                //listaTrees.push(new TreeClass(r));
                setListaTrees((s)=>[...s,new TreeClass(r)]);
              }
            }
          })
        }
        else{
          let faseAnterior = "fase"+(numFaseActual-1).toString();
          let temArr = Object.assign([],listaTrees);
          for(let arbol of temArr){
            var listaConHojas = arbol.getNodesInLevel(faseAnterior, arbol.getRoot());
            for(let hoja of listaConHojas){
              getBins(item.bins,item.variable_real,item.tipo,convertConditionsToRequest(hoja.grupo,item.estructura_grupo)).then((res) => {
                if(res){
                  let tempArr2 = [];
                  for (let response of res){
                    let traduccion = null;
                    if(item.tipo === 2 && var_act[0]){
                      let lista_respuestas = var_act[0].significados.filter((f)=>(parseInt(f.valor_db) === parseInt(response.igual)));
                      if(lista_respuestas[0])traduccion=lista_respuestas[0].valor_traducido;
                    }
                    let r = JSON.parse(JSON.stringify(convertToTree(response,item.fase,hoja,hoja.grupo,traduccion)));
                    tempArr2.push(r);
                  }
                  hoja.children = tempArr2;
                  setListaTrees((s)=>temArr);
                }
              });
            }
          }
        }
      }
    }
  };


  const addFase = () => {
    let newFase = "fase"+ (fases.length+1).toString();
    setFases([...fases,{fase:newFase, variable_real: null, tipo: null, variable: null, etapa:null, tipodivision:"default", bins:2, estructura_grupo:[]}]);
  };

  return (
  <div>
    <div className="fases fixed-fases">      
      {
        fases.map(fase => {
              return(
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
    <div ref={canvas}></div>
    <CreateGroupTree show={show.show} setShow={setShow} data={show.data}/>
    <FaseSettingsModal show={showFaseSettings.show} setShow={setShowFaseSettings} fase={showFaseSettings.fase} setFases={setFases} fases={fases} buildArbol={buildArbol}/>
  </div>
  );
}

export default Tree;