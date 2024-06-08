import { Loading, Product, GridList } from "@components/.";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { loading, error, productsFullInfo } = useProducts();

  return (
    <div>
      <Loading status={loading} error={error} type="product">
        <GridList
          records={productsFullInfo}
          recordItem={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
};

export default Products;
