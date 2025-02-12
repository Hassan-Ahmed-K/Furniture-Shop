import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("CART")) || [],
  discountPercentage: 10,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartRequest: (state) => {
      state.loading = true;
    },

    addToCartSuccess: (state, action) => {
     

     if (!Array.isArray(state.cartItems)) {
       state.cartItems = [];
     }
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === action.payload.cartItem.id &&
          item.variation == action.payload.cartItem.variation
      );

      if (existingItem) {
        existingItem.quantity += action.payload.cartItem.quantity;
      } else {
        state.cartItems = [...state.cartItems, action.payload.cartItem];
      }

      localStorage.setItem("CART", JSON.stringify(state.cartItems));
      state.loading = false;
      state.error = null;
    },

    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      );
      localStorage.setItem("CART", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      console.log("action.payload = ", action.payload);

      // Remove only the item with matching id & variation
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.variation === action.payload.variation
          )
      );


      localStorage.setItem("CART", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("CART",JSON.stringify([]))

    },
  },
});

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  setQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
