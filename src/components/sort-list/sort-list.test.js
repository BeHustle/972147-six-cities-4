import React from 'react';
import renderer from 'react-test-renderer';
import {SortList} from './sort-list.jsx';
import {Sorts} from '../../constants.js';

it(`Render Sort list`, () => {
  const tree = renderer
    .create(
        <SortList
          activeSort={Sorts.POPULAR}
          onSortClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
