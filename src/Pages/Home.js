import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import Movie from "../components/Movie";
import Navigation from "../components/Navigation";
import { useData } from "../DataContext";

const Home = () => {

  let location = useLocation();

  const search = useLocation().search;
  const history = useHistory();
  const { loadData, getSearchRequest, message, movies } = useData();

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
      loadData(pathName, history);
    }
  }

  return (
    <div>
      <Navigation />
      <div className="home-page-body">
        <Container>
          <Row>
            <Col className="text-center text-white">
              <b>{message}</b>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            {movies && movies.length &&
              movies.map((movie) => (
                <Col className="text-center" key={movie.id} sm={12} md={6} lg={4} xl={3} xs={12}>
                  <Movie {...movie} />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;