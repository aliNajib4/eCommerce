import Star from "@assets/svgs/star.svg?react";

type TProps = {
  rating: number;
  width?: number;
  isText?: boolean;
  textClass?: string;
};

const Rating = ({ rating, width = 16, isText = true, textClass }: TProps) => {
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
  return (
    <div className="rating">
      {stars}
      {isText && (
        <p className={textClass}>
          {rating}/<span>5</span>
        </p>
      )}
    </div>
  );
};

export default Rating;
