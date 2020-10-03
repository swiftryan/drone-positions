import * as moment from 'moment';

export interface Coordinates {
  lat: number,
  lon: number
}

export interface PathSection {
  coordinates: Coordinates,
  pathOrderNum: number,
  hasArrived: boolean
}

export interface Flight {
  droneName: string,
  flightDate: moment.Moment,
  path: PathSection[],
  currentCoordinates: Coordinates
}
