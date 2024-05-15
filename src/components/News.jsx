import React, { useState, useEffect } from "react";
import "./news.css"; // Zaimportowana klasa CSS dla stylizacji
import financialNews from "../data/news";

const News = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % financialNews.length);
    }, 8000); // Przesuwa co 2 sekundy

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-container">
      <div class="news">{financialNews[index]}</div>
    </div>
  );
};

export default News;
