// src/MapComponent.js
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FC } from 'react';
// Necesitamos arreglar el icono de marcador predeterminado de Leaflet.

interface Props {
  lat: number;
  lng: number;
  name: string;
}
const MapComponent: FC<Props> = ({ lat, lng, name }) => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });

  const ChangeView = ({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <MapContainer center={{ lat: lat, lng: lng }} zoom={6} style={{ height: '400px', width: '400px' }} >
      <ChangeView center={{ lat: lat, lng: lng }} zoom={6} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={{ lat: lat, lng: lng }}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
