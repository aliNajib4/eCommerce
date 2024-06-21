import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, cleanUp } from "@store/orders/ordersSlice";
import { useEffect, useState } from "react";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, orderList } = useAppSelector((state) => state.orders);

  const [openDialog, setOpenDialog] = useState(false);
  const [numberOrderSelected, setNumberOrderSelected] = useState<number | null>(
    null,
  );

  const handlerCloseDialog = () => {
    setOpenDialog(false);
    setNumberOrderSelected(null);
  };

  const handlerOpenDialog = (idx: number) => {
    setNumberOrderSelected(idx);
    setOpenDialog(true);
  };

  const getQuantity = (items) =>
    items.reduce((total, { quantity }) => total + quantity, 0);

  const itemsOrderSelected =
    numberOrderSelected === null ? [] : orderList[numberOrderSelected].items;

  useEffect(() => {
    const promise = dispatch(actGetOrders());

    return () => {
      promise.abort();
      dispatch(cleanUp());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    orderList,
    getQuantity,
    openDialog,
    handlerCloseDialog,
    handlerOpenDialog,
    itemsOrderSelected,
  };
};

export default useOrders;
