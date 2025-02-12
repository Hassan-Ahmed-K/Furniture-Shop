import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { authReducer } from "./reducers/authReducer";


const store = configureStore({
    reducer:{
        user:userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        auth: authReducer,
    },
});


export default store;