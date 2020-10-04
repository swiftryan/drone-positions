import {Component, OnInit} from '@angular/core';
import {FlightService} from "../services/flight.service";
import {Flight} from "../models/models";

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.scss']
})
export class FleetMapComponent implements OnInit{

  flights: Flight[];
  selectedDrone: 'All'

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getFlights()
      .subscribe(
        (res: Flight[]) => {
          this.flights = res;
        },
        error => {
          console.log(error);
        }
      )
  }

  selectedDroneChange(drone): void {
    this.selectedDrone = drone;
  }

}
