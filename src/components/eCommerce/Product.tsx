import { memo } from "react";
import { type TProduct } from "@types/.";
import { Rating, Price } from "@components/.";
import { Link } from "react-router-dom";

const Product = memo(
  ({ main_img, name, price, rating, discount, id }: TProduct) => {
    return (
      <div className="product">
        <div className="image">
          <img src={main_img} alt={name} />
        </div>
        <Link to={"/product/" + id} className="title" title={name}>
          {name}
        </Link>
        <Rating rating={rating} width={18} />
        <Price price={price} discount={discount} />
      </div>
    );
  },
);
export default Product;
