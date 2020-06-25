import React from 'react';
import Main from '../main/main.jsx';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';

const App = () =>
  <Main
    countOffers={128}
    userEmail={email}
    onCardTitleClick={() => {}}
    offers={offers}
  />;

export default App;
