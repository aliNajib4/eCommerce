import { createAsyncThunk } from "@reduxjs/toolkit";
import { type TProduct } from "@types/.";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

type TData = TProduct;

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async ({ type }: { type: string }, { rejectWithValue, signal }) => {
    let q = query(collection(db, "products"), where("cat_prefix", "==", type));
    if (type === "all") {
      q = query(collection(db, "products"));
    }
    try {
      const docSnap = await getDocs(q);
      return docSnap.docs.map((el) => el.data() as TData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actGetProducts;
