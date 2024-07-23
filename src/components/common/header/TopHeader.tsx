import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const TopHeader = () => {
  const [show, setShow] = useState(true);
  if (!show) return;
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className="topHeader">
      Sign up and get 20% off to your first order.
      <Link to="signup/">Sign Up Now</Link>
      <button onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
};

export default TopHeader;
