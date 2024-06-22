import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { logout } from "@store/auth/authSlice";
import actGetWishlist from "@store/wishlist/act/actGetWishlist";

const useHeader = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [showCategories, setShowCategories] = useState(false);

  const handleClickShop = () => {
    setShowCategories(prev => !prev)
  }

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
  return {
    accessToken,
    handleOpenUserMenu,
    name: user?.firstName + user?.lastName,
    anchorElUser,
    handleCkickItem,
    handleCloseUserMenu,
    handleClickShop,
    showCategories
  };
};

export default useHeader;
