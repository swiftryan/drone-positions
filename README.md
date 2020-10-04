# Drone Positions

## Backend
Created by manually creating backend folder, running `cd backend` and `npm init`, then creating an *index.js* file. Express framework used for HTTP API.

## Frontend
Created by using the Angular CLI command `ng new frontend`. Bootstrap was installed for the CSS framework. Mapbox GL JS module was installed using `npm install mapbox-gl --save` as specified on their website at `https://www.mapbox.com/install/js/bundler-install/`. There's most likely extra packages that we do not need right now but the CLI command added them anyway.

## Project Info
For the purposes of this demo, we are assuming the backend is supplying the data formatted properly and each drone name is unique and does not equal 'All'. Also, error handling is stubbed but not complete. For example, if we can't reach the backend the UI displays a generic message and loads nothing. On a real system, we may handle it differently.

Starting and running applications require Internet access.

## Start up
Please use npm version 6.14.8 and node version 14.13.0 or similar versions. 

1. Backend
    * Open a terminal for this project
    * `cd backend`
    * `npm install`
    * `npm start`
    * Backend should now be running on port 3000. To verify, you can use Postman and run a GET request for 'http://localhost:3000/flights'

2. Frontend
    * Open a terminal for this project
    * `cd frontend`
    * `npm install`
    * `npm start`
    * Frontend should now be running on port 4200. Go to 'http://localhost:4200' in a browser to view the page.
    
3. Operation
    * You should now be viewing the page. On the left side is the Map you can manually manipulate. Current locations of drone are represented by plane icons, origin locations by blue circles, visited locations by green circles, future destinations by orange circles, and paths by grey lines. On hover for the destination coordinates, you will see a popup with information regarding the location and drone associated with the location. On the right side, you will see a list of all information we have on each drone. You may select which drone to focus on and that will fit the map around the drone's pathing locations. It will also filter the flight info below to just the drone you have selected.

