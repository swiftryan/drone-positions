const moment = require('moment');

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
            new PathSection(new Coordinates(37.887285, -121.430604), 1, true),
            new PathSection(new Coordinates(37.887285, -121.780187), 2, true),
            new PathSection(new Coordinates(37.638558, -121.780187), 3, true),
            new PathSection(new Coordinates(37.638558, -121.430604), 4, true),
            new PathSection(new Coordinates(37.450694, -121.430604), 5, false),
            new PathSection(new Coordinates(37.450694, -121.780187), 6, false),
        ],
        new Coordinates(37.638558, -121.430604)
    ),
    new Flight('Beta',
        moment('2013-02-08'),
        [
            new PathSection(new Coordinates(37.887285, -121.213943), 1, true),
            new PathSection(new Coordinates(37.450694, -121.023033), 2, true),
            new PathSection(new Coordinates(37.887285, -120.923033), 3, true),
            new PathSection(new Coordinates(37.450694, -120.723033), 4, true),
            new PathSection(new Coordinates(37.887285, -120.523033), 5, false),
        ],
        new Coordinates(37.450694, -120.723033)
    ),
    new Flight('Charlie',
        moment('2013-02-08'),
        [
            new PathSection(new Coordinates(37.887285, -120.323033), 1, true),
            new PathSection(new Coordinates(37.450694, -120.323033), 2, true),
        ],
        new Coordinates(37.450694, -120.323033)
    ),
    new Flight('Delta',
        moment('2013-02-08'),
        [
            new PathSection(new Coordinates(37.450694, -120.023033), 1, true),
            new PathSection(new Coordinates(37.638558, -120.023033), 2, false),
            new PathSection(new Coordinates(37.638558, -119.823033), 3, false),
            new PathSection(new Coordinates(37.648558, -120.023033), 4, false),
            new PathSection(new Coordinates(37.887285, -120.123033), 5, false),
            new PathSection(new Coordinates(37.887285, -119.823033), 6, false),
        ],
        new Coordinates(37.450694, -120.023033)
    ),
    new Flight('Foxtrot',
        moment('2013-02-08'),
        [
            new PathSection(new Coordinates(37.887285, -119.623033), 1, true),
            new PathSection(new Coordinates(37.887285, -119.423033), 2, true),
            new PathSection(new Coordinates(37.877285, -119.523033), 3, false),
            new PathSection(new Coordinates(37.450694, -119.523033), 4, false),
        ],
        new Coordinates(37.887285, -119.423033)
    ),
];

let db = {
    flights : originalFlights
};

module.exports = db;