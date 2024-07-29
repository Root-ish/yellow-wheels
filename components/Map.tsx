'use client'

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { getCarsData } from "@/services/mywheels";
import { useState, useEffect } from 'react'

//Map's styling
const defaultMapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '15px 0px 0px 15px',
};

//Default zoom level, can be adjusted
const defaultMapZoom = 15

//Map options
const defaultMapOptions = {
  zoomControl: false,
  tilt: 0,
  gestureHandling: 'auto',
  mapTypeId: 'roadmap',
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  scaleControl: false,
  rotateControl: false,
};

interface Car {
  id: string;
  latitude: number;
  longitude: number;
}

const MapComponent = (data: Car) => {
  return (
    <div className="w-full h-[60vh]">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={{ lat: data.latitude, lng: data.longitude }}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Marker key={data.id} position={{ lat: data.latitude, lng: data.longitude }} />
      </GoogleMap>
    </div>
  )
};

export default MapComponent;