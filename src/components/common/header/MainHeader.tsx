import TextField from "@mui/material/TextField";
import {
  MdOutlineShoppingBag as ShoppingBag,
  MdOutlineBookmark as Wishlist,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CartQuantitySeletor } from "@store/cart/selector/selector";
import { wishlistQuantitySeletor } from "@store/wishlist/selector/selector";
import HaederCounter from "@components/eCommerce/HaederCounter";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { logout } from "@store/auth/authSlice";
import actGetWishlist from "@store/wishlist/act/actGetWishlist";

const settings = [
  { name: "Account", path: "/profile" },
  { name: "Orders", path: "/profile/orders" },
  { name: "Logout", path: "/" },
];

const MainHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCkickItem = (value: string) => {
    handleCloseUserMenu();
    if (value === "Logout") dispatch(logout());
  };

  useEffect(() => {
    if (accessToken) dispatch(actGetWishlist());
  }, [dispatch, accessToken]);

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
        {!accessToken ? (
          <>
            <Link to="/signup">
              <Button variant="outlined"> sign up </Button>
            </Link>
            <Link to="/signin">
              <Button variant="contained">sign in</Button>
            </Link>
          </>
        ) : (
          <>
            <Box>
              <Tooltip title="Open settings">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenUserMenu}
                >
                  <Typography
                    sx={{
                      mr: 2,
                      ml: 1,
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >{`${user?.firstName} ${user.lastName}`}</Typography>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar>{user?.firstName[0].toUpperCase()}</Avatar>
                  </IconButton>
                </Box>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={!!anchorElUser}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link to={setting.path} key={setting.name}>
                    <MenuItem
                      onClick={() => handleCkickItem(setting.name)}
                      sx={{ p: 1 }}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
