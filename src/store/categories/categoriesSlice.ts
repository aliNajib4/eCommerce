import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import type { ICategory } from "@types/category";
import type { TLoadingCategories as TLoading } from "@types/loadingCategories";

interface ICategoriesState {
  records: ICategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload;
      })
      .addCase(actGetCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      });
  },
});

export { actGetCategories };
export default categoriesSlice.reducer;
