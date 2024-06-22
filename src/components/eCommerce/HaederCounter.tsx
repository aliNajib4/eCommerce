import { Link as routerLink } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { RootState } from "@store/store";
import { Badge, Link } from "@mui/material";

type TProps = {
  quantitySeletor: (state: RootState) => number;
  url: string;
  Icon: React.ReactNode;
};

const HaederCounter = ({ quantitySeletor, url, Icon }: TProps) => {
  const quantity = useAppSelector(quantitySeletor);

  return (
    <Link
      component={routerLink}
      to={url}
      sx={{ color: "black", textDecoration: "none" }}
    >
      <Badge badgeContent={quantity} color="error" max={9}>
        {Icon}
      </Badge>
    </Link>
  );
};

export default HaederCounter;
