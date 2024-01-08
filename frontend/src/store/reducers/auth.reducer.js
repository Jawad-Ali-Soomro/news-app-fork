export const authReducer = {
  login: (state, action) => {
    state.user = action.payload;
    state.status = true;
  },
  logout: (state) => {
    state.user = {};
    state.status = false;
  },
  refresh: () => {},
};
