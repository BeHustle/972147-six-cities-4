const NEAR_PLACES_COUNT = 3;

const MAX_REVIEWS_COUNT = 10;

const DEFAULT_AVATAR = `img/avatar.svg`;

const ICON_SIZE = [30, 30];

const ICON_PATH = `/img/pin.svg`;
const ACTIVE_ICON_PATH = `/img/pin-active.svg`;

const Screen = {
  MAIN: `main`,
  OFFER: `offer`,
  LOGIN: `login`
};

const AppStatus = {
  LOADING: `LOADING`,
  SUCCESS_LOAD: `SUCCESS_LOAD`,
  FAIL_LOAD: `FAIL_LOAD`
};

const AuthStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`
};

const ErrorCode = {
  UNAUTHORIZED: 401
};

const Sorts = {
  POPULAR: `Popular`,
  PRICE_ASC: `Price: low to high`,
  PRICE_DESC: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

const CARD_TYPE = {
  MAIN: `main`,
  CARD_DETAIL: `card_detail`
};

const HouseType = [
  `apartment`,
  `room`,
  `house`,
  `hotel`
];
export {
  NEAR_PLACES_COUNT,
  MAX_REVIEWS_COUNT,
  ICON_SIZE,
  ICON_PATH,
  ACTIVE_ICON_PATH,
  DEFAULT_AVATAR,
  Screen,
  Sorts,
  CARD_TYPE,
  AppStatus,
  HouseType,
  AuthStatus,
  ErrorCode
};
