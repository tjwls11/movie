import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/MovieDetail.css'

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = 'cd10fc709af5c9546116d3657d8d92e5';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR&append_to_response=credits`
        );
        console.log(response.data); // 응답 데이터 확인
        setMovie(response.data);
      } catch (error) {
        setError('영화 세부 정보를 가져오는 중 오류가 발생했습니다.');
        console.error("영화 세부 정보를 가져오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovieDetail();
  }, [id]);
  

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="movie-detail-page">
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>개봉일: {new Date(movie.release_date).toLocaleDateString()}</p>
          <p>평점: {movie.vote_average}</p>
          <p>감독: {movie.credits.crew.find(member => member.job === "Director")?.name || '정보 없음'}</p>
          <p>줄거리: {movie.overview}</p>
        </>
      ) : (
        <div>영화 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
}

export default MovieDetail;
