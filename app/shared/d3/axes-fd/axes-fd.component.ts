import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

export enum GrowthEnum {
  Up = "Up.png",
  Equals = "Equals.png",
  Down = "Down.png"
}

export class ObjectResult {
  id: number;
  date: any;
  value: any;
  growth: GrowthEnum

  constructor(id:number, date:Date,value:any,growth: GrowthEnum){
    this.id = id;
    this.date = date;
    this.value = value;
    this.growth = growth;
  }

}

@Component({
  selector: 'app-axes-fd',
  templateUrl: './axes-fd.component.html',
  styleUrls: ['./axes-fd.component.css']
})



export class AxesFDComponent implements OnInit {
@ViewChild('axeschart') private chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
    this.simpleAxes();
  }

  getArray() : Array<ObjectResult>
  {

    const result : Array<ObjectResult> = [
      new ObjectResult(1,new Date(2017,6,2),"0",GrowthEnum.Equals),
      new ObjectResult(2,new Date(2017,10,2),"8",GrowthEnum.Up),
      new ObjectResult(3,new Date(2018,6,2),"3",GrowthEnum.Down),
      new ObjectResult(4,new Date(2018,10,10),"2",GrowthEnum.Down),
      new ObjectResult(5,new Date(2018,12,10),"4",GrowthEnum.Up),
      new ObjectResult(6,new Date(2019,1,7),"4",GrowthEnum.Equals),
      new ObjectResult(7,new Date(2019,2,20),"6",GrowthEnum.Up),
      new ObjectResult(8,new Date(2019,3,1),"2",GrowthEnum.Down),
      new ObjectResult(9,new Date(2020,3,1),"2",GrowthEnum.Equals),
      new ObjectResult(10,new Date(2020,5,1),"0",GrowthEnum.Down)
    ];

    return result;
  }

  simpleAxes() {

    let margin = {top: 20, right: 20, bottom: 40, left: 60},
        width = 1000,
        height = 400 - margin.top - margin.bottom;

    let element = this.chartContainer.nativeElement;
    
    const arrayValues : Array<ObjectResult> = this.getArray();

    // Step 1: create an svg element
    let svg : any = d3.select(element)
      .append("svg")
      .attr("width", 1200)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("class","point-container")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    // Step 2: define the x and y scales
    let x = d3.scaleTime()
      .domain([arrayValues[0].date, arrayValues[arrayValues.length - 1].date])
      .range([0, width])   


    let y = d3.scaleLinear()
        .domain([10,0])
        .range([0, 250]);


    let xAxis = d3.axisBottom(x)
                  .tickFormat(d3.timeFormat("%Y"));

    let yAxis = d3.axisLeft(y);

    // Step 3: append xaxis and yaxis on the chart
    svg
      .append("g")
      .attr("transform", "translate(0,250)")      // This controls the vertical position of the Axis
      .call(xAxis.ticks(d3.timeYear.every(1)));

    svg
      .append("g")
      .call(yAxis);


    // Step 4: Add line-chart
    svg.append("path")
      .datum(arrayValues)
      .attr("fill", "none")
      .attr("stroke", "darkblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
      )

    // Step 5: Add minvalue line
    svg
      .append("rect")
      .attr("y",y("4"))
      .attr("height","1px")
      .attr("width",width)
      .style("opacity",0.5)
      .style("fill", "blue")

    
    // Step 6: Add image toolTips    
    let g = d3.select(element).selectAll('.point-container');

    let image = g.selectAll('.image')
    .data(arrayValues)
    .enter()
      .append("pattern")
      .attr("id", function(d) {return d.id})
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("svg:image")
        .attr("x", "0")
        .attr("y", "0")
        .attr("height", "70px")
        .attr("width", "70px")
        .attr("xlink:href", function(d) 
        { 
          switch(d.growth){
            case GrowthEnum.Up:
              return GrowthEnum.Up
            break;
            case GrowthEnum.Equals:
              return GrowthEnum.Equals
            break;
            case GrowthEnum.Down:
              return GrowthEnum.Down
            break;
          }
        })

    
    let point = g.selectAll(".point")
      .data(arrayValues)
      .enter()
        .append("circle")
        .attr("class", "point")
        .attr("r", 30)
        .attr("cx", function(d) {
          return x(d.date); 
        })
        .attr("cy", function(d) { 
          return y(d.value); 
        })
        .attr("x", 10)
        .attr("y", -22)
        .style("fill", function(d) {
          if (d.growth) {
            return ("url(#" + d.id + ")");
          }
        });
    
    
  }
}