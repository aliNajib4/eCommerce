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
  const { user } = useAppSelector((state) => state.auth);

  if (inSignin && user) {
    return <Navigate to="/" />;
  }
  if (!inSignin && !user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtecteRoute;
