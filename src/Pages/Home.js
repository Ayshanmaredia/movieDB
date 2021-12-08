import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import MovieDropdown from "../components/MovieDropdown";

const base_url = "https://api.themoviedb.org/3/";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();
  let location = useLocation();

  const search = useLocation().search;
  console.log(search);

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    const searchValue = new URLSearchParams(search).get('search');
    if (searchValue) {
      getMovieRequest(searchValue)
    } else {
      let pathName = location.pathname;
      if (pathName === "/") {
        pathName = "popular";
      } else {
        pathName = pathName.replace('/', "")
      }
      loadFilterType(pathName);
    }
  }

  const getMovieRequest = (searchValue) => {
    if (searchValue) {
      fetch(base_url + `search/movie?api_key=` + process.env.REACT_APP_API_KEY + `&language=en-US&query=${searchValue}&page=1&include_adult=false`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    }
  }

  const loadFilterType = (pathName) => {
    loadData(pathName);
  };

  const loadData = (pathName) => {
    fetch(base_url + "movie/" + pathName + "?api_key=" + process.env.REACT_APP_API_KEY + "&language=en-US&page=1")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        history.push(pathName);
      });
  }

  return (
    <div>
      <MovieDropdown
        setSearchValue={setSearchValue}
        loadFilterType={loadFilterType}
        getMovieRequest={getMovieRequest}
      />
      <Container className="my-2">
        <Row>
          {movies.length &&
            movies.map((movie) => (
              <Col md={3}>
                <Movie key={movie.id} {...movie}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;