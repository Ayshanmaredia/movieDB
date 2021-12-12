import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import MovieInfo from "../components/MovieInfo";
import SimilarMovies from "../components/SimilarMovies";
import Cast from "../components/Cast";

const MovieDetails = () => {

  const img_url = "https://image.tmdb.org/t/p/w500";

  let history = useHistory();

  const [selectedMovie, setSelectedMovies] = useState();
  const [selectedTrailer, setSelectedTrailer] = useState([]);
  const [modalShow, setModalShow] = useState();
  const [disable, setDisable] = useState(false);
  const [similarMovies, setSimilarMovies] = useState();
  const [credits, setCredits] = useState();
  // const [genre, setGenre] = useState();

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

  // const getGenre = () => {
  //   return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_API_KEY + "&language=en-US")
  // }

  const loadData = (id) => {
    const P0 = getMovieData(id);
    const P1 = getMovieTrailer(id);
    const P2 = getSimilarMovies(id)
    const P3 = getCredits(id);

    Promise.all([P0, P1, P2, P3])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then((datas) => {
        setSelectedMovies(datas[0]);
        setTrailerData(datas[1]);
        setSimilarMovies(datas[2].results)
        setCredits(datas[3].cast);
      });
  }

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
        selectedMovie && credits && similarMovies ?
          <>
            <MovieInfo
              img_url={img_url}
              history={history}
              selectedMovie={selectedMovie}
              selectedTrailer={selectedTrailer}
              modalShow={modalShow}
              setModalShow={setModalShow}
              disable={disable}
            />
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
          :
          <div className="spinner">
            <Spinner animation="border" variant="success" />
          </div>
      }
    </>
  );
};

export default MovieDetails;