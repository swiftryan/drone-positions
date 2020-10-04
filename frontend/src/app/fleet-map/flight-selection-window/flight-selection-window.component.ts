import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() selectedDroneChange = new EventEmitter();
  selectedDrone = 'All';

  constructor() { }
  ngOnInit() {
  }

  switchDroneSelection(drone: string): void {
    console.log(drone);
    this.selectedDrone = drone;
    this.selectedDroneChange.emit(drone);
  }

  filteredFlights() {
    if(this.selectedDrone == 'All') {
      return this.flights;
    } else {
      return this.flights.filter(flight => flight.droneName == this.selectedDrone);
    }
  }

  getDroneNames() {
    return this.flights.map(flight => flight.droneName);
  }
}
