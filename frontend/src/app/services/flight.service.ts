import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../models/models";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) {}

  public getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${environment.flightsEndpoint}`);
  }
}
