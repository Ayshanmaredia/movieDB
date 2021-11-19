import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const img_api = "https://image.tmdb.org/t/p/w500";

const Movie = ({ poster_path, title, release_date, id }) => {
  return (
    <Link className="nav-link text-dark" to={`/movieDetails?id=${id}`}>
      <Card className="mb-5" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img_api + poster_path} />
        <Card.Body>
          <Card.Title className="truncate">{title}</Card.Title>
          <Card.Text>Release Date: {release_date}</Card.Text>
          {/* <Button variant="primary">More Details</Button> */}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Movie;
