import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Sorts} from '../../constants.js';
import {reducer} from '../../reducer/reducer.js';
import SortList from './sort-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Active sort should be changed to clicked sort`, () => {
  const store = createStore(reducer);

  const sortListWithProvider = mount(
      <Provider store={store}>
        <SortList />
      </Provider>
  );
  const sortLink = sortListWithProvider.find(`.places__option`).last();
  sortLink.simulate(`click`);

  expect(store.getState().activeSort).toEqual(Sorts[sortLink.key()]);
});
