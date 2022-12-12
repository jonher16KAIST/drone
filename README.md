# Horus App
Term project for KAIST CS632.
Web service to show streaming from a drone which will detect buildings in KAIST. These building detections are available in a list next to the streaming and by clicking on them they redirect to services related to the selected building.

## Architecture

- Frontend: Built in React JS.
- Backend: Built in Node JS & Express.
- DB: MongoDB.

## How to run

To run the application, you must ensure to have a mongodb instance in a machine in the same network. Specify it in ```server.js```.
Then, run both frontend and backend:
```
cd frontend
npm start 
cd ../backend
npm start
```
