import {Component, Input} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../environments/environment";
import {Flight} from "../../models/models";

@Component({
  selector: 'app-flight-selection-window',
  templateUrl: './flight-selection-window.component.html',
  styleUrls: ['./flight-selection-window.component.scss']
})
export class FlightSelectionWindowComponent {
  @Input() flights: Flight[];
  selectedDrone = 'All';

  constructor() { }
  ngOnInit() {
  }

  getDroneNames() {
    return this.flights.map(flight => flight.droneName);
  }
}
