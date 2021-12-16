import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import Movie from "../components/Movie";
import MovieDropdown from "../components/MovieDropdown";

const base_url = "https://api.themoviedb.org/3/";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState();

  const history = useHistory();
  let location = useLocation();

  const search = useLocation().search;

  useEffect(() => {
    loadPage();
  }, []);

  const loadPage = () => {
    const searchValue = new URLSearchParams(search).get('search');
    if (searchValue) {
      getSearchRequest(searchValue)
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

  const getSearchRequest = (searchValue) => {
    if (searchValue) {
      fetch(base_url + `search/movie?api_key=` + process.env.REACT_APP_API_KEY + `&language=en-US&query=${searchValue}&page=1&include_adult=false`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length === 0) {
            setMessage("No results found");
            setMovies(data.results);
          } else {
            setMovies(data.results);
          }
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
        loadFilterType={loadFilterType}
        getSearchRequest={getSearchRequest}
        message={message}
        setMessage={setMessage}
      />
      <div className="home-page-body">
        <Container>
          <Row>
            <Col className="text-center">
              <b>{message}</b>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            {movies.length &&
              movies.map((movie) => (
                <Col md={3}>
                  <Movie
                    key={movie.id}
                    {...movie}
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;