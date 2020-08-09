import React from 'react';
import {Link} from 'react-router-dom';
import {getActiveCity} from '../../reducer/app/app.selectors';
import AppRoute from '../../routes';
import Header from '../header/header.tsx';
import {connect} from 'react-redux';
import {Operation as UserOperation} from '../../reducer/user/user.reducer';
import PropTypes from 'prop-types';

class SingIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onFormSubmit({
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value
    });
  }

  render() {
    return <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={this._handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" ref={this.emailRef}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" ref={this.passwordRef}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.MAIN} className="locations__item-link">
                <span>{this.props.activeCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>;
  }
}

SingIn.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  activeCity: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired
  })
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(authInfo) {
    dispatch(UserOperation.login(authInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
