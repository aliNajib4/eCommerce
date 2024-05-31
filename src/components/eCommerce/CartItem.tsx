import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { changeQuantity, removeFromCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import { IProduct } from "@types/product";
import { memo } from "react";

const CartItem = memo(
  ({ img, title, price, id, quantity, max, cat_prefix }: IProduct) => {
    const dispatch = useAppDispatch();
    const handleSelect = (e) => {
      dispatch(changeQuantity({ id, quantity: e.target.value }));
    };
    console.log("render");
    return (
      <div className="flex items-center justify-between border-b-4 px-3 pb-5 pt-3">
        <div className="flex items-center gap-5">
          <div className="m-auto max-h-24 max-w-24 overflow-hidden rounded-full text-center">
            <img src={img} alt="image product" />
          </div>
          <div className="flex flex-col items-start justify-between gap-5">
            <div>
              <div>
                <span className="minName">name:</span> {title}
              </div>
              <div>
                <span className="minName">price:</span> {price}
              </div>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(removeFromCart(id));
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="">
          <div>
            <span className="minName">quantity: </span>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>quantity</InputLabel>
              <Select label="quantity" onChange={handleSelect} value={quantity}>
                {Array(max)
                  .fill(0)
                  .map((_, idx) => {
                    idx++;
                    return (
                      <MenuItem value={idx} key={idx}>
                        {idx}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div>
            <span className="minName">category: </span> {cat_prefix}
          </div>
        </div>
      </div>
    );
  },
);

export default CartItem;
