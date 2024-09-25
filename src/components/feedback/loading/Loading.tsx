import { type TLoading } from "@types/.";
import { GridList } from "@components/.";
import skeletonProduct from "../skeleton/skeletonProduct";
import skeletonWishlist from "../skeleton/skeletonWishlist";
import LottieHandler from "../LottieHandler";

const skeleton = {
  product: skeletonProduct,
  wishlist: skeletonWishlist,
};

type TLoadingProps = {
  error: string | null;
  status: TLoading;
  children: React.ReactNode;
  type?: keyof typeof skeleton;
  numSkeleton?: number;
};

const Loading = ({
  error,
  status,
  children,
  type = "product",
  numSkeleton = 3,
}: TLoadingProps) => {
  const Skeleton = skeleton[type];
  if (status === "pending") {
    return (
      <div className="skeletonLoad">
        
        {Array(numSkeleton).fill(0).map((_, idx)=>(
          <div className="item" key={idx}><Skeleton /></div>
        ))}
      </div>
    );
  } else if (status === "failed") {
    return <LottieHandler type="error" message={error} />;
  }
  return <>{children}</>;
};

export default Loading;
