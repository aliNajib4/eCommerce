type TProduct = {
  id: string;
  name: string;
  price: number;
  cat_prefix: string;
  main_img: string;
  sub_imgs: string[];
  max?: number;
  quantity?: number; //???
  rating: number;
  discount?: number;
  color: string[];
  size: string[];
  type: string;
  description: string;
};

export default TProduct;
