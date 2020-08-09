import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AuthStatus} from '../../constants.js';
import {getAuthStatus, getUserInfo} from '../../reducer/user/user.selectors.js';
import {Link} from 'react-router-dom';
import AppRoute from '../../routes.js';

const Header = ({userInfo, authStatus}) =>
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to={AppRoute.MAIN} className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{authStatus === AuthStatus.AUTH ? userInfo.email : `Sign in`}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;

Header.propTypes = {
  userInfo: PropTypes.exact({
    img: PropTypes.string,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired
  }),
  authStatus: PropTypes.oneOf(Object.values(AuthStatus)),
};

const mapStateToProps = (state) => ({
  userInfo: getUserInfo(state),
  authStatus: getAuthStatus(state)
});

export {Header};

export default connect(mapStateToProps)(Header);
