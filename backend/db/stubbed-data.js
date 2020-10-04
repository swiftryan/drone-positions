const moment = require('moment');
const _ = require('lodash');

class Coordinates {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
}
class PathSection {
    constructor(coordinates, pathOrderNum, hasArrived) {
        this.coordinates = coordinates;
        this.pathOrderNum = pathOrderNum;
        this.hasArrived = hasArrived;
    }
}

class Flight {
    constructor(droneName, flightDate, path, currentCoordinates) {
        this.droneName = droneName;
        this.flightDate = flightDate;
        this.path = path;
        this.currentCoordinates = currentCoordinates;
    }
}

const originalFlights = [
    new Flight('Alpha',
        moment('2013-02-08'),
        [
            new PathSection(new Coordinates(40.7, -74.0), 1, true),
            new PathSection(new Coordinates(38.9, -77.0), 2, false)
        ],
        new Coordinates(40.7, -74.0)
    ),
    new Flight('Beta',
        moment('2013-02-08'),
        [
            new PathSection(new Coordinates(37.891607, -122.082704), 1, true),
            new PathSection(new Coordinates(37.811997, -122.023033), 2, true),
            new PathSection(new Coordinates(37.885112, -121.95132), 3, false),
        ],
        new Coordinates(37.811997, -122.023033)
    )
];

let db = {
    flights : _.cloneDeep(originalFlights),
    reset() {
        this.flights = _.cloneDeep(originalFlights);
    }
};

module.exports = db;