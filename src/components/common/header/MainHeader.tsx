import TextField from "@mui/material/TextField";
import {
  MdOutlineShoppingBag as ShoppingBag,
  MdOutlineBookmark as Wishlist,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { CartQuantitySeletor } from "@store/cart/selector/selector";
import { wishlistQuantitySeletor } from "@store/wishlist/selector/selector";
import HaederCounter from "@components/eCommerce/HaederCounter";
import { Button } from "@mui/material";

const MainHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="py-10 text-4xl font-bold uppercase">
        logo
      </Link>
      <TextField id="outlined" label="search" />
      <div className="flex items-center gap-5">
        <HaederCounter
          quantitySeletor={wishlistQuantitySeletor}
          url="/wishlist"
          Icon={<Wishlist size={32} />}
        />
        <HaederCounter
          quantitySeletor={CartQuantitySeletor}
          url="/cart"
          Icon={<ShoppingBag size={32} />}
        />
        <Link to="/signup">
          <Button variant="outlined"> sign up </Button>
        </Link>
        <Link to="/signin">
          <Button variant="contained">sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainHeader;
