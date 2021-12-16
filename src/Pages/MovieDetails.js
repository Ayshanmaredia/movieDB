import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieInfo from "../components/MovieInfo";
import SimilarMovies from "../components/SimilarMovies";
import Cast from "../components/Cast";
import Spin from "../components/Spin";
import ThemeButton from "../components/ThemeButton";

const MovieDetails = () => {

  const img_url = "https://image.tmdb.org/t/p/w500";

  const [selectedMovie, setSelectedMovies] = useState();
  const [selectedTrailer, setSelectedTrailer] = useState([]);
  const [modalShow, setModalShow] = useState();
  const [disable, setDisable] = useState(false);
  const [similarMovies, setSimilarMovies] = useState();
  const [credits, setCredits] = useState();
  const [show, setShow] = useState(8);
  const [visible, setVisible] = useState(6);


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

  const showMoreMovies = () => {
    if (show === 8) {
      setShow(similarMovies.length);
    } else {
      setShow(8);
    }
  }

  const showMoreCast = () => {
    if (visible === 6) {
      setVisible(credits.length);
    } else {
      setVisible(6);
    }
  }

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
        setSimilarMovies(datas[2].results);
        setCredits(datas[3].cast);
      });
  }

  console.log(credits)

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
              selectedMovie={selectedMovie}
              selectedTrailer={selectedTrailer}
              modalShow={modalShow}
              setModalShow={setModalShow}
              disable={disable}
            />
            <Container>
              <h3 className="text-white">Casts</h3>
              <hr></hr>
              <Row>
                {credits &&
                  credits.slice(0, visible).map((credit) => (
                    <Col md={2}>
                      <Cast
                        key={credit.id}
                        {...credit}
                      />
                    </Col>
                  ))}
              </Row>
              <div className="d-flex justify-content-center">
                <ThemeButton
                  onClick={showMoreCast}
                  text={visible === credits.length ? "Show less" : "Show all"}
                />
              </div>
            </Container>
            <SimilarMovies
              similarMovies={similarMovies}
              show={show}
              showMoreMovies={showMoreMovies}
            />
          </>
          :
          <Spin />
      }
    </>
  );
};

export default MovieDetails;