import {
  allPriceSeletor,
  CartQuantitySeletor,
} from "@store/cart/selector/selector";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  changeQuantity,
  removeFromCart,
  cleanUp as cleanUpCart,
  actGetCartProducts,
  clearCartAfterPlaceOrder,
} from "@store/cart/cartSlice";
import {
  actPlaceOrder,
  clean as cleanOrders,
  cleanError as cleanErrorOrders,
} from "@store/orders/ordersSlice";
import { useNavigate } from "react-router-dom";

const useCart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productsFullinfo, items, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  const totalPrice = useAppSelector(allPriceSeletor);
  const totalQuantity = useAppSelector(CartQuantitySeletor);
  const { loading: loadingPlaceOrder, error: errorPlaceOrder } = useAppSelector(
    (state) => state.orders,
  );
  const user = useAppSelector((state) => state.auth.user);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(cleanErrorOrders());
  };
  const handleClickCheckout = () => {
    if (!user) navigate("/signin?massage=Please_signin");
    setOpenDialog(true);
  };
  const handleAcceptDialog = () => {
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        if (!errorPlaceOrder) {
          dispatch(clearCartAfterPlaceOrder());
          handleCloseDialog();
        }
      });
  };

  useEffect(() => {
    const promise = dispatch(actGetCartProducts());
    return () => {
      promise.abort();
      dispatch(cleanUpCart());
      dispatch(cleanOrders());
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
    handleClickCheckout,
    handleCloseDialog,
    handleAcceptDialog,
    openDialog,
    loadingPlaceOrder,
    errorPlaceOrder,
  };
};

export default useCart;
