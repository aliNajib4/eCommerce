import actGetCartProducts from "@store/cart/act/actGetCartProducts";
import { useAppDispatch } from "@store/hooks";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetCartProducts());
  }, [dispatch]);
  return <div>Home</div>;
};

export default Home;
