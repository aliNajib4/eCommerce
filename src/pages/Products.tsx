import { Loading, Product, GridList } from "@components/.";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProducts } from "@store/products/productsSlice";
import { IProduct } from "@types/product";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const params = useParams();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const items = useAppSelector((state) => state.cart.items);
  const productsFullInfo: IProduct[] = records.map((el) => {
    return {
      ...el,
      quantity: items.find((id) => id.id === el.id)?.quantity || 0,
    };
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetProducts(params.id ? params.id : "all"));
  }, [dispatch, params.id]);
  return (
    <div>
      <Loading status={loading} error={error}>
        <GridList
          records={productsFullInfo}
          recordItem={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
};

export default Products;
