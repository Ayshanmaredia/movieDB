import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import { Container, Row, Col } from "react-bootstrap";

const base_url = "https://api.themoviedb.org/3";
const popular_url =
  base_url +
  "/discover/movie?sort_by=popularity.desc&api_key=" +
  process.env.REACT_APP_API_KEY;

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(popular_url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <div>
      <Container>
        <Row>
          {movies.length &&
            movies.map((movie) => (
              <Col md={3}>
                <Movie key={movie.id} {...movie} />
              </Col>
            ) )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
