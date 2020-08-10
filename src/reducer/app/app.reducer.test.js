import {AppStatus, Sorts} from '../../constants';
import {setActiveSort, setActiveCity, setAppStatus, reducer} from './app.reducer';

describe(`App reducer`, () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      activeSort: Sorts.POPULAR,
      activeCity: null,
      appStatus: AppStatus.LOADING,
    };
  });

  it(`without additional parameters should return initial state`, () => {
    expect(reducer()).toEqual(initialState);
  });

  it(`should change activeSort to a given value`, () => {
    expect(reducer(initialState, setActiveSort(Sorts.PRICE_ASC)))
      .toEqual(Object.assign({}, initialState, {activeSort: Sorts.PRICE_ASC}));
  });

  it(`should change activeCity to a given value`, () => {
    expect(reducer(initialState, setActiveCity(`Paris`)))
      .toEqual(Object.assign({}, initialState, {activeCity: `Paris`}));
  });

  it(`should change appStatus to a given value`, () => {
    expect(reducer(initialState, setAppStatus(AppStatus.SUCCESS_LOAD)))
      .toEqual(Object.assign({}, initialState, {appStatus: AppStatus.SUCCESS_LOAD}));
  });
});
