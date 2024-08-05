import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 60, left: 40 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.item))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)])
      .nice()
      .range([innerHeight,1]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis);

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.item))
      .attr("y", d => yScale(d.price))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d.price))
      .attr("fill", "lightgreen");

  }, [data]);

  return (
    <div>
        <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarGraph;
