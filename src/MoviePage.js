import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './styles/MoviePage.css'; 

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); 
  const moviesPerPage = 20;
  const totalPages = 5;
  const key = 'cd10fc709af5c9546116d3657d8d92e5';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ko-KR`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('장르 데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=ko-KR&primary_release_date.gte=2014-01-01&primary_release_date.lte=2024-12-31&with_original_language=ko&certification_country=KR&certification.lte=15&page=${currentPage}${genreQuery}`
        );
        setMovies(response.data.results);
      } catch (error) {
        setError('영화 데이터를 가져오는 중 오류가 발생했습니다.');
        console.error(error);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMovies = filteredMovies.slice(0, moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);  // 이동
  };

  return (
    <div className="movie-page">
      {error && <p className="error-message">{error}</p>}

      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">모든 장르</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="영화 제목을 검색하세요"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="movie-grid">
        {currentMovies.length > 0 &&
          currentMovies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '대체이미지 URL'}
                alt={movie.title}
                style={{ width: '150px', height: '225px' }}
              />
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-release-date">개봉일: {movie.release_date}</p>
              <p className="movie-rating">별점: {movie.vote_average}</p>
            </div>
          ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoviePage;
