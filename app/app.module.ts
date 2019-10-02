import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { D3Component } from './shared/d3/d3.component';
import { BarchartSimpleComponent } from './shared/d3/barchart-simple/barchart-simple.component';
import { PiechartComponent } from './shared/d3/piechart/piechart.component';
import { AxesComponent } from './shared/d3/axes/axes.component';
import { AxesDatetime } from './shared/d3/axes-datetime/axes-datetime.component';
import { BarchartSimpleWAxes } from './shared/d3/barchart-simplewaxes/barchart-simplewaxes.component';
import { Vbarchart2Filter1 } from './shared/d3/vbarchart2-filter1/vbarchart2-filter1.component';
import { AxesFDComponent } from './shared/d3/axes-fd/axes-fd.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: 
  [ 
    AppComponent, 
    D3Component, 
    BarchartSimpleComponent, 
    AxesComponent, 
    BarchartSimpleWAxes,
    AxesDatetime,
    Vbarchart2Filter1,
    PiechartComponent,
    AxesFDComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
