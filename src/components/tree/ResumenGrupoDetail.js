import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const ResumenGrupoDetail = () => {

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