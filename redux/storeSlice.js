import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: [],
  user: {},
  toggleMode:{isDark:true}
};

const storeSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    getShop: (state, action) => {
      state.shop = action.payload;
    },
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    toggler:(state, action)=>{
       state.toggleMode.isDark = !state.toggleMode.isDark
   
    }
  },
});

export const { getShop, storeUser, toggler } = storeSlice.actions;
export default storeSlice.reducer;
