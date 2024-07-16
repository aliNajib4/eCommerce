import Star from "@assets/svgs/star.svg?react";

type TProps = {
  rating: number;
  width?: number;
  textClass?: string;
};

const Rating = ({ rating, width = 16, textClass }: TProps) => {
  const stars = Array(Math.ceil(rating))
    .fill(0)
    .map((_, idx) => (
      <div
        key={idx}
        className="star"
        style={{
          width:
            rating % 1 !== 0 && idx === Math.ceil(rating) - 1
              ? `${(rating % 1) * width}px`
              : width,
          overflow: "hidden",
        }}
      >
        <Star width={width} />
      </div>
    ));

  console.log(rating % 1 !== 0 ? `${(rating % 1) * 16}px` : "16px", rating);
  return (
    <div className="rating">
      {stars}
      <p className={textClass}>
        {rating}/<span>5</span>
      </p>
    </div>
  );
};

export default Rating;
