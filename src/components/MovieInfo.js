import React from 'react';
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Trailer from "../components/Trailer";

const MovieInfo = ({ img_url, history, selectedMovie, selectedTrailer, modalShow, setModalShow, disable }) => {

    return (
        <Container className="my-5">
            <Button className="mb-3" onClick={() => history.goBack()} variant="secondary" size="sm">
                Go Back
            </Button>
            <Row>
                <Col md={4}>
                    {selectedMovie.poster_path ?
                        <Image className="coverImage" src={img_url + selectedMovie.poster_path} />
                        :
                        <div className="moviePosterParent">
                            <div className="moviePoster">
                                <FontAwesomeIcon icon="file-image" />
                            </div>
                        </div>
                    }

                </Col>
                <Col md={8}>
                    <p className="movieName">Movie: {selectedMovie.title}</p>
                    <p className="movieInfo">Overview: <span>{selectedMovie.overview}</span></p>
                    <p className="movieInfo">Release Date: <span>{selectedMovie.release_date}</span></p>
                    <p className="movieInfo">Rating: <span>{selectedMovie.vote_average}</span></p>
                    <Button className="btn-trailer" variant={`${disable ? "secondary" : "primary"}`} disabled={disable} onClick={() => setModalShow(true)}>
                        Watch Trailer
                    </Button>
                    <Trailer
                        modalShow={modalShow}
                        setModalShow={setModalShow}
                        trailer={selectedTrailer}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default MovieInfo;