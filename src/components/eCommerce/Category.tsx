import { ICategory } from "@types/category";
import { Link } from "react-router-dom";

const Category = ({ img, prefix, title }: ICategory) => {
  return (
    <div className="m-auto">
      <Link to={`/categories/products/${prefix}`}>
        <div className="max-w-80 overflow-hidden rounded-full text-center ">
          <img src={img} alt={title} />
        </div>
        <h4 className="mt-5 text-center text-xl font-bold uppercase">
          {title}
        </h4>
      </Link>
    </div>
  );
};

export default Category;
