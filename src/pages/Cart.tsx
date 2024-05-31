import { CartItem, Loading } from "@components/index";
import actGetCartProducts from "@store/cart/act/actGetCartProducts";
import {
  allPriceSeletor,
  quantitySeletor,
} from "@store/cart/selector/selector";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
import { changeQuantity, removeFromCart } from "@store/cart/cartSlice";

const Cart = () => {
  const dispach = useAppDispatch();
  const { productsFullinfo, items, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  const totalPrice = useAppSelector(allPriceSeletor);
  const totalQuantity = useAppSelector(quantitySeletor);

  const products = productsFullinfo.map((el) => {
    return {
      ...el,
      quantity: items.find((id) => id.id === el.id)?.quantity || 0,
    };
  });

  const handelQuantity = useCallback(
    (id: string, quantity: number) => {
      dispach(changeQuantity({ id, quantity }));
    },
    [dispach],
  );

  const deleteItem = useCallback(
    (id: string) => {
      dispach(removeFromCart(id));
    },
    [dispach],
  );

  useEffect(() => {
    dispach(actGetCartProducts());
  }, [dispach]);
  return (
    <div>
      <Loading status={loading} error={error}>
        {products.map((el) => (
          <CartItem
            key={el.id}
            {...el}
            deleteItem={deleteItem}
            changeQuantity={handelQuantity}
          />
        ))}
        <div className="flex items-center justify-between">
          <span>Total: </span>
          <span>{totalQuantity} item(s)</span>
          <span>{totalPrice}$</span>
        </div>
      </Loading>
    </div>
  );
};

export default Cart;
