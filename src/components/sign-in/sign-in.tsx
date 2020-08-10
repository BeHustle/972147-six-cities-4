import * as React from 'react';
import {Link} from 'react-router-dom';
import {getActiveCity} from '../../reducer/app/app.selectors';
import AppRoute from '../../routes';
import Header from '../header/header';
import {connect} from 'react-redux';
import {Operation as UserOperation} from '../../reducer/user/user.reducer';
import {CityInterface} from "../../types";

interface Props {
  activeCity: CityInterface;
  onFormSubmit: (object: {email: string; password: string}) => {};
}

class SingIn extends React.PureComponent<Props, {}> {
  private emailRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleEmailChange = this._handleEmailChange.bind(this);
  }

  _validateEmail(email) {
    const regular = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regular.test(String(email).toLowerCase());
  }

  _handleEmailChange() {
    if (this._validateEmail(this.emailRef.current.value)) {
      this.emailRef.current.setCustomValidity(``);
    } else {
      this.emailRef.current.setCustomValidity(`Not valid email address`);
    }
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
                <input className="login__input form__input" type="email" name="email" placeholder="Email" onChange={this._handleEmailChange} required ref={this.emailRef}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={this.passwordRef}/>
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

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state)
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(authInfo) {
    dispatch(UserOperation.login(authInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingIn);
