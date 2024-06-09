import { CartItem, Loading } from "@components/index";
import useCart from "@hooks/useCart";
import LottieHandler from "@components/feedback/LottieHandler";

const Cart = () => {
  const {
    loading,
    error,
    products,
    totalPrice,
    totalQuantity,
    handelQuantity,
    deleteItem,
  } = useCart();

  return (
    <>
      <Loading status={loading} error={error} type="product">
        {products.length !== 0 ? (
          products.map((el) => (
            <CartItem
              key={el.id}
              {...el}
              deleteItem={deleteItem}
              changeQuantity={handelQuantity}
            />
          ))
        ) : (
          <LottieHandler type="empty" message="cart is empty" />
        )}
        <div className="flex items-center justify-between">
          <span>Total: </span>
          <span>{totalQuantity} item(s)</span>
          <span>{totalPrice}$</span>
        </div>
      </Loading>
    </>
  );
};

export default Cart;
