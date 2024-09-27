import React, { useEffect, useState } from 'react';
import './styles/HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 카드 인덱스
  const moviesToShow = 3; // 한 화면에 보여줄 카드 수
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const apiKey = 'cd10fc709af5c9546116d3657d8d92e5'; 
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR`
        );
        setLatestMovies(response.data.results);
      } catch (error) {
        setError('영화 데이터를 가져오는 중 오류가 발생했습니다.');
        console.error("영화 데이터를 가져오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);  // 무비 디테일 페이지로 이동
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, Math.ceil(latestMovies.length / moviesToShow) - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="home-page">
      <h1>최신작</h1>
      <div className="carousel">
        <button onClick={handlePrev} disabled={currentIndex === 0}>◀</button>
        <div className="movie-container">
          {latestMovies.slice(currentIndex * moviesToShow, (currentIndex + 1) * moviesToShow).map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>개봉일: {new Date(movie.release_date).toLocaleDateString()}</p>
              <p>평점: {movie.vote_average}</p>
            </div>
          ))}
        </div>
        <button onClick={handleNext} disabled={(currentIndex + 1) * moviesToShow >= latestMovies.length}>▶</button>
      </div>
    </div>
  );
}

export default HomePage;
