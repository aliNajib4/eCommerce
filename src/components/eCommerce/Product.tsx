import { Button } from "@mui/material";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import { IProduct } from "@types/product";
import { useState, memo } from "react";

const Product = memo(({ id, img, title, price, quantity, max }: IProduct) => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const quantityReachedToMax = max - quantity <= 0 ? true : false;

  const handleAdd = () => {
    dispatch(addToCart(id));
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 300);
    if (quantity <= 0) setIsDisabled(true);
  };
  return (
    <div className="m-auto">
      <div className="m-auto max-h-32 max-w-32 overflow-hidden rounded-full text-center">
        <img src={img} alt={title} />
      </div>
      <div className="m-8">
        <div className="flex items-center justify-between gap-5">
          <span className="text-2xl font-bold uppercase text-neutral-800">
            name:
          </span>
          <p className="">{title}</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <span className="text-2xl font-bold uppercase text-neutral-800">
            price:
          </span>
          <p className="">{price} EGP</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <span className="text-2xl font-bold uppercase text-neutral-800">
            quantity:
          </span>
          <p className="">{max - quantity}</p>
        </div>
      </div>
      <Button
        variant="contained"
        className="w-full"
        onClick={handleAdd}
        disabled={isDisabled || quantityReachedToMax}
      >
        {isDisabled ? "loading..." : "Add to cart"}
      </Button>
    </div>
  );
});

export default Product;
