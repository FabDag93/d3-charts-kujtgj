import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'd3',
  templateUrl: './d3.component.html',
  styleUrls: [ './d3.component.css' ]
})
export class D3Component implements OnInit  {
  @ViewChild('chart') private chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
  }
}
