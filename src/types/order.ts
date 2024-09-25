type TOrder = {
  id: string;
  userId: string;
  subtotal: number;
  items: {
    name: string;
    price: number;
    img: string;
    quantity: number;
    id: string;
  }[];
};

export default TOrder;
