import PropTypes from 'prop-types';
import React from 'react';
import L from 'leaflet';
import {MAP_ZOOM, ICON_SIZE, ICON_PATH, CARD_TYPES} from '../../constants.js';

export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {offers, city} = this.props;
    const icon = L.icon({
      iconUrl: ICON_PATH,
      iconSize: ICON_SIZE,
    });

    const map = L.map(`map`, {
      center: city,
      zoom: MAP_ZOOM,
      zoomControl: false,
      marker: true,
    });

    map.setView(city, MAP_ZOOM);

    L
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      })
      .addTo(map);

    for (const offer of offers) {
      L
        .marker(offer.coordinates, {icon})
        .addTo(map);
    }
  }

  render() {
    return <section id="map" className="cities__map map" />;
  }
}

Map.propTypes = {
  city: PropTypes.arrayOf(PropTypes.number),
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CARD_TYPES).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  })).isRequired,
};
