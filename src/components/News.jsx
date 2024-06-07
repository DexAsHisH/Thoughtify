'use client';
import { useEffect, useState } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false); // State variable for dark mode

  useEffect(() => {
    fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  // Toggle function for dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`text-gray-700 space-y-3 rounded-xl pt-2 ${isDarkMode ? 'dark:bg-gray-800' : 'bg-gray-100'}`}>
      <h4 className='font-bold text-xl px-4'>Whats happening</h4>
      {news.slice(0, articleNum).map((article) => (
        <div key={article.url}>
          <a href={article.url} target='_blank'>
            <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200'>
              <div className='space-y-0.5'>
                <h6 className='text-sm font-bold'>{article.title}</h6>
                <p className='text-xs font-medium text-gray-500'>
                  {article.source.name}
                </p>
              </div>
              <img src={article.urlToImage} width={70} className='rounded-xl' />
            </div>
          </a>
        </div>
      ))}
      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className={`pl-4 pb-3 text-sm ${isDarkMode ? 'text-blue-300 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'}`}
      >
        Load more
      </button>
      <button onClick={toggleDarkMode} className='text-sm text-blue-600 hover:text-blue-800'>
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}
