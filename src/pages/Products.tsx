import { Product } from "@components/.";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProducts } from "@store/products/productsSlice";
import { useEffect } from "react";

const Products = () => {
  const { loading, error, records } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (records.length === 0) dispatch(actGetProducts());
  }, [dispatch, records]);
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
