import { Loading, Product, GridList } from "@components/.";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { loading, error, products } = useWishlist();

  return (
    <div>
      <Loading status={loading} error={error} type="wishlist">
        <GridList
          records={products}
          recordItem={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
};

export default Wishlist;
