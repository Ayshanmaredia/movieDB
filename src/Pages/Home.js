import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import { Container, Row, Col } from "react-bootstrap";
import MovieDropdown from "../components/MovieDropdown";

const base_url = "https://api.themoviedb.org/3/movie/";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filterType, setFilterType] = useState("popular");

  useEffect(() => {
    loadData();
  }, [filterType]);

  const loadData = () => {
    fetch(base_url + filterType + "?api_key=" + process.env.REACT_APP_API_KEY + "&language=en-US&page=1")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results)
      });
  }

  return (
    <div>
      <MovieDropdown
        setFilterType={setFilterType}
      />
      <Container className="my-2">
        <Row>
          {movies.length &&
            movies.map((movie) => (
              <Col md={3}>
                <Movie key={movie.id} {...movie} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;