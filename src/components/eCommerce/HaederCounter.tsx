import { Link } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store/store";

type TProps = {
  quantitySeletor: (state: RootState) => number;
  url: string;
  Icon: React.ReactNode;
};

const HaederCounter = ({ quantitySeletor, url, Icon }: TProps) => {
  const quantity = useAppSelector(quantitySeletor);
  return (
    <Link to={url} className="haederCounter">
      <div>
        {Icon}
        {quantity !== 0 && (
          <span className="badge">{quantity > 9 ? "9+" : quantity}</span>
        )}
      </div>
    </Link>
  );
};

export default HaederCounter;
