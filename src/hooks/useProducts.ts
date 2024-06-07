import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProducts, cleanUp } from "@store/products/productsSlice";
import { type TProduct } from "@types/.";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const params = useParams();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const items = useAppSelector((state) => state.cart.items);
  const productsFullInfo: TProduct[] = records.map((el) => ({
    ...el,
    quantity: items.find((id) => id.id === el.id)?.quantity || 0,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetProducts(params.id ? params.id : "all"));
    return () => {
      promise.abort();
      dispatch(cleanUp());
    };
  }, [dispatch, params.id]);
  return { loading, error, productsFullInfo };
};

export default useProducts;
