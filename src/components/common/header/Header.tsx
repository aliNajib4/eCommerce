// import CategoriesHeadre from "./CategoriesHeadre";
// import MainHeader from "./MainHeader";
import useHeader from "@hooks/useHeader";

import TextField from "@mui/material/TextField";
import {
  ShoppingCart as ShoppingBag,
  Bookmark as Wishlist,
  KeyboardArrowDown as ArrowDown,
} from "@mui/icons-material";
import { Link as routerLink } from "react-router-dom";
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
  Link,
  Container,
} from "@mui/material";

const pagesAccount = [
  { name: "Account", path: "/profile" },
  { name: "Orders", path: "/profile/orders" },
  { name: "Logout", path: "/" },
];

const Categories = [
  {
    name: "gym",
    path: "/categories/products/gym",
  },
  {
    name: "formal",
    path: "/categories/products/formal",
  },
  {
    name: "casual",
    path: "/categories/products/casual",
  },
  {
    name: "all",
    path: "/categories",
  },
];

const Header = () => {
  const {
    accessToken,
    handleOpenUserMenu,
    name,
    anchorElUser,
    handleCkickItem,
    handleCloseUserMenu,
  } = useHeader();
  return (
    <Box
      sx={{
        mt: 3,
        mb: 8,
        position: "relative",
      }}
      component="header"
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Link
            component={routerLink}
            to="/"
            sx={{
              textTransform: "uppercase",
              fontSize: 32,
              fontWeight: "900",
              color: "black",
              textDecoration: "none",
              mr: 4,
            }}
          >
            logo
          </Link>

          <Button
            sx={{
              color: "black",
              "&:hover + .listCategories": {
                display: "block",
              },
              "&:hover div": { rotate: "180deg" },
              "&:has(+ :is(:hover)) div": {
                rotate: "180deg",
              },
            }}
            disableRipple
          >
            shop
            <Box
              sx={{
                mt: -0.5,
                transition: ".5s",
              }}
            >
              <ArrowDown />
            </Box>
          </Button>
          <Box
            component="ul"
            sx={{
              display: "none",
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              width: "100vw",
              boxShadow: "0px 3px 5px 0px rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
              py: 2,
              "&:hover": {
                display: "block",
              },
            }}
            className="listCategories"
          >
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {Categories.map(({ name, path }, idx) => (
                <Link
                  component={routerLink}
                  to={path}
                  sx={{ color: "black", textDecoration: "none" }}
                >
                  <Box
                    component="li"
                    key={idx}
                    sx={{
                      cursor: "pointer",
                      px: 6,
                      py: 3,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        bgcolor: "#eee",
                      },
                    }}
                  >
                    {name}
                  </Box>
                </Link>
              ))}
            </Container>
          </Box>
        </Box>
        <TextField id="outlined" label="Search" size="small" />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          <HaederCounter
            quantitySeletor={wishlistQuantitySeletor}
            url="/wishlist"
            Icon={<Wishlist fontSize="medium" />}
          />
          <HaederCounter
            quantitySeletor={CartQuantitySeletor}
            url="/cart"
            Icon={<ShoppingBag fontSize="medium" />}
          />
          {!accessToken ? (
            <>
              <Link component={routerLink} to="/signup">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                      borderColor: "#333",
                      color: "#333",
                      bgcolor: "#eee",
                    },
                  }}
                >
                  sign up
                </Button>
              </Link>
              <Link component={routerLink} to="/signin">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    color: "white",
                    bgcolor: "black",
                    "&:hover": {
                      bgcolor: "#333",
                    },
                  }}
                >
                  sign in
                </Button>
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
                    >
                      {name}
                    </Typography>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar>{name[0].toUpperCase()}</Avatar>
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
                  {pagesAccount.map((setting) => (
                    <Link
                      component={routerLink}
                      to={setting.path}
                      key={setting.name}
                      sx={{ color: "black", textDecoration: "none" }}
                    >
                      <MenuItem
                        onClick={() => handleCkickItem(setting.name)}
                        sx={{ p: 1 }}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
