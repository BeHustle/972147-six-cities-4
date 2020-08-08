import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {cities} from '../../test-mocks/cities.js';
import {offers} from '../../test-mocks/offers.js';
import FavoritesList from './favorites-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`onFavoriteClick should be called on favorite btn click`, () => {
  const onFavoriteClick = jest.fn();
  const preventDefault = jest.fn();
  const favoritesList = shallow(
      <FavoritesList
        onFavoriteClick={onFavoriteClick}
        cities={cities}
        offers={offers}
      />);
  const favoriteBtn = favoritesList.find(`.place-card__bookmark-button`).first();
  favoriteBtn.simulate(`click`, {preventDefault});
  expect(onFavoriteClick).toBeCalled();
});
