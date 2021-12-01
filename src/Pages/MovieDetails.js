import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Trailer from "../components/Trailer";

const MovieDetails = () => {

  const img_url = "https://image.tmdb.org/t/p/w500";

  const [selectedMovie, setSelectedMovies] = useState();
  const [selectedTrailer, setSelectedTrailer] = useState([]);
  const [modalShow, setModalShow] = useState();
  const [disable, setDisable] = useState(false);

  const search = useLocation().search;

  useEffect(() => {
    const id = new URLSearchParams(search).get('id');
    loadData(id)
  }, []);


  const getMovieData = (id) => {
    return fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY);
  }

  const getMovieTrailer = (id) => {
    return fetch("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + process.env.REACT_APP_API_KEY);
  }

  const loadData = (id) => {
    const P0 = getMovieData(id);
    const P1 = getMovieTrailer(id);

    Promise.all([P0, P1])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then((results) => {
        setSelectedMovies(results[0]);
        setTrailerData(results[1]);
      });
  }

  const setTrailerData = (data) => {

    console.log(data.results);

    if (data.results.length === 0) {
      setDisable(true);
    } else if (data.results.length > 1) {
      setSelectedTrailer(data.results.find((stat) => stat.type === "Trailer"));
    } else {
      setSelectedTrailer(data.results[0]);
    }
  }


  return (
    <>
      {
        selectedMovie ?
          <Container className="mt-5">
            <Row>
              <Col md={4}>
                <Image className="coverImage" src={img_url + selectedMovie.poster_path} />
              </Col>
              <Col md={8}>
                <p className="movieName">Movie: {selectedMovie.title}</p>
                <p className="movieInfo">Overview: <span>{selectedMovie.overview}</span></p>
                <p className="movieInfo">Release Date: <span>{selectedMovie.release_date}</span></p>
                <p className="movieInfo">Rating: <span>{selectedMovie.vote_average}</span></p>
                <Button className="btn-trailer" variant={`${disable ? "secondary" : "primary"}`} disabled={disable} onClick={() => setModalShow(true)}>
                  Watch Trailer
                </Button>
                <Trailer
                  modalShow={modalShow}
                  setModalShow={setModalShow}
                  trailer={selectedTrailer}
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