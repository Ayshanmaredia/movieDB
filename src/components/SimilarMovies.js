import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Movie from "../components/Movie";
import ThemeButton from "../components/ThemeButton";

const SimilarMovies = ({ similarMovies, show, showMoreMovies }) => {

    return (
        <div>
            <Container>
                <h3 className="text-white">Similar Movies</h3>
                <hr></hr>
                <Row>
                    {similarMovies &&
                        similarMovies.slice(0, show).map((movie) => (
                            <Col xs={8} sm={6} md={4} lg={3}>
                                <Movie key={movie.id} {...movie}
                                />
                            </Col>
                        ))}
                </Row>
                <div className="d-flex justify-content-center">
                    <ThemeButton
                        onClick={showMoreMovies}
                        text={show === similarMovies.length ? "Show less" : "Show all"}
                    />
                </div>
            </Container>
        </div>
    );
};

export default SimilarMovies;