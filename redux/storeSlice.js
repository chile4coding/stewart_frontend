import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: {},
  user: {},
  toggleMode: { isDark: true },
  category: {},
  newArrival: {},
  bestSelling: {},
  products: {},
  singleProduct: {},
  productColors: {},
  singleProductColor: {},
  sizes: {},
  similarItems: {},
  cart: [],
  cartTotal: "",
  shippingFee: "",
  overallTotal: "",
  userOrderDetails: {},
  currentUserEmail: "",
  user: {},
  orders: {},
  orderDetails: {},
  globalLoading: false,
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
      state.category = action.payload;
    },
    storeGetProducts: (state, action) => {
      state.products = action.payload;
    },
    getSingleProduct: (state, action) => {
      const product = state.products.find((prod) => prod.id === action.payload);
      state.singleProduct = product;
    },
    getSingleProductColor: (state, action) => {
      const product = state.productColors.find(
        (col) => col.id === action.payload
      );
      state.singleProductColor = product;
    },
    getProductByCategory: (state, action) => {
      state.shop = state.products.filter(
        (prod) => prod.category_id === action.payload
      );
    },
    getColors: (state, action) => {
      state.productColors = action.payload;
    },
    getSizes: (state, action) => {
      state.sizes = action.payload;
    },
    getNewArrival: (state, action) => {
      const productLength = action.payload.length / 2;
      state.newArrival = action.payload.slice(0, productLength);
    },
    getSimilarItems: (state, action) => {
      const category = state.category.filter(
        (cat) => cat.id !== action.payload
      );
      const similarProduct = category.map((item) => item.product).flat();
      state.similarItems = similarProduct;
    },
    getBestSelling: (state, action) => {
      const productLength = action.payload.length / 2;
      state.bestSelling = action.payload.slice(productLength);
    },
    addToCart: (state, action) => {
      const item = action.payload;

      const itemPresentIndex = state.cart.findIndex(
        (each) => each.image === item.image
      );

      if (itemPresentIndex !== -1) {
        // Item is already in the cart, update quantity and subtotal
        const updatedCart = state.cart.map((cartItem, index) => {
          if (index === itemPresentIndex) {
            return {
              ...cartItem,
              qty: item.qty,
              subTotal: item.price * item.qty,
            };
          }
          return cartItem;
        });

        state.cart = updatedCart;
      } else {
        // Item is not in the cart, add it
        state.cart.push(item);
      }

      // Recalculate total based on the updated cart
      state.cartTotal = state.cart.reduce(
        (acc, cur) => acc + Number(cur.subTotal),
        0
      );
    },
    increaseOrDecraseItem: (state, action) => {
      const { image, value } = action.payload;

      const findItem = state.cart.find((item) => item.image === image);
      const findIndex = state.cart.findIndex((item) => item.image === image);

      const modifyItem = {
        ...findItem,
        qty: value,
        subTotal: findItem.price * Number(value),
      };

      state.cart[findIndex] = modifyItem;

      const total = state.cart.reduce(
        (acc, cur) => acc + Number(cur.subTotal),
        0
      );
      state.cartTotal = total;
    },
    deleteCartItem: (state, action) => {
      const itemLeft = state.cart.filter(
        (item) => item.image !== action.payload
      );
      state.cart = itemLeft;

      const total = state.cart.reduce(
        (acc, cur) => acc + Number(cur.subTotal),
        0
      );
      state.cartTotal = total;
    },
    calCulateShippingFee: (state, action) => {
      state.shippingFee = action.payload;
      state.overallTotal = state.cartTotal + action.payload;
    },
    setCartOnLoad: (state, action) => {
      state.cart = [];
      state.shippingFee = 0;
      state.cartTotal = 0;
      state.overallTotal = 0;
    },
    setUserOrderDetails: (state, action) => {
      state.userOrderDetails = action.payload;
    },
    setCurrentUserEmail: (state, action) => {
      state.currentUserEmail = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setGlobalLoaoding: (state, action) => {
      state.globalLoading = action.payload;
    },
    getuserOrders: (state, action) => {
      const orders = action.payload;

      const userOrders = orders.map((order) => ({
        id: order.id,
        name: `order ${order.id.slice(-6)}`,
        status: order.status,
        image: order.orderitem[0].image,
      }));

      state.orders = userOrders;
    },
    getSingleOrders: (state, action) => {
      const { id, orders } = action.payload;
      const userOrders = orders.find((order) => order.id === id);
      state.orderDetails = userOrders;
    },

    setOrderSearch: (state, action) => {
      const { orders, search } = action.payload;

      console.log(orders)
      const searchOrder = orders.filter(
        (order) =>
          order.name.toLowerCase().includes(search.toLowerCase()) ||
          order.status.toLowerCase().includes(search.toLowerCase()) ||
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.name.toLowerCase().includes(search.toLowerCase()) 
         
      );

      state.orders =  searchOrder
    },
    getFavourite:(state, action)=>{
      const productId  =  action.payload
       const updatedProducts = state.products.map((product) => {
         if (product.id === productId) {
           if (!product.hasOwnProperty("favorite") || !product.favorite) {
             return { ...product, favorite: true };
           }
           return { ...product, favorite: false };
         }
         return product;
       });
    
       state.products =  updatedProducts
    }
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
  getNewArrival,
  getBestSelling,
  getProductByCategory,
  getSingleProductColor,
  getSimilarItems,
  addToCart,
  deleteCartItem,
  increaseOrDecraseItem,
  calCulateShippingFee,
  setCartOnLoad,
  setUserOrderDetails,
  setCurrentUserEmail,
  setUser,
  setGlobalLoaoding,
  getuserOrders,
  getSingleOrders,
  setOrderSearch,
  getFavourite,
} = storeSlice.actions;
export default storeSlice.reducer;
