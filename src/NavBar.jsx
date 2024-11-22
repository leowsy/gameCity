import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const { width } = useWindowSize();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar if it's still open (change to navbar)
  useEffect(() => {
    if (width > 768) {
      setIsOpen(false);
    }
  }, [width]);

  // Close the navbar/sidebar after entered other page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div>
      {width < 768 ? (
        <div className="navbar">
          <button className="toggle-button" onClick={toggleSidebar}>
            ☰
          </button>
          <Link to="/" className="logo">
            GameCity
          </Link>
          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <div className="dropdown-menu-side">
              <Link to="/PC" onClick={scrollToTop}>
                PC
              </Link>
              <Link to="/PlayStation" onClick={scrollToTop}>
                PlayStation
              </Link>
              <Link to="/Xbox" onClick={scrollToTop}>
                Xbox
              </Link>
              <Link to="/Switch" onClick={scrollToTop}>
                Switch
              </Link>
              <Link to="/All" onClick={scrollToTop}>
                All
              </Link>
            </div>

            <Link to="/Cart" onClick={scrollToTop}>
              Cart <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/Contact" onClick={scrollToTop}>
              Contact
            </Link>
            <Link to="/Account" onClick={scrollToTop}>
              Account
            </Link>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <Link to="/" className="logo">
            GameCity
          </Link>
          <div className="nav-links">
            <span className="dropdown">
              Games <i className="arrow down"></i>
              <div className="dropdown-menu">
                <Link to="/PC" onClick={scrollToTop}>
                  PC
                </Link>
                <Link to="/PlayStation" onClick={scrollToTop}>
                  PlayStation
                </Link>
                <Link to="/Xbox" onClick={scrollToTop}>
                  Xbox
                </Link>
                <Link to="/Switch" onClick={scrollToTop}>
                  Switch
                </Link>
                <Link to="/All" onClick={scrollToTop}>
                  All
                </Link>
              </div>
            </span>

            <Link to="/Cart" onClick={scrollToTop}>
              Cart <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/Contact" onClick={scrollToTop}>
              Contact
            </Link>
            <Link to="/Account" onClick={scrollToTop}>
              Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
