export const authReducer = {
  login: (state, action) => {
    console.log(action.payload);
    state.user = action.payload.user;
    state.accessToken = action.payload.accessToken;
    state.refreshToken = action.payload.refreshToken;
    state.status = true;
  },
  logout: (state) => {
    state.user = {};
    state.accessToken = "";
    state.refreshToken = "";
    state.status = false;
  },
  refresh: () => {},
};
