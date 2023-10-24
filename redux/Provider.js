"use client";
import React, { Children } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}



/*!SECTION
  imageInput: "",
    name: "",
    description: "",
    productImage: "",
    price: "",
    discount: "",
    initialSize: "",
    initialColor: "",
    productId: "",
    salesPrice: "",
    categoryId: "",

*/