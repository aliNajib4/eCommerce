import { CartItem, Loading } from "@components/index";
import actGetCartProducts from "@store/cart/act/actGetCartProducts";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const Cart = () => {
  const { productsFullinfo, items, loading, error } = useAppSelector(
    (state) => state.cart,
  );
  const dispach = useAppDispatch();
  useEffect(() => {
    dispach(actGetCartProducts());
  }, [dispach]);

  const products = productsFullinfo.map((el) => {
    return {
      ...el,
      quantity: items.find((id) => id.id === el.id)?.quantity || 0,
    };
  });

  return (
    <div>
      <Loading status={loading} error={error}>
        {products.map((el) => (
          <CartItem key={el.id} {...el} />
        ))}
      </Loading>
    </div>
  );
};

export default Cart;
