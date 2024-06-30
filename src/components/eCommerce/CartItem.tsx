import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { type TProduct } from "@types/.";
import { memo } from "react";

type TcartItem = TProduct & {
  deleteItem: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
};

const CartItem = memo(
  ({
    main_img,
    title,
    price,
    quantity,
    max,
    cat_prefix,
    id,
    deleteItem,
    changeQuantity,
  }: TcartItem) => {
    const handleSelect = (e: SelectChangeEvent<number>) => {
      changeQuantity(id, +e.target.value);
    };

    const handleDel = () => {
      deleteItem(id);
    };
    return (
      <div className="flex items-center justify-between border-b-4 px-3 pb-5 pt-3">
        <div className="flex items-center gap-5">
          <div className="m-auto max-h-24 max-w-24 overflow-hidden rounded-full text-center">
            <img src={main_img} alt="image product" />
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
            <Button variant="contained" onClick={handleDel}>
              Delete
            </Button>
          </div>
        </div>
        <div className="">
          <div>
            <span className="minName">quantity: </span>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>quantity</InputLabel>
              <Select
                label="quantity"
                onChange={(e) => handleSelect(e)}
                value={quantity}
              >
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
