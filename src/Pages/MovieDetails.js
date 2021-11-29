import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Image, Button} from "react-bootstrap";
import Trailer from "../components/Trailer";

const MovieDetails = () => {

  const img_url = "https://image.tmdb.org/t/p/w500";

  const [selectedMovie, setSelectedMovies] = useState();
  const [selectedTrailer, setSelectedTrailer] = useState([]);
  const [modalShow, setModalShow] = useState();

  const search = useLocation().search;

  useEffect(() => {
    const id = new URLSearchParams(search).get('id');
    loadtMovieData(id)
    loadMovieTrailer(id)
  }, []);

  const loadtMovieData = (id) => {
    const selectedMovie_url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY;
    fetch(selectedMovie_url)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMovies(data);
        // console.log(data);
      });
  }

  const loadMovieTrailer = (id) => {
    const trailer_url = "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + process.env.REACT_APP_API_KEY;
    fetch(trailer_url)
      .then((res) => res.json())
      .then((stats) => {
        setTrailerData(stats);
      })
  }

  const setTrailerData = (data) => {

    console.log(data.results.find((stat) => stat.type === "Trailer"));

    if (data.results.length === 1) {
      setSelectedTrailer(data.results[0]);
    } else if (data.results.length > 1) {
      setSelectedTrailer(data.results.find((stat) => stat.type === "Trailer"));
    } else {
      console.log(data.results)
    }
  }

  // const loadData = (id) => {
  //   const P0 = getMovieData(id);
  //   const P1 = getMovieTrailer(id);
  //   Promise.all([P0, P1]).then(results => {
  //     return results.map(result=>{
  //       return result.json();
  //     });
  //   }).then(results=>{
  //     setSelectedMovies(results[0]);
  //     // console.log(results[1].results.find((stat) => stat.type === "Trailer"));
  //   })
  // }

  // const getMovieData = (id) => {
  //   return fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY)
  // }

  // const getMovieTrailer = (id) => {
  //   return fetch("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + process.env.REACT_APP_API_KEY)
  // }

  return (
    <>
      {
        selectedMovie ?
          <Container>
            <Row>
              <Col md={4}>
                <Image className="coverImage" src={img_url + selectedMovie.poster_path} />
              </Col>
              <Col md={8}>
                <p className="movieName">Movie: {selectedMovie.title}</p>
                <p className="movieInfo">Overview: {selectedMovie.overview}</p>
                <p className="movieInfo">Release Date: {selectedMovie.release_date}</p>
                <p className="movieInfo">Rating: {selectedMovie.vote_average}</p>
                <Button onClick={() => setModalShow(true)}>Watch Trailer</Button>
                <Trailer 
                  modalShow = {modalShow}
                  setModalShow = {setModalShow}
                  trailer = {selectedTrailer}
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
