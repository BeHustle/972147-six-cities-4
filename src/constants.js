const CARD_TYPES = [
  `Apartment`,
  `Room`,
  `House`,
  `Hotel`
];

const DEFAULT_AVATAR = `img/avatar.svg`;

const MAP_ZOOM = 12;

const ICON_SIZE = [30, 30];

const ICON_PATH = `/img/pin.svg`;
const ACTIVE_ICON_PATH = `/img/pin-active.svg`;

const Screen = {
  MAIN: `main`,
  OFFER: `offer`
};

const Sorts = {
  POPULAR: `Popular`,
  PRICE_ASC: `Price: low to high`,
  PRICE_DESC: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export {CARD_TYPES, MAP_ZOOM, ICON_SIZE, ICON_PATH, ACTIVE_ICON_PATH, DEFAULT_AVATAR, Screen, Sorts};
