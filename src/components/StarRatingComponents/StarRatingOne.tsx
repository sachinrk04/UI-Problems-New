import { useState } from "react";

interface StarRatingOneProps {
  limit: number;
  rated: number;
}

const StarRatingOne = ({ limit = 5, rated = 2 }: StarRatingOneProps) => {
  const [rating, setRating] = useState(rated);

  const handleChange = (index: number) => {
    if (index === 1 && rating === 1) {
      setRating(0);
    } else {
      setRating(index);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: limit }, (_, i) => (
        <span
          key={i}
          className="text-3xl text-orange-500 cursor-pointer"
          onClick={() => handleChange(i + 1)}
        >
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRatingOne;
