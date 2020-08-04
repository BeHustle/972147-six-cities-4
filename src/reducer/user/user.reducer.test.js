import {reducer, setUserEmail} from './user.reducer.js';

describe(`User reducer`, () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      userEmail: null,
    };
  });

  it(`without additional parameters should return initial state`, () => {
    expect(reducer()).toEqual(initialState);
  });

  it(`should change userEmail to a given value`, () => {
    expect(reducer(initialState, setUserEmail(`test@user.ru`)))
      .toEqual(Object.assign({}, initialState, {userEmail: `test@user.ru`}));
  });
});
