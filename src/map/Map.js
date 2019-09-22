import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import './Map.css';

function Map() {
  const baseMapSouce = 'base-map-source';
  const style = {
    sources: {
      [baseMapSouce]: {
        attribution: 'Wikimedia maps',
        minzoom: 0,
        maxzoom: 19,
        type: 'raster',
        tiles: ['https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png']
      }
    },
    version: 8,
    glyphs: `https://integration.gruntimaps.com/fonts/{fontstack}/{range}`,
    layers: [
      {
        id: 'base-map',
        source: baseMapSouce,
        type: 'raster'
      }
    ]
  };
  console.log(style)
  const Map = ReactMapboxGl({accessToken: ""});

  return (
    <Map
      style={style}
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
    </Map>
  );
}

export default Map;
