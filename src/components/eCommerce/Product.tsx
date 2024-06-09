import { Button } from "@mui/material";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actToggleWishlistItem } from "@store/wishlist/wishlistSlice";
import { type TProduct } from "@types/.";
import { useState, memo } from "react";

const Product = memo(({ id, img, title, price, quantity, max }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const isLiked = useAppSelector((state) => state.wishlist.itemsId).includes(
    id,
  );
  const [loading, setLoading] = useState(false);

  const quantityReachedToMax = max - quantity <= 0 ? true : false;

  const handleAdd = () => {
    dispatch(addToCart(id));
    setIsDisabled(true);
    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, 300);
    if (quantity <= 0) setIsDisabled(true);
    return () => clearTimeout(timeout);
  };

  const handleLike = () => {
    if (loading) return;
    setLoading(true);
    dispatch(actToggleWishlistItem(id))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-full">
      <div className="m-auto overflow-hidden text-center rounded-full max-h-32 max-w-32 w-[128px] h-[128px] bg-gray-100">
        <img src={img} alt={title} />
      </div>
      <div className="m-8">
        <div className="flex items-center justify-between gap-5">
          <span className="text-2xl font-bold uppercase text-neutral-800">
            name:
          </span>
          <p className="line-clamp-1" title={title}>
            {title}
          </p>
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
      <div className="flex items-center gap-3">
        <Button
          variant="contained"
          className="grow"
          disabled={isDisabled || quantityReachedToMax}
          onClick={handleAdd}
        >
          {isDisabled ? "loading..." : "Add to cart"}
        </Button>
        <button
          onClick={handleLike}
          className="h-full p-2 text-xl font-bold text-gray-400 uppercase duration-200 cursor-pointer hover:bg-slate-50 hover:text-red-600"
        >
          {loading ? "loading..." : isLiked ? "unlike" : "like"}
        </button>
      </div>
    </div>
  );
});

export default Product;
