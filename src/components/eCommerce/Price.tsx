type TProps = {
  price: number;
  discount?: number;
};

const Discount = ({ price, discount = 0 }: TProps) => {
  return (
    <div className="price">
      {discount == 0 ? (
        <p className="price_number">${Math.trunc(price)}</p>
      ) : (
        <>
          <p className="price_number">
            ${Math.trunc(price - price * (discount / 100))}
          </p>
          <p className="price_number before">${Math.trunc(price)}</p>
          <p className="discount">-{discount}%</p>
        </>
      )}
    </div>
  );
};

export default Discount;
