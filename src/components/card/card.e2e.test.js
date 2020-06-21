import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card.jsx';
import {Mock} from '../../mock/test-mock.js';

Enzyme.configure({
  adapter: new Adapter(),
});

test(`Title link should be clicked`, () => {
  const handleTitlePlaceClick = jest.fn();
  const card = shallow(<Card
    handleTitleClick={handleTitlePlaceClick}
    price={Mock.cardPrice}
    name={Mock.cardName}
    type={Mock.cardType}
  />);
  const titleLink = card.find(`.place-card__name a`);
  titleLink.props().onClick();

  expect(handleTitlePlaceClick.mock.calls.length).toBe(titleLink.length);
});
