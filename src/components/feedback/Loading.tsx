import { TLoadingCategories } from "@types/loadingCategories";

type TLoadingProps = {
  error: string | null;
  status: TLoadingCategories;
  children: React.ReactNode;
};

const Loading = ({ error, status, children }: TLoadingProps) => {
  if (status === "pending") {
    return (
      <p className="text-3xl font-bold text-center text-emerald-500">
        Loading...
      </p>
    );
  }
  if (status === "failed") {
    return error;
  }
  return <div>{children}</div>;
};

export default Loading;
