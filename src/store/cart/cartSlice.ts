import { createSlice } from "@reduxjs/toolkit";

interface ICartState {
  items: { id: string; quantity: number }[];
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: string }) => {
      const idAdd = action.payload;
      if (!state.items.some((item) => item.id === idAdd))
        state.items.push({ id: idAdd, quantity: 1 });
      else
        state.items = state.items.map((item) => {
          if (item.id === idAdd) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
