import Lottie from "lottie-react";
import empty from "@assets/lottieFiles/empty.json";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";
import notFound from "@assets/lottieFiles/notFound.json";
import accept from "@assets/lottieFiles/accept.json";

const animations = {
  empty,
  loading,
  error,
  notFound,
  accept,
};

type TProps = {
  type: keyof typeof animations | "loadingFull";
  message?: string;
};

const LottieHandler = ({ type, message }: TProps) => {
  return (
    <div
      className={
        "mb-5 flex flex-col items-center justify-center " +
        (type === "notFound" || type === "loadingFull" ? "h-screen" : "")
      }
    >
      <Lottie
        animationData={
          type === "loadingFull" ? animations["loading"] : animations[type]
        }
        className={
          type === "notFound" || type === "loadingFull"
            ? "w-[60vw]"
            : "w-[300px]"
        }
      />
      <p
        className={
          "text-3xl font-bold text-slate-500 " +
          (type === "error" ? "text-red-500" : "")
        }
      >
        {message}
      </p>
    </div>
  );
};

export default LottieHandler;
