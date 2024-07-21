import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
  actGetTopSellingProducts,
  cleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
const useHome = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector((state) => state.products);

  useEffect(() => {
    const promise = dispatch(actGetTopSellingProducts());
    return () => {
      promise.abort();
      dispatch(cleanUp());
    };
  }, [dispatch]);
  return { loading, error, records };
};

export default useHome;
