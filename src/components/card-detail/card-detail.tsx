import * as React from 'react';
import {connect} from 'react-redux';
import {DEFAULT_AVATAR, CardType, NEAR_PLACES_COUNT, MAX_IMAGES_COUNT} from '../../constants';
import {getNearbyOffers, getOffers} from '../../reducer/data/data.selectors';
import CardList from '../card-list/card-list';
import {Operation as DataOperation} from '../../reducer/data/data.reducer';
import Header from '../header/header';
import NotFound from '../not-found/not-found';
import Reviews from '../reviews/reviews';
import Map from '../map/map';
import {OfferInterface} from "../../types";

const SUPER_USER_CLASS = `property__avatar-wrapper--pro`;
const IN_BOOKMARKS_CLASS = `property__bookmark-button--active`;

interface Props {
  offerId: number;
  offers: Array<OfferInterface>;
  nearbyOffers: Array<OfferInterface>;
  onFavoriteClick: (id: number, inBookmarks: number) => void;
  onCardDetailMount: (offerId: number) => void;
}

class CardDetail extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {onCardDetailMount, offerId} = this.props;
    onCardDetailMount(offerId);
  }

  render() {
    const {offers, nearbyOffers, offerId, onFavoriteClick} = this.props;
    const offer = offers.find((it) => it.id === offerId, 10);
    if (typeof offer === `undefined`) {
      return <NotFound />;
    }
    const {
      id, images, name, price, isPremium, type, inBookmarks,
      rooms, guests, facilities, author, text, rating, coordinates, zoom
    } = offer;
    return <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_IMAGES_COUNT).map((image, index) =>
                <div className="property__image-wrapper" key={`img_${id}_${index}`}>
                  <img className="property__image" src={image} alt={name}/>
                </div>,
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {name}
                </h1>
                <button
                  onClick={(evt) => {
                    evt.preventDefault();
                    onFavoriteClick(id, +!inBookmarks);
                  }}
                  className={`property__bookmark-button button ${inBookmarks && IN_BOOKMARKS_CLASS}`}
                  type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.ceil(rating) * 20}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {rooms}
                </li>
                <li className="property__feature property__feature--adults">
                  {guests}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {facilities.map((item, index) =>
                    <li key={`facility_${id}_${index}`} className="property__inside-item">{item}</li>,
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper user__avatar-wrapper ${author.isSuper && SUPER_USER_CLASS}`}>
                    <img className="property__avatar user__avatar" src={`/${author.avatar}` || DEFAULT_AVATAR} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {author.name}
                  </span>
                </div>
                <div className="property__description">
                  {text.map((item, index) =>
                    <p key={`text_${id}_${index}`} className="property__text">{item}</p>,
                  )}
                </div>
              </div>
              <Reviews offerId={id}/>
            </div>
          </div>
          <Map
            type={CardType.CARD_DETAIL}
            offers={nearbyOffers.slice(0, NEAR_PLACES_COUNT)}
            coordinates={coordinates}
            zoom={zoom}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardList offers={nearbyOffers.slice(0, NEAR_PLACES_COUNT)} type={CardType.CARD_DETAIL} onFavoriteClick={onFavoriteClick}/>
          </section>
        </div>
      </main>
    </div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCardDetailMount(offerId) {
    dispatch(DataOperation.loadNearbyOffers(offerId));
  },
});

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  nearbyOffers: getNearbyOffers(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail);
