import PropTypes from 'prop-types';
import React from 'react';
import L from 'leaflet';
import {connect} from 'react-redux';
import {
  ICON_SIZE,
  ICON_PATH,
  ACTIVE_ICON_PATH,
  CardType,
  HouseType,
} from '../../constants';
import {getActiveOfferId} from '../../reducer/app/app.selectors';

const getMapClassByType = (type) => {
  switch (type) {
    case CardType.MAIN:
      return `cities__map`;
    case CardType.CARD_DETAIL:
      return `property__map`;
    default:
      return ``;
  }
};

const getMapIdByType = (type) => `map-${type}`;

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._map = null;
    this._activeLayer = new L.LayerGroup();
  }

  _initMap() {
    const {coordinates, type, zoom} = this.props;
    this._map = L.map(getMapIdByType(type), {
      center: coordinates,
      zoom,
      zoomControl: false,
      marker: true,
    });

    this._map.setView(coordinates, zoom);

    L
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      })
      .addTo(this._map);
  }

  _renderOffers() {
    const {offers, coordinates, zoom, activeOfferId} = this.props;
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
    this._map.flyTo(coordinates, zoom, {
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
    const type = this.props.type;
    return <section id={getMapIdByType(type)} className={`map ${getMapClassByType(type)}`} />;
  }
}

Map.propTypes = {
  type: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.oneOf(HouseType).isRequired,
    isPremium: PropTypes.bool.isRequired,
    inBookmarks: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number.isRequired,
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
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
  activeOfferId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  activeOfferId: getActiveOfferId(state)
});

export default connect(mapStateToProps)(Map);
