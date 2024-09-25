import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import TOrder from "@types/order";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, { rejectWithValue, getState, signal }) => {
    const {
      auth: {
        user: { id: userId },
      },
    } = getState() as RootState;
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    try {
      const data = await getDocs(q);
      return data.docs.map((el) => el.data() as TOrder);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actGetOrders;
