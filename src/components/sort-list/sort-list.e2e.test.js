import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Sorts} from '../../constants.js';
import {Mock} from '../../mocks/test-mock.js';
import SortList from './sort-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

it(`Active sort should be changed to clicked sort`, () => {
  const store = mockStore({
    offers: Mock.offers,
    city: Mock.cities[0],
    cities: Mock.cities,
    userEmail: Mock.userEmail,
    sorts: Sorts,
    activeSort: Sorts.POPULAR,
    activeOfferId: null
  });

  const sortListWithProvider = mount(
      <Provider store={store}>
        <SortList />
      </Provider>
  );
  const sortLink = sortListWithProvider.find(`.places__option`).last();
  const sortList = sortListWithProvider.find(`SortList`);

  sortLink.simulate(`click`);

  expect(sortList.props().activeSort).toEqual(Sorts[sortLink.key()]);
});
