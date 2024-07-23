import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { logout } from "@store/auth/authSlice";
import actGetWishlist from "@store/wishlist/act/actGetWishlist";

const useHeader = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState(false);

  const handleClickShop = () => {
    setShowCategories((prev) => !prev);
  };

  const handleToggleUserMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCloseUserMenu = () => {
    setShowMenu(false);
  };

  const handleCkickItem = (value: string) => {
    handleCloseUserMenu();
    if (value === "Logout") dispatch(logout());
  };

  useEffect(() => {
    if (accessToken) dispatch(actGetWishlist());
  }, [dispatch, accessToken]);
  return {
    accessToken,
    name: user?.firstName + " " + user?.lastName,
    showMenu,
    handleCkickItem,
    handleCloseUserMenu,
    handleClickShop,
    handleToggleUserMenu,
    showCategories,
  };
};

export default useHeader;
