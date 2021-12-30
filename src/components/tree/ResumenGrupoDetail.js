import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const ResumenGrupoDetail = () => {

    const data = [{etapa:"nacimiento", value: 7.5, grafica: "peso"},
                    {etapa:"mes 3", value: 8.5, grafica: "peso"},
                    {etapa:"mes 6", value: 9.5, grafica: "peso"},
                    {etapa:"mes 9", value: 10.5, grafica: "peso"},
                    {etapa:"mes 12", value: 34.5, grafica: "peso"},
                    {etapa:"nacimiento", value: 27.5, grafica: "talla"},
                    {etapa:"mes 3", value: 38.5, grafica: "talla"},
                    {etapa:"mes 6", value: 29.5, grafica: "talla"},
                    {etapa:"mes 9", value: 18.5, grafica: "talla"},
                    {etapa:"mes 12", value: 24.5, grafica: "talla"},
                    {etapa:"nacimiento", value: 27.5, grafica: "perímetro cefálico"},
                    {etapa:"mes 3", value: 38.5, grafica: "perímetro cefálico"},
                    {etapa:"mes 6", value: 29.5, grafica: "perímetro cefálico"},
                    {etapa:"mes 9", value: 18.5, grafica: "perímetro cefálico"},
                    {etapa:"mes 12", value: 24.5, grafica: "perímetro cefálico"}
                ]
    /**
                function somatico_resultado(width,height,dataToUse, pCat, pMedida,launchE){
  
                    let chosenCat = pCat;
                    let chosenMedida = pMedida;
                    let d3graph = null;
                    let colorCategoriesGlobal = null;
                  
                    const total = dataToUse.length;
                  
                    function loadPesocat(){
                      const traduccion_pesocat = diccionario_significados.filter((d)=>(d.key === "pesocat"))[0].values;
                      const categorias_pesocat = Object.values(traduccion_pesocat);
                      const data_inicial = groupBy(dataToUse,"pesocat","pesocat","pesocat");
                      let datos_validos = data_inicial.filter((d) => (traduccion_pesocat[d.key]));
                      const categorias = Object.keys(traduccion_pesocat).map(x => parseInt(x));
                      const colorFunction = colores(categorias);
                      const colorCategories = drawCategoriesColor(categorias, colorFunction, traduccion_pesocat);
                    
                      return [datos_validos,categorias,colorFunction, colorCategories];
                    }
                  
                    function loadGestacat(){
                      const traduccion_gestacat = diccionario_significados.filter((d)=>(d.key === "gestacat"))[0].values;
                      const categorias_gestacat = Object.values(traduccion_gestacat);
                      const data_inicial = groupBy(dataToUse,"gestacat","gestacat","gestacat");
                      let datos_validos = data_inicial.filter((d) => (traduccion_gestacat[d.key]));
                      const categorias = Object.keys(traduccion_gestacat).map(x => parseInt(x));
                      const colorFunction = colores(categorias);
                      const colorCategories = drawCategoriesColor(categorias, colorFunction, traduccion_gestacat);
                      return [datos_validos,categorias,colorFunction, colorCategories];
                    }
                  
                    function loadPeso(datos_validos){
                      const dicc_peso = diccionarios.filter((d)=>(d.key === "peso"))[0]["dicc"];
                      const etapas_peso = Object.keys(dicc_peso);
                      for(let i=0; i < datos_validos.length; i++){
                        let grupo = datos_validos[i];
                        let elementos = grupo.values;
                        datos_validos[i]= {...grupo, etapas: seperarDatosPorEtapa(elementos, dicc_peso, 1)};
                      }
                      return [datos_validos, etapas_peso];
                    }
                  
                    function loadPC(datos_validos){
                      const dicc_pc = diccionarios.filter((d)=>(d.key === "perímetro cefálico"))[0]["dicc"];
                      const etapas_pc = Object.keys(dicc_pc);
                      for(let i=0; i < datos_validos.length; i++){
                        let grupo = datos_validos[i];
                        let elementos = grupo.values;
                        datos_validos[i]= {...grupo, etapas: seperarDatosPorEtapa(elementos, dicc_pc, 1)};
                      }
                      return [datos_validos, etapas_pc];
                    }
                  
                    function loadTalla(datos_validos){
                      const dicc_talla = diccionarios.filter((d)=>(d.key === "talla"))[0]["dicc"];
                      const etapas_talla = Object.keys(dicc_talla);
                      for(let i=0; i < datos_validos.length; i++){
                        let grupo = datos_validos[i];
                        let elementos = grupo.values;
                        datos_validos[i]= {...grupo, etapas: seperarDatosPorEtapa(elementos, dicc_talla, 1)};
                      }
                      return [datos_validos,etapas_talla];
                    }
                  
                    function showLines(dataInput,chosen, rangeY ,rangeX,categorias,setColor){
                        var ss=  XYScaleNumeric(height, width,rangeX, rangeY, true, false);
                        var svg1sub = ss[0];
                        var xS1sub = ss[1];
                        var yS1sub = ss[2];
                        for (let linea of dataInput){
                          linea.etapas = linea.etapas.filter((d)=>(d.key!==undefined && d.key!==null));
                          addLine(svg1sub, xS1sub, yS1sub, (d) => {return d.key}, (e)=>{return e.value ? e.value.avg:0}, linea.etapas, {
                            standarddev: (e)=>{return 0},
                            color: "#123123",
                            setColor: (d) => {return setColor(linea.key)},
                            clickFunction: (d,i) =>{addValue(linea)},
                            id : `${chosen}${linea.key}`,
                            css_class : "pointer",
                          });
                        }
                      return svg1sub;
                    }
                  
                    if(chosenCat === "pesocat"){
                      let loaddata= loadPesocat();
                      let datos_i = loaddata[0];
                      let categorias =  loaddata[1];
                      let setColor =  loaddata[2];
                      colorCategoriesGlobal = loaddata[3];
                      
                      if(chosenMedida === "peso"){
                        let result = loadPeso(datos_i);
                        let dataOutput = result[0];
                        let etapas = result[1];
                        d3graph = showLines(dataOutput, chosenCat, [0,10000],etapas,categorias,setColor);
                      }
                      else if(chosenMedida === "talla"){
                        let result = loadTalla(datos_i);
                        let dataOutput = result[0];
                        let etapas = result[1];
                        d3graph = showLines(dataOutput, chosenCat, [25,90],etapas,categorias,setColor);
                      }
                      else if(chosenMedida === "perímetro cefálico"){
                        let result = loadPC(datos_i);
                        let dataOutput = result[0];
                        let etapas = result[1];
                        d3graph = showLines(dataOutput, chosenCat, [20,60],etapas,categorias,setColor);
                      }
                    }
                    else if(chosenCat === "gestacat"){
                      let loaddata= loadGestacat();
                      let datos_i = loaddata[0];
                      let categorias =  loaddata[1];
                      let setColor =  loaddata[2];
                      colorCategoriesGlobal = loaddata[3];
                      
                      if(chosenMedida === "peso"){
                        let result = loadPeso(datos_i);
                        let dataOutput = result[0];
                        let etapas = result[1];
                        d3graph = showLines(dataOutput, chosenCat, [0,10000],etapas,categorias,setColor);
                      }
                      else if(chosenMedida === "talla"){
                        let result = loadTalla(datos_i);
                        let dataOutput = result[0];
                        let etapas = result[1];
                        d3graph = showLines(dataOutput, chosenCat, [25,90],etapas,categorias,setColor);
                      }
                      else if(chosenMedida === "perímetro cefálico"){
                        let result = loadPC(datos_i);
                        let dataOutput = result[0];
                        let etapas = result[1];
                        d3graph = showLines(dataOutput, chosenCat, [20,60],etapas,categorias,setColor);
                      }
                    }
                    
                    const rta = html`
                    <head>
                        <meta charset="utf-8">
                        <style>
                            .pointer {
                                cursor: pointer;
                            }
                      </style>
                    </head>
                    <div>${colorCategoriesGlobal}</div>
                    <div>${d3graph.node()}
                    </div>`;
                    
                    function addValue(d){
                      launchE(d, "somatico_resultados", dataToUse);
                    }
                    return rta;
    } */

    function XYScaleNumeric(height, width, domainX, domainY, xIsCat, yIsCat, {
        svgOriginal,
        tickLabels = null
       } = {}){
      
          const margin = ({top: 20, right: 0, bottom: 30, left: 40});
          const svg = svgOriginal? svgOriginal.append("svg").attr("width", width).attr("height", height): d3.create("svg")
              .attr("width", width)
              .attr("height", height);
      
          var x = null;
          var y = null;
          
          xIsCat ? x = d3.scaleBand() : x = d3.scaleLinear();
          yIsCat ? y = d3.scaleBand() : y = d3.scaleLinear();
          
          x.domain(domainX)
            .range([margin.left, width - margin.right]);
        
          y.domain(domainY)
            .range([height - margin.bottom, margin.top]);
        
           svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                  .attr("x2", width - margin.left - margin.right)
                  .attr("stroke-opacity", 0.1));
        
        let xAxisGen = d3.axisBottom(x);
        if(tickLabels) xAxisGen.tickFormat((d,i) => tickLabels[i]);
        
        let xAxis = svg.append("g")
          .attr("class", "band-group")
            .attr("transform", `translate(0,${height -margin.bottom})`)
            .call(xAxisGen);
        
          
        return [svg, x, y]; 
    }

    function addLine(svg, xScale, yScale, xKey, yKey, data, {
        standarddev,
        setColor = (d) => {return "pink"},
        clickFunction = (d,i)=>{},
        id,
        css_class = "",
        includetooltip} = {}){
        
          var line = d3.line()
              .x(function(d) { return xScale(xKey(d)); }) 
              .y(function(d) { return yScale(yKey(d)); }) 
              .curve(d3.curveMonotoneX);
      
        if(standarddev){
            svg.append("path")
            .datum(data)
            .attr("fill", (d)=>setColor(d))
            .attr("stroke", "none")
            .style("opacity",0.5)
            .attr("d", d3.area()
              .x(function(d) { return xScale(xKey(d)) })
              .y0(function(d) { return yScale(yKey(d))+standarddev(d) })
              .y1(function(d) { return yScale(yKey(d))-standarddev(d) })
              );
        }
      
          var path = svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", (d) => setColor(d))
            .attr("id",id)
            .attr("class", css_class)
            .style("stroke-width", 3);
      
          if(clickFunction) path.on("click",(d,i) => clickFunction(d,i));
      
          return svg;
        
    }

    function drawCategoriesColor(listCategories, colorFunction, traduccionDict){
        return (
            <div className="colorr">
                {listCategories.map((x, i) => {
                    return (
                    <div className="colorr-item" title={traduccionDict[parseInt(x)]}>
                        <div className="colorr-swatch" style={() => { return "background:"+colorFunction(parseInt(x))}}></div>
                        <p>traduccionDict[parseInt(x)]</p>
                    </div>
                    );
                }
                )}
            </div>
        );
    }
      
    return (
        <div></div>
    );
};
export default ResumenGrupoDetail;