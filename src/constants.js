const NEAR_PLACES_COUNT = 3;

const MAX_REVIEWS_COUNT = 10;

const MAX_IMAGES_COUNT = 6;

const DEFAULT_AVATAR = `img/avatar.svg`;

const ICON_SIZE = [30, 30];

const ICON_PATH = `/img/pin.svg`;
const ACTIVE_ICON_PATH = `/img/pin-active.svg`;

const AppStatus = {
  LOADING: `LOADING`,
  SUCCESS_LOAD: `SUCCESS_LOAD`,
  FAIL_LOAD: `FAIL_LOAD`
};

const AuthStatus = {
  LOADING: `LOADING`,
  FAIL_LOAD: `FAIL_LOAD`,
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

const CardType = {
  MAIN: `main`,
  CARD_DETAIL: `detail`,
  FAVORITE: `favorite`
};

const ReviewLength = {
  MIN: 50,
  MAX: 300
};

const CommentStatus = {
  SUCCESS: `SUCCESS`,
  FAIL: `FAIL`,
  NOT_SEND: `NOT_SEND`
};

const CommentMessage = {
  SUCCESS: `Your comment has been successfully added. Wait moderation`,
  ERROR: `Error while adding a comment. Check your comment and try again`
};

export {
  NEAR_PLACES_COUNT,
  MAX_REVIEWS_COUNT,
  MAX_IMAGES_COUNT,
  ICON_SIZE,
  ICON_PATH,
  ACTIVE_ICON_PATH,
  DEFAULT_AVATAR,
  Sorts,
  CardType,
  AppStatus,
  AuthStatus,
  ErrorCode,
  ReviewLength,
  CommentStatus,
  CommentMessage
};
