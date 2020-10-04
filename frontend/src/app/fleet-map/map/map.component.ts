import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from "../../../environments/environment";
import {Flight, PathSection} from "../../models/models";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges{

  @Input() flights: Flight[];
  @Input() selectedDrone;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.811997;
  lon = -122.023033;

  constructor() { }

  ngOnInit() {
    // Display a map
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lon, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.placeIconsOnMap();

    // Get bounds for map
    this.allFlightBounds();
  }

  ngOnChanges(changes: SimpleChanges) {
    // On the selected value changing, we fly to new bounds
    if(this.selectedDrone == 'All') {
      this.allFlightBounds();
    } else {
      if(this.map) {
        // @ts-ignore
        this.map.fitBounds(this.calculateMapBounds(this.flights.find(flight => flight.droneName == changes.selectedDrone.currentValue).path));
      }
    }
  }

  allFlightBounds() {
    // Get bounds for map
    let allPaths = [];
    this.flights.forEach(flight => {
      flight.path.forEach(section => {
        allPaths.push(section);
      })
    });
    // @ts-ignore
    this.map.fitBounds(this.calculateMapBounds(allPaths));
  }

  placeIconsOnMap() {
    // Initial placement of icons on the map

    this.map.on('load', () => {
      this.map.loadImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/400px-Airplane_silhouette.svg.png',
        (error, image) => {
          if (error) throw error;
          this.map.addImage('drone', image);
          this.flights.forEach(flight => {
            this.addCurrentDroneLocationToMap(flight.droneName, flight.currentCoordinates.lat, flight.currentCoordinates.lon);
            this.addDestinationsAndPathsToMap(flight.droneName, flight.path);
          })
        }
      );
    });
  }

  addDestinationsAndPathsToMap(droneName, path: PathSection[]) {
    // add a layer that displays the paths
    const sourcePathId = droneName + 'path';

    this.map.addSource(sourcePathId, {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': path
            .sort((a, b) => a.pathOrderNum < b.pathOrderNum ? -1 : 1)
            .map(section => [section.coordinates.lon, section.coordinates.lat])
        }
      }
    });

    this.map.addLayer({
      'id': sourcePathId + 'layer',
      'type': 'line',
      'source': sourcePathId,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });

    // add a layer that displays the origin locations
    let originFeatures = []

    path.filter(pathSection => pathSection.pathOrderNum == 1)
      .forEach(section => {
        originFeatures.push(
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [section.coordinates.lon, section.coordinates.lat]
            },
            'properties': {
              'description': `<strong>Destination #${section.pathOrderNum} (Origin)</strong><p>Drone: ${droneName}<br>LAT: ${section.coordinates.lat}<br>LON: ${section.coordinates.lon}<br>Has Visited: ${section.hasArrived}</p>`
            }
          }
        )
      })

    const originSourceId = droneName + 'origin';

    this.map.addSource(originSourceId, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': originFeatures
      }
    });

    this.map.addLayer({
      id: originSourceId + 'circles',
      type: 'circle',
      source: originSourceId,
      paint: {
        'circle-color': '#4F86C6',
        'circle-radius': 8,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#333',
      },
    });

    // add a layer that displays the visited locations
    let visitedFeatures = []

    path.filter(pathSection => pathSection.hasArrived && pathSection.pathOrderNum != 1)
      .forEach(section => {
        visitedFeatures.push(
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [section.coordinates.lon, section.coordinates.lat]
            },
            'properties': {
              'description': `<strong>Destination #${section.pathOrderNum}</strong><p>Drone: ${droneName}<br>LAT: ${section.coordinates.lat}<br>LON: ${section.coordinates.lon}<br>Has Visited: ${section.hasArrived}</p>`
            }
          }
        )
      })

    const visitedSourceId = droneName + 'visited';

    this.map.addSource(visitedSourceId, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': visitedFeatures
      }
    });

    this.map.addLayer({
      id: visitedSourceId + 'circles',
      type: 'circle',
      source: visitedSourceId,
      paint: {
        'circle-color': '#32a852',
        'circle-radius': 8,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#333',
      },
    });

    // add a layer that displays the not visited locations
    let notVisitedFeatures = []

    path.filter(pathSection => !pathSection.hasArrived)
      .forEach(section => {
        notVisitedFeatures.push(
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [section.coordinates.lon, section.coordinates.lat]
            },
            'properties': {
              'description': `<strong>Destination #${section.pathOrderNum}</strong><p>Drone: ${droneName}<br>LAT: ${section.coordinates.lat}<br>LON: ${section.coordinates.lon}<br>Has Visited: ${section.hasArrived}</p>`
            }
          }
        )
      })

    const notVisitedSourceId = droneName + 'notvisited';

    this.map.addSource(notVisitedSourceId, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': notVisitedFeatures
      }
    });

    this.map.addLayer({
      id: notVisitedSourceId + 'circles',
      type: 'circle',
      source: notVisitedSourceId,
      paint: {
        'circle-color': '#e38d32',
        'circle-radius': 8,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#333',
      },
    });

    // Add popups
    this.addHoverPopups([originSourceId + 'circles', notVisitedSourceId + 'circles', visitedSourceId + 'circles']);
  }

  addHoverPopups(layers) {
    // Add popups
    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    layers.forEach(layerId => {
      this.map.on('mouseenter', layerId, (e) => {
        this.map.getCanvas().style.cursor = 'pointer';

        // @ts-ignore
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      });

      this.map.on('mouseleave', layerId, () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });
    })

  }

  addCurrentDroneLocationToMap(droneName, lat, lon) {
    this.map.addSource(droneName, {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [lon, lat]
            },
            'properties': {}
          }
        ]
      }
    });
    this.map.addLayer({
      'id': droneName,
      'type': 'symbol',
      'source': droneName,
      'layout': {
        'icon-image': 'drone',
        'icon-size': 0.25
      }
    });
  }

  calculateMapBounds(path: PathSection[]) {
    let lats = [];
    let lons = [];

    path.forEach(section => {
      lats.push(section.coordinates.lat);
      lons.push(section.coordinates.lon);
    });

    let minLon = Math.min(...lons) - 0.5;
    if(minLon < -180.0) minLon = -180.0

    let maxLon = Math.max(...lons) + 0.5;
    if(maxLon > 180.0) maxLon = 180.0

    let minLat = Math.min(...lats) - 0.5
    if(minLat < -90.0) minLat = -90.0

    let maxLat = Math.max(...lats) + 0.5;
    if(maxLat > 90.0) maxLat = 90.0

    return [minLon, minLat, maxLon, maxLat];
  }
}
