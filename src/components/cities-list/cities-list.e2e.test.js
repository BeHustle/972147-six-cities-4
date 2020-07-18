import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Sorts} from '../../constants.js';
import {Mock} from '../../mocks/test-mock.js';
import CitiesList from './cities-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should active city to be changed`, () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    offers: Mock.offers,
    city: Mock.cities[0],
    cities: Mock.cities,
    userEmail: Mock.userEmail,
    sorts: Sorts,
    activeSort: Sorts.POPULAR,
    activeOfferId: null
  });
  const cardDetailWithProvider = mount(<Provider store={store}>
    <CitiesList/>
  </Provider>);
  const citiesList = cardDetailWithProvider.find(`CitiesList`);
  const city = cardDetailWithProvider.find(`.locations__item`).first();
  const cityLink = cardDetailWithProvider.find(`.locations__item-link`).first();
  const cityId = parseInt(city.key(), 10);

  cityLink.simulate(`click`);

  const activeCityId = citiesList.props().activeCityId;
  expect(activeCityId).toBe(cityId);
});

