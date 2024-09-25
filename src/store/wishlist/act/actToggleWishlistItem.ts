import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

const actToggleWishlistItem = createAsyncThunk(
  "wishlist/actToggleWishlistItem",
  async (productId: string, { rejectWithValue, getState }) => {
    const {
      auth: {
        user: { id: userId },
      },
    } = getState() as RootState;
    const q = query(
      collection(db, "wishlist"),
      where("userId", "==", userId),
      where("productId", "==", productId),
    );
    try {
      const wishlistProduct = await getDocs(q);
      if (wishlistProduct.docs.length === 0) {
        await addDoc(collection(db, "wishlist"), { userId, productId });
        return { productId, type: "add" };
      } else {
        await deleteDoc(doc(db, "wishlist", wishlistProduct.docs[0].id));
        return { productId, type: "remove" };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actToggleWishlistItem;
