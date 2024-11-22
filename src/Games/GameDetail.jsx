import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const GameDetail = ({ gameInfo, addToCart }) => {
  const { slug } = useParams();
  const game = gameInfo.find((game) => game.slug === slug);
  const [showMore, setShowMore] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { id, image, name, price, info, releaseDate, platforms } = game;
  const platformsList = Array.isArray(platforms) ? platforms : [platforms];

  return (
    <div className="game-detail" key={id}>
      <div className="details">
        <img src={image} alt={name} />
        <h1>{name}</h1>
        <h2>Price: ${price}</h2>
        <h5>Platforms: {platformsList}</h5>
        <h5>Release Date: {releaseDate}</h5>
      </div>

      <div className="info-container">
        <div className="info">
          {showMore ? info : `${info.substring(0, 250)}...`}
          <span
            className="toggle-more"
            onClick={() => setShowMore(!showMore)}
            style={{
              marginLeft: "10px",
            }}
          >
            {showMore ? "Hide" : "More"}
          </span>
        </div>

        <div className="button-container">
          <Link to="/Cart" onClick={scrollToTop}>
            <button
              className="cart-button"
              onClick={() => addToCart({ id, image, name, price })}
            >
              Add to <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </Link>
          <Link to="/All">
            <button className="return-button">Return</button>{" "}
            {/* Return button styled */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
