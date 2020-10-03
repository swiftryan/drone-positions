import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FleetMapComponent } from "./fleet-map/fleet-map.component";
import { MapComponent } from "./fleet-map/map/map.component";
import { HttpClientModule } from "@angular/common/http";
import { FlightSelectionWindowComponent } from "./fleet-map/flight-selection-window/flight-selection-window.component";

@NgModule({
  declarations: [
    AppComponent,
    FleetMapComponent,
    MapComponent,
    FlightSelectionWindowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
