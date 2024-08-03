import { Loading, Product, GridList, Filter } from "@components/.";
import useProducts from "@hooks/useProducts";

const Products = () => {
  const { loading, error, productsFullInfo } = useProducts();

  const handleFilter = (data) => {};
  return (
    <div className="productsPage">
      <Filter onChange={handleFilter} />
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
