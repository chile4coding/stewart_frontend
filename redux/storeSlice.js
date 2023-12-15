import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: {},
  user: {},
  admin: {},
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
  messages: {},
  notification: {},
  adminOrder: {},
  adminOrderDetails: {},
  adminReviews: {},
  userCount: {},
  visiorCount: {},
  reviewsPaercent: [],
  totalRevenue: {},
  totalOrders: {},
  graphData: [],
  topSale: {},
  saleByCategory: {},
};

const storeSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    getShop: (state, action) => {
      // function shuffleArray(array) {
      //   for (let i = array.length - 1; i > 0; i--) {
      //     const j = Math.floor(Math.random() * (i + 1));
      //     [array[i], array[j]] = [array[j], array[i]];
      //   }
      //   return array;
      // }

      function shuffleArray(array) {
        const randomizedArray = [...array];

        for (let i = randomizedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedArray[i], randomizedArray[j]] = [
            randomizedArray[j],
            randomizedArray[i],
          ];
        }

        return randomizedArray;
      }
      state.shop = shuffleArray(action.payload);

      // state.shop = action.payload;
    },
    storeUser: (state, action) => {
      state.user = action.payload;
    },
    toggler: (state, action) => {
      if (state?.toggleMode?.isDark) {
        state.toggleMode.isDark = !state.toggleMode.isDark;
      } else {
        state.toggleMode = {
          isDark: true,
        };
      }

      // state.toggleMode.isDark = !state.toggleMode?.isDark;
    },

    initTggle: (state, action) => {
      state.toggleMode = {
        isDark: true,
      };
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },

    initUser: (state, action) => {
      state.userCount = action.payload;
    },
    initVisitor: (state, action) => {
      state.visiorCount = action.payload;
    },

    getCategory: (state, action) => {
      function shuffleArray(array) {
        const randomizedArray = [...array];

        for (let i = randomizedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedArray[i], randomizedArray[j]] = [
            randomizedArray[j],
            randomizedArray[i],
          ];
        }

        return randomizedArray;
      }
      state.category = shuffleArray(action.payload);
    },
    storeGetProducts: (state, action) => {
      function shuffleArray(array) {
        const randomizedArray = [...array];

        for (let i = randomizedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedArray[i], randomizedArray[j]] = [
            randomizedArray[j],
            randomizedArray[i],
          ];
        }

        return randomizedArray;
      }

      state.products = shuffleArray(action.payload);
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
    getGraphData: (state, action) => {
      state.graphData = action.payload;
    },
    getNewArrival: (state, action) => {
      function shuffleArray(array) {
        const randomizedArray = [...array];

        for (let i = randomizedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedArray[i], randomizedArray[j]] = [
            randomizedArray[j],
            randomizedArray[i],
          ];
        }

        return randomizedArray;
      }
      const productLength = action.payload.length / 2;
      const arr = action.payload.slice(0, productLength);
      state.newArrival = shuffleArray(arr);
    },
    getSimilarItems: (state, action) => {
      function shuffleArray(array) {
        const randomizedArray = [...array];

        for (let i = randomizedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedArray[i], randomizedArray[j]] = [
            randomizedArray[j],
            randomizedArray[i],
          ];
        }

        return randomizedArray;
      }
      const category = state.category.filter(
        (cat) => cat.id !== action.payload
      );
      const similarProduct = category.map((item) => item.product).flat();

      state.similarItems = shuffleArray(similarProduct);
    },

    setRevenueOrders: (state, action) => {
      const orders = action.payload;

      const revenue = orders.filter((order) => order.status === "SUCCESS");
      const total = revenue.reduce((acc, cur) => acc + Number(cur.total), 0);
      state.revenue = total;
      state.totalOrders = orders?.length;
    },
    getBestSelling: (state, action) => {
      function shuffleArray(array) {
        const randomizedArray = [...array];

        for (let i = randomizedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedArray[i], randomizedArray[j]] = [
            randomizedArray[j],
            randomizedArray[i],
          ];
        }

        return randomizedArray;
      }
      const productLength = action.payload.length / 2;
      const arr = action.payload.slice(productLength);
      state.bestSelling = shuffleArray(arr);
    },
    searchStore: (state, action) => {
      const { products, search } = action.payload;

      const storeSearch = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

      state.shop = storeSearch;
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
      state.overallTotal = state.cartTotal + state.shippingFee;
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

      const userOrders = orders?.map((order) => ({
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

      const searchOrder = orders.filter(
        (order) =>
          order.name.toLowerCase().includes(search.toLowerCase()) ||
          order.status.toLowerCase().includes(search.toLowerCase()) ||
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.name.toLowerCase().includes(search.toLowerCase())
      );

      state.orders = searchOrder;
    },
    handleGetMessages: (state, action) => {
      state.messages = action.payload;
    },
    handleGetNotification: (state, action) => {
      state.notification = action.payload;
    },
    getFavourite: (state, action) => {
      const productId = action.payload;
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          if (!product.hasOwnProperty("favorite") || !product.favorite) {
            return { ...product, favorite: true };
          }
          return { ...product, favorite: false };
        }
        return product;
      });

      state.products = updatedProducts;
    },
    setAdminOrder: (state, action) => {
      const { orders, products } = action.payload;

      state.adminOrder = orders;



      if(!products?.length > 0 ){
        return
      }

      function saleByCategory(data) {
        // Create an empty object to store the total sales for each object.
        const salesPerObject = {};

        // Loop through each object in the data and calculate their total sales.
        for (const item of data) {
          const objectName = item.name;
          const objectSales = item.qty;

          if (salesPerObject.hasOwnProperty(objectName)) {
            // If the object already exists, add its sales to the existing total.
            salesPerObject[objectName] += objectSales;
          } else {
            // If the object is new, initialize its sales to the current value.
            salesPerObject[objectName] = objectSales;
          }
        }

        // Convert the salesPerObject object to an array of key-value pairs.
        const entries = Object.entries(salesPerObject);

        // Sort the entries by sales in descending order.
        entries.sort((a, b) => b[1] - a[1]);

        // Extract and return the top three objects with highest sales.
        return entries.map(([name, sales, image]) => ({ name, sales, image }));
      }

      // Example usage

      const item = orders
        .map((order) => order.orderitem)
        .flat()
        .filter((item) => item.hasOwnProperty("name"));

      const categorySale = saleByCategory(item);

      function getImage(data) {
        return products.find((ite) => ite?.name === data.name);
      }

      const value = categorySale?.map((item) => {
        const data = getImage(item);
        return {
          ...item,
          image: data?.image,
          id: data.id,
          category: data.categoryName,
        };
      });

      state.saleByCategory = value;
    },
    setAdminOrderDetail: (state, action) => {
      const { id, orders } = action.payload;
      const singleOrder = orders.find((order) => order.id === id);
      state.adminOrderDetails = singleOrder;
    },

    setReviewPercent: (state, action) => {
      const review = action.payload;

      const fiveStar = review.filter(
        (item) => Number(item.rating) === 5
      ).length;
      const fourStar = review.filter(
        (item) => Number(item.rating) === 4
      ).length;
      const threeStar = review.filter(
        (item) => Number(item.rating) === 3
      ).length;
      const twoStar = review.filter((item) => Number(item.rating) === 2).length;
      const oneStar = review.filter((item) => Number(item.rating) === 1).length;
      const fiveStarPercent = Math.round((fiveStar / review.length) * 100);
      const fourStarPercent = Math.round((fourStar / review.length) * 100);
      const threeStarPercent = Math.round((threeStar / review.length) * 100);
      const twoStarPercent = Math.round((twoStar / review.length) * 100);
      const oneStarPercent = Math.round((oneStar / review.length) * 100);

      state.reviewsPaercent = [
        fiveStarPercent,
        fourStarPercent,
        threeStarPercent,
        twoStarPercent,
        oneStarPercent,
      ];
    },
    setAdminReviews: (state, action) => {
      state.adminReviews = action.payload;
    },

    setTopSale: (state, action) => {
      function getTopThreeSales(data) {
        // Create an empty object to store the total sales for each object.
        const salesPerObject = {};

        // Loop through each object in the data and calculate their total sales.
        for (const item of data) {
          const objectName = item.name;
          const objectSales = item.qty;

          if (salesPerObject.hasOwnProperty(objectName)) {
            // If the object already exists, add its sales to the existing total.
            salesPerObject[objectName] += objectSales;
          } else {
            // If the object is new, initialize its sales to the current value.
            salesPerObject[objectName] = objectSales;
          }
        }

        // Convert the salesPerObject object to an array of key-value pairs.
        const entries = Object.entries(salesPerObject);

        // Sort the entries by sales in descending order.
        entries.sort((a, b) => b[1] - a[1]);

        // Extract and return the top three objects with highest sales.
        return entries
          .slice(0, 3)
          .map(([name, sales, image]) => ({ name, sales, image }));
      }

      // Example usage

      const orders = action.payload;
      const item = orders
        .map((order) => order.orderitem)
        .flat()
        .filter((item) => item.hasOwnProperty("name"));

      function getImage(data) {
        return item.find((ite) => ite?.name === data.name);
      }

      const topThreeSales = getTopThreeSales(item);

      const value = topThreeSales?.map((item) => {
        const data = getImage(item);

        return { ...item, image: data?.image, id: data.id };
      });

      state.topSale = value;
    },
  },
});

/*!SECTION


*/

export const {
  getShop,
  storeUser,
  initUser,
  initVisitor,
  toggler,
  getCategory,
  storeGetProducts,
  getSingleProduct,
  getSizes,
  getColors,
  getNewArrival,
  getBestSelling,
  setAdminOrderDetail,
  initTggle,
  handleGetMessages,
  handleGetNotification,
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
  searchStore,
  setAdminOrder,
  setAdminReviews,
  setReviewPercent,
  setAdmin,
  getGraphData,
  setRevenueOrders,
  setTopSale,
} = storeSlice.actions;
export default storeSlice.reducer;
