import { CartItem, Loading } from "@components/index";
import actGetCartProducts from "@store/cart/act/actGetCartProducts";
import {
  allPriceSeletor,
  quantitySeletor,
} from "@store/cart/selector/selector";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

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

  useEffect(() => {
    dispach(actGetCartProducts());
  }, [dispach]);
  return (
    <div>
      <Loading status={loading} error={error}>
        {products.map((el) => (
          <CartItem key={el.id} {...el} />
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
