import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {SortList} from './sort-list';
import {Sorts} from '../../constants';

it(`Render Sort list`, () => {
  const tree = renderer
    .create(
        <SortList
          activeSort={Sorts.POPULAR}
          onSortClick={jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
