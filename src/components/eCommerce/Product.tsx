import { memo } from "react";
import { type TProduct } from "@types/.";
import { Rating, Price } from "@components/.";
import { Link } from "react-router-dom";

const Product = memo(
  ({ main_img, title, price, rating, discount }: TProduct) => {
    return (
      <div className="product">
        <div className="image">
          <img src={main_img} alt={title} />
        </div>
        <Link to="." className="title" title={title}>
          {title}
        </Link>
        <Rating rating={rating} width={18} />
        <Price price={price} discount={discount} />
      </div>
    );
  },
);
export default Product;
