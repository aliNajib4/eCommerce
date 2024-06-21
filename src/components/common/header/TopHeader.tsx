import { Box, Link } from "@mui/material";
import { Link as routerLink } from "react-router-dom";

const TopHeader = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        bgcolor: "black",
        color: "white",
        py: 1,
        fontSize: 14,
      }}
    >
      Sign up and get 20% off to your first order.{" "}
      <Link
        to="signup/"
        component={routerLink}
        sx={{
          textDecoration: "underline",
          color: "white",
          ":hover": { color: "#80a0cc" },
        }}
      >
        Sign Up Now
      </Link>
    </Box>
  );
};

export default TopHeader;
