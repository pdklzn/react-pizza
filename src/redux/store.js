import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzasSlice";

export const store = configureStore({
    reducer:{
        filterSlice,
        cart,
        pizza
    }
})

