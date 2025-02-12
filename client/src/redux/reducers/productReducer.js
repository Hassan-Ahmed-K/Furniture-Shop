import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    products: null,
    loading: false,
    error: null
}


const productSlice = createSlice({
    name:"product",
    initialState,
    reducers: {
        fetchProductsRequest: (state, action) => {
            state.loading=true;
        },

        fetchProductsSuccess: (state, action) => {
            state.loading= false;
            state.products = action.payload.products;

        },

        fetchProductsFailure: (state, action) => {
            state.loading= false;
            state.error = action.payload.error;
        },

    }
})


export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
export const productReducer = productSlice.reducer;