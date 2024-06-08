import { type TLoading } from "@types/.";
import { GridList } from "@components/.";
import skeletonProduct from "../skeleton/skeletonProduct";
import skeletonCategory from "../skeleton/skeletonCategory";
import skeletonWishlist from "../skeleton/skeletonWishlist";

const skeleton = {
  product: skeletonProduct,
  category: skeletonCategory,
  wishlist: skeletonWishlist,
};

type TLoadingProps = {
  error: string | null;
  status: TLoading;
  children: React.ReactNode;
  type?: keyof typeof skeleton;
};

const Loading = ({
  error,
  status,
  children,
  type = "product",
}: TLoadingProps) => {
  const Component = skeleton[type];
  if (status === "pending") {
    return (
      <GridList recordItem={() => <Component />} records={Array(4).fill(0)} />
    );
  }
  if (status === "failed") {
    return error;
  }
  return <div>{children}</div>;
};

export default Loading;
