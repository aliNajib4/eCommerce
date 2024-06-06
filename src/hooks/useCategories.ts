import { actGetCategories, cleanUp } from "@store/categories/categoriesSlice";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useEffect } from "react";

const useCategories = ()=>{
    const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch]);

  return { records, loading, error };
}

export default useCategories