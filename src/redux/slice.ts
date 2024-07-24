import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data:null
};

const loginSlice = createSlice({
  name: 'userDeatils',
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.data=action.payload;
    },
  },
});

export const { userDetails } = loginSlice.actions;

//export const selectUserData = (state: { userState: UserState }) => state.userState.data;

export default loginSlice.reducer;
