import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const img_url = "https://image.tmdb.org/t/p/w500";

const Movie = ({ id, poster_path, title, vote_average}) => {

  return (
    <Link className="nav-link text-dark" to={`/movieDetails?id=${id}`}>
      <Card className="mb-5" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img_url + poster_path} />
        <Card.Body>
          <Card.Title className="truncate">{title}</Card.Title>
          <Card.Text>Rating: {vote_average}</Card.Text>
          {/* <Button variant="primary">More Details</Button> */}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Movie;
