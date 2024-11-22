import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Xbox = ({ gameInfo = [], addToCart }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pcItems = gameInfo.filter((item) => item.category.includes("Xbox"));
  return (
    <div className="games">
      {pcItems.map((game) => {
        const { id, image, name, price, slug, platforms } = game;
        return (
          <div key={id} className="gamelist">
            <Link to={`/game/${slug}`} onClick={scrollToTop}>
              <img src={image} alt={name} />
              <h3>{name}</h3>
            </Link>
            <h4>Price: ${price}</h4>
            <h5>{platforms}</h5>
            <Link to="/Cart" onClick={scrollToTop}>
              <button
                className="cart-button"
                onClick={() => addToCart({ id, image, name, price })}
              >
                Add to <FontAwesomeIcon icon={faShoppingCart} />
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Xbox;
