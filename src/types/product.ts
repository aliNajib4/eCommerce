type TProduct = {
  id: string;
  title: string;
  price: string;
  cat_prefix?: string;
  main_img: string;
  "Sub-imgs": string[];
  max?: number;
  quantity?: number;
  rating: 4.2;
};

export default TProduct;
