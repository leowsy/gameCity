const NewsItem = ({ image, title, date, game }) => {
  return (
    <div className="news-item">
      <img src={image} alt={title} />
      <div className="news-content">
        <h3>{title}</h3>
        <h6>{game}</h6>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default NewsItem;
