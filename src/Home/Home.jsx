import React from "react";
import Slider from "react-slick";
import NewsItem from "./NewsItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../Photos/slider1.jpg";
import slider2 from "../Photos/slider2.jpg";
import slider3 from "../Photos/slider3.png";

const Home = ({ news }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item">
          <a
            href="https://news.blizzard.com/en-us/diablo4/24140126/catch-up-on-the-latest-campfire-chat"
            target="_blank"
          >
            <img src={slider1} />
          </a>
        </div>
        <div className="slider-item">
          <a
            href="https://videocardz.com/press-release/sapphire-radeon-rx-7700-xt-frostpunk-2-edition-gpu-launches-in-july"
            target="_blank"
          >
            <img src={slider2} />
          </a>
        </div>
        <div className="slider-item">
          <a
            href="https://www.gogaming.gg/en/go-fc25-championship/"
            target="_blank"
          >
            <img src={slider3} />
          </a>
        </div>
      </Slider>
      <div className="news-box">
        <div className="latest-news">
          <h2>Latest News</h2>
        </div>
        <div className="news-container">
          {news.map((item, index) => {
            const { link, image, title, date, game } = item;
            return (
              <a href={link} target="_blank" key={index} className="news-link">
                <NewsItem image={image} title={title} date={date} game={game} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
