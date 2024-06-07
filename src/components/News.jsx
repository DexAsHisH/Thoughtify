"use client"
import { useEffect, useState } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode

  useEffect(() => {
    fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`space-y-3 rounded-xl pt-2  dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50`}>
      <h4 className={`font-bold text-xl px-4  dark:hover:bg-gray-700 dark:text-white`}>Whats happening</h4>
      {news.slice(0, articleNum).map((article) => (
        <div key={article.url}>
          <a href={article.url} target='_blank'>
            <div className={`flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-600 transition duration-200  `}>
              <div className='space-y-0.5'>
                <h6 className={`text-sm font-bold`}>{article.title}</h6>
                <p className={`text-xs font-medium `}>{article.source.name}</p>
              </div>
              <img src={article.urlToImage} width={70} className='rounded-xl' />
            </div>
          </a>
        </div>
      ))}
      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className={`pl-4 pb-3 text-sm  dark:hover:bg-gray-700 dark:text-white`}
      >
        Load more
      </button>
    </div>
  );
}
