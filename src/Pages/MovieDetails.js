import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const img_api = "https://image.tmdb.org/t/p/w500";

const MovieDetails = (poster_path, overview) => {

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <Card.Img variant="top" src= "https://flxt.tmsimg.com/assets/p25765_p_v13_ah.jpg" />
        </Col>
        <Col sm={6}>
          World
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
