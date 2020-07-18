import PropTypes from 'prop-types';
import React from 'react';
import L from 'leaflet';
import {connect} from 'react-redux';
import {MAP_ZOOM, ICON_SIZE, ICON_PATH, ACTIVE_ICON_PATH, CARD_TYPES} from '../../constants.js';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._map = null;
    this._activeLayer = new L.LayerGroup();
  }

  _initMap() {
    const {activeCityCoordinates} = this.props;
    this._map = L.map(`map`, {
      center: activeCityCoordinates,
      zoom: MAP_ZOOM,
      zoomControl: false,
      marker: true,
    });

    this._map.setView(activeCityCoordinates, MAP_ZOOM);

    L
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      })
      .addTo(this._map);
  }

  _renderOffers() {
    const {offers, activeCityCoordinates, activeOfferId} = this.props;
    for (const offer of offers) {
      L
        .marker(offer.coordinates, {
          icon: L.icon({
            iconUrl: offer.id === activeOfferId ? ACTIVE_ICON_PATH : ICON_PATH,
            iconSize: ICON_SIZE
          })
        })
        .addTo(this._activeLayer);
    }
    this._activeLayer.addTo(this._map);
    this._map.flyTo(activeCityCoordinates, MAP_ZOOM, {
      duration: 1
    });
  }

  _updateMap() {
    this._activeLayer.clearLayers();
    this._renderOffers();
  }

  componentDidMount() {
    this._initMap();
    this._renderOffers();
  }

  componentDidUpdate() {
    this._updateMap();
  }

  render() {
    return <section id="map" className="cities__map map" />;
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(CARD_TYPES).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    rooms: PropTypes.string.isRequired,
    guests: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.exact({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      isSuper: PropTypes.bool.isRequired
    }).isRequired,
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
    cityId: PropTypes.number.isRequired
  })).isRequired,
  activeCityCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  activeOfferId: PropTypes.number
};

const mapStateToProps = (state) => ({
  offers: state.offers.filter((offer) => offer.cityId === state.city.id),
  activeCityCoordinates: state.city.coordinates,
  activeOfferId: state.activeOfferId
});

export default connect(mapStateToProps)(Map);
