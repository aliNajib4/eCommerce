type TProduct = {
  id: string;
  title: string;
  price: number;
  cat_prefix?: string;
  main_img: string;
  "Sub-imgs": string[];
  max?: number;
  quantity?: number; //???
  rating: number;
  discount?: number;
  color: string;
  size: string;
  type: string;
};

export default TProduct;
