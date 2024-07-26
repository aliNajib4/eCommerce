import { Price, Rating } from "@components/index";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProduct from "@store/products/act/actGetProduct";
import { cleanUp } from "@store/products/productsSlice";
import { actToggleWishlistItem } from "@store/wishlist/wishlistSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    records: [product],
  } = useAppSelector((state) => state.products);
  const items = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.itemsId);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { id: ParamId } = useParams();

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(0);
  const [LoadingLike, setLoadingLike] = useState(false);

  const listImages = product
    ? [product["main_img"], ...product["Sub-imgs"]]
    : [];
  const isAdd = color !== "" && size !== "" && quantity !== 0 ? true : false;
  const isAddCart = items.some((item) => item.id === product?.id);
  const isAddWishlist = wishlistItems.some((item) => item === product?.id);

  const handleMainImage = (idx: number) => {
    setImage(idx);
  };

  const handleColor = (color: string) => {
    setColor(color);
  };

  const handleSize = (size: string) => {
    setSize(size);
  };

  const handleQuantity = (type: 1 | -1) => {
    setQuantity((prev) =>
      type === -1
        ? prev === 0
          ? 0
          : prev - 1
        : prev >= product.max
          ? prev
          : prev + 1,
    );
  };

  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, color, size, quantity }));
  };
  const handleLike = () => {
    setLoadingLike(true);
    dispatch(actToggleWishlistItem(product.id))
      .unwrap()
      .then(() => {
        setLoadingLike(false);
      });
  };

  useEffect(() => {
    const promise = dispatch(actGetProduct(ParamId));
    return () => {
      promise.abort();
      dispatch(cleanUp());
    };
  }, [dispatch, ParamId]);

  if (loading === "pending" || loading === "idle") {
    return <p>loading...</p>;
  }
  if (loading === "failed") {
    return <p>{error}</p>;
  }
  return (
    <div className="productPage">
      <div className="preview">
        <div className="mainImg">
          <img src={listImages[image]} alt="main image" />
        </div>
        {product["Sub-imgs"].length !== 0 && (
          <ul className="subImgs">
            {listImages.map((img, idx) => (
              <li
                className={"subImg" + (image === idx ? " active" : "")}
                key={idx}
                onClick={() => handleMainImage(idx)}
              >
                <img src={img} alt={"subImg" + idx} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="info">
        <h1 className="title">{product["title"]}</h1>
        <Rating rating={product["rating"]} width={24} />
        <Price price={product["price"]} discount={product["discount"]} />
        <p className="description line-clamp-2">{product["description"]}</p>
        <div className="colors">
          <h5 className="title">select colors</h5>
          <ul className="list">
            {product["color"].map((bgColor, idx) => (
              <li key={idx}>
                <div
                  className={"color" + (color === bgColor ? " active" : "")}
                  style={{ backgroundColor: bgColor }}
                  onClick={() => handleColor(bgColor)}
                ></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="sizes">
          <p className="title">choose size</p>
          <ul className="list">
            {product["size"].map((sizeName, idx) => (
              <li
                key={idx}
                className={"size" + (sizeName === size ? " active" : "")}
                onClick={() => handleSize(sizeName)}
              >
                {sizeName}
              </li>
            ))}
          </ul>
        </div>
        <div className="addToCart">
          <div className="quantity">
            <button onClick={() => handleQuantity(-1)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => handleQuantity(1)}>+</button>
          </div>
          <button
            className="addBut"
            onClick={handleAdd}
            disabled={!isAdd || isAddCart}
          >
            {!isAddCart ? "add to cart" : "in cart"}
          </button>
          <button
            className="likeBtn"
            onClick={handleLike}
            disabled={LoadingLike || !accessToken}
          >
            {LoadingLike ? "loading..." : isAddWishlist ? "liked" : "like"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
