import TProduct from "./product";

type TOrder = {
  id: string;
  userId: string;
  subtotal: number;
  items: TProduct[];
}

export default TOrder;