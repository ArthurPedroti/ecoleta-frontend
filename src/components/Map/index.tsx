import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  marginBotton: 30,
};

const center = {
  lat: -22.2072851,
  lng: -46.757523,
};
const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [marker, setMarker] = useState({
    lat: -22.2072851,
    lng: -46.757523,
  });

  if (loadError) return <p>Erro ao carregar o mapa</p>;
  if (!isLoaded) return <p>Carregando o mapa...</p>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        onClick={event => {
          setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });
        }}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      </GoogleMap>
    </div>
  );
};

export default Map;
