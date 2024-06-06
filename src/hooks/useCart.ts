import {
  allPriceSeletor,
  CartQuantitySeletor,
} from "@store/cart/selector/selector";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
import {
  changeQuantity,
  removeFromCart,
  cleanUp,
  actGetCartProducts,
} from "@store/cart/cartSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { productsFullinfo, items, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  const totalPrice = useAppSelector(allPriceSeletor);
  const totalQuantity = useAppSelector(CartQuantitySeletor);

  const products = productsFullinfo.map((el) => {
    return {
      ...el,
      quantity: items.find((id) => id.id === el.id)?.quantity || 0,
    };
  });

  const handelQuantity = useCallback(
    (id: string, quantity: number) => {
      dispatch(changeQuantity({ id, quantity }));
    },
    [dispatch],
  );

  const deleteItem = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(actGetCartProducts());
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    products,
    totalPrice,
    totalQuantity,
    handelQuantity,
    deleteItem,
  };
};

export default useCart;
