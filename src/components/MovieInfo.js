import React from 'react';
import { Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Trailer from "../components/Trailer";
import ThemeButton from "../components/ThemeButton";

const MovieInfo = ({ img_url, selectedMovie, selectedTrailer, modalShow, setModalShow, disable }) => {

    return (
        <Container className="my-5">
            <Row className="mt-4">
                <Col sm={8} md={5} lg={3}>
                    {selectedMovie.poster_path ?
                        <Image className="cover-image" src={img_url + selectedMovie.poster_path} />
                        :
                        <div className="moviePosterParent">
                            <div className="moviePoster">
                                <FontAwesomeIcon icon="file-image" />
                            </div>
                        </div>
                    }

                </Col>
                <Col sm={8} md={7} lg={9} >
                    <h2 className="movieName">Movie: {selectedMovie.title}</h2>
                    <div>
                        {selectedMovie.genres.map((g) => <div className="genrePill primary-color"> {g.name} </div>)}
                    </div>
                    <p className="movieInfo">Overview: <span>{selectedMovie.overview}</span></p>
                    <p className="movieInfo">Release Date: <span>{selectedMovie.release_date}</span></p>
                    <p className="movieInfo">Rating: <span>{selectedMovie.vote_average}</span></p>
                    <div className="mt-4">
                        <ThemeButton
                            disable={disable}
                            onClick={() => setModalShow(true)}
                            text="Watch Trailer"
                            iconType="play-circle"
                        />
                    </div>
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