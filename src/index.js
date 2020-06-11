import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

ReactDOM.render(
    <App
      countOffers={`128`}
      userEmail={`Oliver.conner@gmail.com`}
    />,
    document.querySelector(`#root`)
);
