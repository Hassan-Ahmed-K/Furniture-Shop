import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    loading: false,
    error: null,
};


const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers: {
        orderRequests: (state,action) => {
            state.loading = true;
        },

        addOrder: (state, action) => {
            state.loading = false;
            state.orders.push(action.payload.order);
        },

        orderFailure: (state,action) => {
            state.loading = false;
        },
    },
});

export const { orderRequests, addOrder, orderFailure } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;