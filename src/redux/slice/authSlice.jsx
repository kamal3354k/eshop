import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
  email: null,
};

const filterName=(name)=>name?.split("@")[0]

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { displayName, uid, email } = action?.payload||initialState;
      state.id = uid;
      state.name = displayName||filterName(email);
      state.email = email;
      state.isLoggedIn = true;
    },
    REMOVE_ACTIVE_USER: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { SET_ACTIVE_USER,REMOVE_ACTIVE_USER } = authSlice.actions;

export default authSlice.reducer;
