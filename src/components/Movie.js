import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const img_url = "https://image.tmdb.org/t/p/w500";

const Movie = ({ id, poster_path, title, vote_average }) => {

  return (
    <Link className="nav-link text-dark nav-link-wrapper" to={`/movieDetails?id=${id}`}>
      <Card className="card-main">
        {poster_path ?
          <Card.Img className="cover-image" variant="top" src={img_url + poster_path} />
          :
          <div className="moviePosterParent">
            <div className="moviePoster">
              <FontAwesomeIcon icon="file-image" />
            </div>
          </div>
        }
        <Card.Body className="card-body-wrapper" style={{textAlign:"left"}}>
          <Card.Title className="truncate text-left">{title}</Card.Title>
          <Card.Text>Rating: {vote_average.toFixed(1)}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Movie;