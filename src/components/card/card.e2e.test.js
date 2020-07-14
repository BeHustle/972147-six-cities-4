import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card.jsx';
import {Mock} from '../../mocks/test-mock.js';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Title link should be clicked`, () => {
  const onTitleClick = jest.fn();
  const card = shallow(<Card
    onTitleClick={onTitleClick}
    onCardHover={() => {}}
    offer={Mock.offers[0]}
  />);
  const titleLink = card.find(`.place-card__name a`);
  titleLink.simulate(`click`);

  expect(onTitleClick).toBeCalled();
});

it(`On mouse enter onCardHover should be called with offer id`, () => {
  const onCardHover = jest.fn();
  const card = shallow(<Card
    onTitleClick={() => {}}
    onCardHover={onCardHover}
    offer={Mock.offers[0]}
  />);
  const cardElement = card.find(`.place-card`);
  cardElement.simulate(`mouseEnter`);

  expect(onCardHover).toBeCalled();
  expect(onCardHover).toBeCalledWith(Mock.offers[0].id);
});

it(`On mouse leave onCardHover should be called with offer null`, () => {
  const onCardHover = jest.fn();
  const card = shallow(<Card
    onTitleClick={() => {}}
    onCardHover={onCardHover}
    offer={Mock.offers[0]}
  />);
  const cardElement = card.find(`.place-card`);
  cardElement.simulate(`mouseLeave`);

  expect(onCardHover).toBeCalled();
  expect(onCardHover).toBeCalledWith(null);
});
