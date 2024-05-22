import { Product } from "@components/.";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProducts } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const params = useParams();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetProducts(params.id ? params.id : "all"));
  }, [dispatch, params.id]);
  return (
    <div>
      {loading === "succeeded" ? (
        <div className="grid grid-cols-auto-fit-250 gap-10 px-10 ">
          {records.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      ) : loading === "pending" || loading === "idle" ? (
        <p className="text-center text-3xl font-bold text-emerald-500">
          Loading...
        </p>
      ) : (
        <p className="text-center text-3xl font-bold text-red-500">
          No products found
        </p>
      )}
    </div>
  );
};

export default Products;
