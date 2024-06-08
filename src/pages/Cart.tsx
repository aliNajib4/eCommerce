import { CartItem, Loading } from "@components/index";
import useCart from "@hooks/useCart";

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
    <div>
      <Loading status={loading} error={error} type="product">
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
