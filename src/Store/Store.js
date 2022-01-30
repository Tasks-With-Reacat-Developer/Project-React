import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import products from "./productsSlice";
import categories from "./CategorieSlice";

const StoreReducer = configureStore({
  reducer: {
    auth,
    products,
    categories,
  },
});

export default StoreReducer;
