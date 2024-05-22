import { Button } from "@mui/material";
import { IProduct } from "@types/product";

const Product = ({ img, title, price }: IProduct) => {
  console.log(img, title, price);
  return (
    <div className="m-auto">
      <div className="m-auto max-h-32 max-w-32 overflow-hidden rounded-full text-center">
        <img src={img} alt={title} />
      </div>
      <div className="m-8">
        <div className="flex items-center justify-between gap-5">
          <span className="text-2xl font-bold uppercase text-neutral-800">
            name:{" "}
          </span>
          <p className="">{title}</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <span className="text-2xl font-bold uppercase text-neutral-800">
            price:{" "}
          </span>
          <p className="">{price} EGP</p>
        </div>
      </div>
      <Button variant="contained" className="w-full">
        Add to cart
      </Button>
    </div>
  );
};

export default Product;
