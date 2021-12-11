import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import Trailer from "../components/Trailer";
import SimilarMovies from "../components/SimilarMovies";
import Cast from "../components/Cast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MovieDetails = () => {

  let history = useHistory();

  const img_url = "https://image.tmdb.org/t/p/w500";

  const [selectedMovie, setSelectedMovies] = useState();
  const [selectedTrailer, setSelectedTrailer] = useState([]);
  const [modalShow, setModalShow] = useState();
  const [disable, setDisable] = useState(false);
  const [similarMovies, setSimilarMovies] = useState();
  const [credits, setCredits] = useState();

  const search = useLocation().search;
  const location = useLocation();

  useEffect(() => {
    const id = new URLSearchParams(search).get('id');
    window.scrollTo(0, 0)
    loadData(id);
  }, [location]);


  const getMovieData = (id) => {
    return fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY);
  }

  const getMovieTrailer = (id) => {
    return fetch("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + process.env.REACT_APP_API_KEY);
  }

  const getSimilarMovies = (id) => {
    return fetch("https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=" + process.env.REACT_APP_API_KEY + "&language=en-US&page=1");
  }

  const getCredits = (id) => {
    return fetch("https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + process.env.REACT_APP_API_KEY + "&language=en-US");
  }

  const loadData = (id) => {
    const P0 = getMovieData(id);
    const P1 = getMovieTrailer(id);
    const P2 = getSimilarMovies(id)
    const P3 = getCredits(id);

    Promise.all([P0, P1, P2, P3])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then((results) => {
        setSelectedMovies(results[0]);
        setTrailerData(results[1]);
        setSimilarMovies(results[2].results)
        setCredits(results[3].cast);
      });
  }

  console.log(similarMovies)

  const setTrailerData = (data) => {

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
          <Container className="my-5">
            <Button className="mb-3" onClick={() => history.goBack()} variant="secondary" size="sm">
              Go Back
            </Button>
            <Row>
              <Col md={4}>
                {selectedMovie.poster_path ?
                  <Image className="coverImage" src={img_url + selectedMovie.poster_path} />
                  :
                  <div className="moviePosterParent">
                    <div className="moviePoster">
                      <FontAwesomeIcon icon="file-image" />
                    </div>
                  </div>
                }

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
          <Container className="text-center mt-5">
            <Spinner animation="border" variant="success" />
          </Container>
      }
      <Container>
        <Row>
          {credits &&
            credits.map((credit) => (
              <Col>
                <Cast key={credit.id} {...credit} />
              </Col>
            ))}
        </Row>
      </Container>
      <SimilarMovies similarMovies={similarMovies} />
    </>
  );
};

export default MovieDetails;