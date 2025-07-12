import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function StarRating({ rating }) {
  const numericRating = Math.min(Math.max(Number(rating) || 0, 0), 5);
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f5c518" }}>
      <div style={{ display: "flex", gap: "4px" }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={"full" + i} />
        ))}
        {hasHalfStar && <FaStarHalfAlt key="half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={"empty" + i} />
        ))}
      </div>
      <span style={{ fontWeight: "bold", color: "#E2E8F0" }}>
        {numericRating.toFixed(1)}
      </span>
    </div>
  );
}

export default StarRating;