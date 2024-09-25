import useHeader from "@hooks/useHeader";
import { Link } from "react-router-dom";
import { CartQuantitySeletor } from "@store/cart/selector/selector";
import { wishlistQuantitySeletor } from "@store/wishlist/selector/selector";
import HaederCounter from "@components/eCommerce/HaederCounter";
import { TopHeader } from "@components/.";
//svgs
import ShoppingBag from "@assets/svgs/card.svg?react";
import Wishlist from "@assets/svgs/wishlist.svg?react";
import ArrowDown from "@assets/svgs/downArr.svg?react";

const pagesAccount = [
  { name: "Account", path: "/profile" },
  { name: "Orders", path: "/profile/orders" },
  { name: "Logout", path: "/" },
];

const Categories = [
  {
    name: "gym",
    path: "/products/gym",
  },
  {
    name: "formal",
    path: "/products/formal",
  },
  {
    name: "casual",
    path: "/products/casual",
  },
  {
    name: "all",
    path: "/products",
  },
];

const Header = () => {
  const { user, name, showMenu, handleCkickItem, handleToggleUserMenu } =
    useHeader();
  return (
    <>
      {user ? null : <TopHeader />}
      <header>
        <div className="container">
          <div className="left">
            <Link to="/" className="logo">
              logo
            </Link>

            <button className="shop">
              shop
              <div className="arrow">
                <ArrowDown />
              </div>
            </button>
            <div className="listCategories">
              <div className="container">
                {Categories.map(({ name, path }, idx) => (
                  <Link className="categoryLink" key={idx} to={path}>
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <HaederCounter
              quantitySeletor={wishlistQuantitySeletor}
              url="/wishlist"
              Icon={<Wishlist width="14px" />}
            />
            <HaederCounter
              quantitySeletor={CartQuantitySeletor}
              url="/cart"
              Icon={<ShoppingBag width="16px" />}
            />
            {!user ? (
              <>
                <Link to="/signup" className="signup">
                  sign up
                </Link>
                <Link to="/signin" className="signin">
                  sign in
                </Link>
              </>
            ) : (
              <div className="in-signin">
                <div className="main" title="Open settings">
                  <p className="name">{name}</p>
                  <div className="avatar" onClick={handleToggleUserMenu}>
                    {name[0].toUpperCase()}
                  </div>
                </div>
                {showMenu && (
                  <div className="menu">
                    {pagesAccount.map((setting) => (
                      <Link
                        to={setting.path}
                        key={setting.name}
                        className="menuItem"
                        onClick={() => handleCkickItem(setting.name)}
                      >
                        {setting.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
