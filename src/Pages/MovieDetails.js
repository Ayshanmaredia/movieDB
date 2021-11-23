import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

const MovieDetails = () => {

  const img_api = "https://image.tmdb.org/t/p/w500";

  const [selectedMovie, setSelectedMovies] = useState();
  const [selectedTrailer, setSelectedTrailer] = useState([]);

  const search = useLocation().search;

  useEffect(() => {
    const id = new URLSearchParams(search).get('id');
    loadtMovieData(id);
    loadMovieTrailer(id);
  }, []);

  const loadtMovieData = (id) => {
    const selectedMovie_url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY;
    fetch(selectedMovie_url)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMovies(data);
        console.log(data);
      });
  }

  const loadMovieTrailer = (id) => {
    const trailer_url = "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + process.env.REACT_APP_API_KEY;
    fetch(trailer_url)
      .then((res) => res.json())
      .then((stats) => {
        setSelectedTrailer(stats);
        // console.log(stats.results);
      })
  }
  
  return (
    <>
      {
        selectedMovie ?
          <Container>
            <Row>
              <Col md={4}>
                <Image className="coverImage" src={img_api + selectedMovie.poster_path} />
              </Col>
              <Col md={8}>
                <p className="movieName">Movie: {selectedMovie.title}</p>
                <p className="movieInfo">Overview: {selectedMovie.overview}</p>
                <p className="movieInfo">Release Date: {selectedMovie.release_date}</p>
                <p className="movieInfo">Rating: {selectedMovie.vote_average}</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/-FmWuCgJmxo?autoplay=1&mute=1"
                  title="YouTube video player"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                />
              </Col>
            </Row>
          </Container>
          :
          <div>
            Loading...
          </div>
      }
    </>
  );
};

export default MovieDetails;
