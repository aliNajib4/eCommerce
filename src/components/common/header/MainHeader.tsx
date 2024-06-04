import TextField from "@mui/material/TextField";
import {
  MdOutlineAccountCircle as Account,
  MdOutlineShoppingBag as ShoppingBag,
  MdOutlineBookmark as Wishlist,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { CartQuantitySeletor } from "@store/cart/selector/selector";
import { useAppSelector } from "@store/hooks";
import { useEffect, useRef, useState } from "react";
import { wishlistQuantitySeletor } from "@store/wishlist/selector/selector";

const MainHeader = () => {
  const cartQuantity = useAppSelector(CartQuantitySeletor);
  const wishlistQuantity = useAppSelector(wishlistQuantitySeletor);
  const [isAddCart, setIsAddCart] = useState(false);
  const [isAddWishlist, setIsAddWishlist] = useState(false);
  const firstUpdateCart = useRef(true);
  const firstUpdateWishlist = useRef(true);
  useEffect(() => {
    if (firstUpdateCart.current) {
      firstUpdateCart.current = false;
      return;
    }
    setIsAddCart(true);
    const timeout = setTimeout(() => {
      setIsAddCart(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [cartQuantity]);

  useEffect(() => {
    if (firstUpdateWishlist.current) {
      firstUpdateWishlist.current = false;
      return;
    }
    setIsAddWishlist(true);
    const timeout = setTimeout(() => {
      setIsAddWishlist(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [wishlistQuantity]);

  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="py-10 text-4xl font-bold uppercase">
        logo
      </Link>
      <TextField id="outlined" label="search" />
      <div className="flex items-center gap-5">
        <div>
          <Account size={32} />
        </div>
        <Link to="/wishlist">
          <div className="relative">
            <Wishlist size={32} />
            {wishlistQuantity !== 0 && (
              <div
                className={
                  "absolute -bottom-2 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500" +
                  (isAddWishlist ? " animate-pumping" : "")
                }
              >
                <span className="text-xs text-white">{wishlistQuantity}</span>
              </div>
            )}
          </div>
        </Link>
        <Link to="/cart">
          <div className="relative">
            <ShoppingBag size={32} />
            {cartQuantity !== 0 && (
              <div
                className={
                  "absolute -bottom-2 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500" +
                  (isAddCart ? " animate-pumping" : "")
                }
              >
                <span className="text-xs text-white">{cartQuantity}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
