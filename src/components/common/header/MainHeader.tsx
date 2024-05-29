import TextField from "@mui/material/TextField";
import {
  MdOutlineAccountCircle as Account,
  MdOutlineShoppingBag as ShoppingBag,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { quantitySeletor } from "@store/cart/selector/selector";
import { useAppSelector } from "@store/hooks";

const MainHeader = () => {
  const quantity = useAppSelector(quantitySeletor);
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
        <div className="relative">
          <ShoppingBag size={32} />
          <div className="absolute -bottom-2 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
            <span className="text-xs text-white">{quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
