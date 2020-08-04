const initialState = {
  userEmail: null
};

const ActionTypes = {
  SET_USER_EMAIL: `SET_USER_EMAIL`,
};

export const setUserEmail = (userEmail) => ({
  type: ActionTypes.SET_USER_EMAIL,
  payload: userEmail,
});

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_USER_EMAIL:
      return Object.assign({}, state, {userEmail: action.payload});
    default:
      return state;
  }
};
