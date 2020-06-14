import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

ReactDOM.render(
    <App
      countOffers={128}
      userEmail={`Oliver.conner@gmail.com`}
      cardPrice = {256}
      cardName = {`Beautiful & luxurious apartment at great location`}
      cardType = {`Appartment`}
    />,
    document.querySelector(`#root`)
);
