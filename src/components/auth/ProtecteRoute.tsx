import React from "react";
import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

const ProtecteRoute = ({
  inSignin = false,
  children,
}: {
  inSignin?: boolean;
  children: React.ReactNode;
}) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (inSignin && accessToken) {
    return <Navigate to="/" />;
  }
  if (!inSignin && !accessToken) {
    return <Navigate to="/signin?massage=Please_signin" />;
  }
  return children;
};

export default ProtecteRoute;
