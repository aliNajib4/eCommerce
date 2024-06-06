import { Link } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { ReactNode, useEffect, useRef, useState } from "react";
import { RootState } from "@store/store";

type TProps = {
  quantitySeletor: (state: RootState) => number;
  url: string;
  Icon: ReactNode;
};

const HaederCounter = ({ quantitySeletor, url, Icon }: TProps) => {
  const quantity = useAppSelector(quantitySeletor);
  const [isAdd, setIsAdd] = useState(false);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setIsAdd(true);
    const timeout = setTimeout(() => {
      setIsAdd(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [quantity]);

  return (
    <Link to={url}>
      <div className="relative">
        {Icon}
        {quantity !== 0 && (
          <div
            className={
              "absolute -bottom-2 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500" +
              (isAdd ? " animate-pumping" : "")
            }
          >
            <span className="text-xs text-white">{quantity}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default HaederCounter;
