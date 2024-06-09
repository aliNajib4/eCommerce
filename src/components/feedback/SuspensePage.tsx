import { Suspense } from "react";
import LottieHandler from "./LottieHandler";

const SuspensePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<LottieHandler type="loading" message="Loading..." />}>
      {children}
    </Suspense>
  );
};

export default SuspensePage;
