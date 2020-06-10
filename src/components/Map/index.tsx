import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useField } from '@unform/core';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: 6,
};

let center = {
  // SP Capital
  lat: -23.5505199,
  lng: -46.6333094,
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [marker, setMarker] = useState({
    // SP Capital
    lat: -23.5505199,
    lng: -46.6333094,
  });

  const mapRef = useRef(null);
  const { fieldName, registerField } = useField('map');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null,
    );
  }, [fieldName, registerField]);

  useEffect(() => {
    setTimeout(() => {
      registerField({
        name: fieldName,
        ref: mapRef.current,
        path: 'props.position',
      });
    }, 1000);
  }, [fieldName, registerField, marker, setMarker]);

  const onMapClick = useCallback(event => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  if (loadError) return <p>Erro ao carregar o mapa</p>;
  if (!isLoaded) return <p>Carregando o mapa...</p>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        onClick={onMapClick}
      >
        <Marker ref={mapRef} position={{ lat: marker.lat, lng: marker.lng }} />
      </GoogleMap>
    </div>
  );
};

export default Map;
