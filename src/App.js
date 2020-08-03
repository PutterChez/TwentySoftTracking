import React, {useState} from "react";
import {GoogleMap, 
      withScriptjs, 
      withGoogleMap, 
      Marker, 
      InfoWindow, 
      Polyline} from "react-google-maps";
import * as locationData from "./data/locationSample.json"
import mapStyles from "./mapStyles";

function Map(){
  const [selectedLocation, setSelectedLocation] = useState(null)      //null when no location is chosen yet, else set a selectedLocation on click
  return ( 
    <GoogleMap 
      defaultZoom={10} 
      defaultCenter={{lat:  13.756331, lng:100.501762}}
      defaultOptions={{styles: mapStyles}}
    >
     {locationData.features.map(location => (                        //mapping all the marker, icons for the marker
      <Marker 
        key={location.properties.VehicleID} 
        position={{
          lat: location.geometry.coordinates[1],
          lng: location.geometry.coordinates[0]
        }}
        onClick={() =>{
          setSelectedLocation(location)
        }}
        icon={{
          url:'/parcel.png',
          scaledSize: new window.google.maps.Size(35, 35)
        }}
      />

     ))}
    

        {selectedLocation &&(                                      //info window, display on click, reset to null on close
         
          <InfoWindow 
            position={{
              lat: selectedLocation.geometry.coordinates[1],
              lng: selectedLocation.geometry.coordinates[0]
            }}
            onCloseClick= {()=>{
              setSelectedLocation(null);
            }}
          >
            <div> 
              <h2>{selectedLocation.properties.NAME}</h2>
              <p><b>The package is being delivered from the following address:</b></p>
              <p><b>{selectedLocation.properties.ADDRESS}</b></p>
              <p><b>Estimate time of arrival: {selectedLocation.properties.ESTTIME} minutes</b></p>
              <p><b>{selectedLocation.properties.PATH}</b></p>
              
            </div>
          </InfoWindow>   
          //<Polyline path= {[{lat: 100.5350, lng: 13.7469} ,{lat: 100.5488, lng: 13.7994}]} options={{strokerColor: "#FF0000"}}></Polyline>          
        )}
    </GoogleMap>
  );
}


// putting a wrapped map into this previously empty div, passing in google map url and api key (funcitonal component "map above")
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return( 
    <div style={{width:'100vw', height: '100vh'}}> 
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
      loadingElement={<div style={{height: "100%"}}/>}
      containerElement={<div style={{height: "100%"}}/>}
      mapElement={<div style={{height: "100%"}}/>}  
      />
    </div>
  );
}


//<Polyline Path= {selectedLocation.properties.PATH} options={{strokerColor: "#FF0000"}}></Polyline>