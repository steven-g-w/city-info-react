import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import './Map.css';

class Map extends Component {
  
  constructor(props) {
    super(props)
    this.props = props;
    this.state = {
      popup: null
    }
  }

  onClick(facility) {
    this.setState(state => ({ popup: facility }));
  }

  onPopupClose() {
    this.setState(state => ({ popup: null }));
  }

  render() {
    const Map = ReactMapboxGl({ accessToken: "" });
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
    return (
      <Map
        style={style}
        center={[153.023208, -27.466485]}
        zoom={[15]}
        containerStyle={{
          height: "600px",
          width: "100vw"
        }}>
        <Layer
          type="circle"
          id="circle"
          paint={{ "circle-radius": 10, "circle-color": "red" }}>
          {this.props.state.facilities.map(facility =>
            <Feature
              coordinates={[facility.longitude, facility.latitude]}
              onClick={() => this.onClick(facility)} />
          )}
        </Layer>
        {this.state.popup
          ? <Popup
            coordinates={[this.state.popup.longitude, this.state.popup.latitude]}
          >
            <div id="facility-detail-popup">
              <span className="close-popup" onClick={() => this.onPopupClose()}>
                x
                </span>
              <h6>{this.state.popup.name}</h6>
              <small>{this.state.popup.description}</small>
              <p>
                <i className={`fas fa-utensils fa-2x ${this.state.popup.amenities.microwave ? ' active' : ''}`}></i>
                <i className={`fas fa-baby fa-2x ${this.state.popup.amenities.changeTable ? ' active' : ''}`}></i>
                <i className={`fas fa-trash-alt fa-2x ${this.state.popup.amenities.rubbishBin ? ' active' : ''}`}></i>
                <i className={`fas fa-toilet fa-2x ${this.state.popup.amenities.toilet ? ' active' : ''}`}></i>
                <i className={`fas fa-shower fa-2x ${this.state.popup.amenities.shower ? ' active' : ''}`}></i>
                <i className={`fas fa-tv fa-2x ${this.state.popup.amenities.television ? ' active' : ''}`}></i>
              </p>
              <p>
                <i className={`fas fa-headphones fa-2x ${this.state.popup.amenities.musicPlayer ? ' active' : ''}`}></i>
                <i className={`fas fa-baby-carriage fa-2x ${this.state.popup.amenities.highChair ? ' active' : ''}`}></i>
                <i className={`fas fa-chair fa-2x ${this.state.popup.amenities.sittingChair ? ' active' : ''}`}></i>
              </p>

            </div>

          </Popup>
          : null}
      </Map>
    );
  }
}



export default Map;
