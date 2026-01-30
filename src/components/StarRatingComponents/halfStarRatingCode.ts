export const halfStarRatingCode = {
  JAVASCRIPT : `
import { useState } from "react";

const HalfStar = ({ limit = 5, rated = 2.5 }) => {
  const [rating, setRating] = useState(rated);

  const handleRateChange = (e, index) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;

    const value = clickX < width / 2 ? index + 0.5 : index + 1;
    setRating(value);
  };

  const renderStar = (index) => {
    if (rating >= index + 1) return "★";
    if (rating >= index + 0.5) return <Half />;
    return "☆";
  };
  return (
    <div>
      {Array.from({ length: limit }, (_, i) => (
        <span
          key={i}
          className="text-3xl text-orange-600 cursor-pointer"
          onClick={(e) => handleRateChange(e, i)}
        >
          {renderStar(i)}
        </span>
      ))}
    </div>
  );
};

export default HalfStar;

const Half = () => {
  return (
    <span className="relative inline-block text-3xl text-gray-300">
      ☆
      <span className="absolute top-0 left-0 w-1/2 overflow-hidden text-orange-500">
        ★
      </span>
    </span>
  );
};
`,

TYPESCRIPT : `
import { useState } from "react";

interface HalfStarProps {
  limit: number;
  rated: any;
}

const HalfStar = ({ limit = 5, rated = 2.5 }: HalfStarProps) => {
  const [rating, setRating] = useState<any>(rated);

  const handleRateChange = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number,
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;

    const value = clickX < width / 2 ? index + 0.5 : index + 1;
    setRating(value);
  };

  const renderStar = (index: number) => {
    if (rating >= index + 1) return "★";
    if (rating >= index + 0.5) return <Half />;
    return "☆";
  };
  return (
    <div>
      {Array.from({ length: limit }, (_, i) => (
        <span
          key={i}
          className="text-3xl text-orange-600 cursor-pointer"
          onClick={(e) => handleRateChange(e, i)}
        >
          {renderStar(i)}
        </span>
      ))}
    </div>
  );
};

export default HalfStar;

const Half = () => {
  return (
    <span className="relative inline-block text-3xl text-gray-300">
      ☆
      <span className="absolute top-0 left-0 w-1/2 overflow-hidden text-orange-500">
        ★
      </span>
    </span>
  );
};
`
};