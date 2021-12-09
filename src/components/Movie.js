import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const img_url = "https://image.tmdb.org/t/p/w500";

const Movie = ({ id, poster_path, title, vote_average }) => {

  return (
    <Link className="nav-link text-dark" to={`/movieDetails?id=${id}`}>
      <Card className="my-5" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`${poster_path ? img_url + poster_path : "https://t4.ftcdn.net/jpg/02/18/21/71/240_F_218217125_YNmy7cEeS2h4eZN8KHPxVEUSxIRzVMOu.jpg"}`} />
        <Card.Body>
          <Card.Title className="truncate">{title}</Card.Title>
          <Card.Text>Rating: {vote_average.toFixed(1)}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Movie;