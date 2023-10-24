import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: {},
  user: {},
  toggleMode:{isDark:true},
  category:{},
  products:{},
  singleProduct:{},
  productColors:{},
  singleProductColor:{},
  sizes:{}
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
    toggler: (state, action) => {
      state.toggleMode.isDark = !state.toggleMode.isDark;
    },
    getCategory: (state, action) => {
      state.toggleMode.isDark = !state.toggleMode.isDark;
    },
    storeGetProducts: (state, action) => {
      state.products = action.payload;
    },
    getSingleProduct: (state, action) => {
      const product  =  state.products.find(prod=>prod.id === action.payload)
      state.singleProduct = product
    },
    getSingleProductColor: (state, action) => {
      // const product  =  state.products.map(prod=>prod?.size.map(s=>s?.colors.find(col=>col.id=== action.payload)))
      // state.singleProduct = product

    

      const product  =  state.productColors.find(col=>col.id=== action.payload)
      state.singleProductColor  = product
    },
    getColors: (state, action) => {
      state.productColors = action.payload;
    },
    getSizes: (state, action) => {
      state.sizes =  action.payload
    },
  },
});

/*!SECTION


*/

export const {
  getShop,
  storeUser,
  toggler,
  getCategory,
  storeGetProducts,
  getSingleProduct,
  getSizes,
  getColors,
  getSingleProductColor,
} = storeSlice.actions;
export default storeSlice.reducer;
