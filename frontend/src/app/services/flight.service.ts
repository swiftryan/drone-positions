import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Flight} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) {}

  public getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>('http://localhost:3000/flights');
  }
}
