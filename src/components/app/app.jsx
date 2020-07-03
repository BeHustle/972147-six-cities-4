import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import CardDetail from '../card-detail/card-detail.jsx';
import {offers} from '../../mocks/offers.js';
import {email} from '../../mocks/user.js';
import {Cities} from '../../constants.js';

const App = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Main
          countOffers={128}
          userEmail={email}
          onCardTitleClick={() => {}}
          offers={offers}
          city={Cities.AMSTERDAM}
        />
      </Route>
      <Route exact path="/offer">
        <CardDetail
          userEmail={email}
          offer={offers[0]}
        />
      </Route>
    </Switch>
  </BrowserRouter>;

export default App;
