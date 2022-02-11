import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Movie from "../components/Movie";
import ThemeButton from "../components/ThemeButton";

const SimilarMovies = ({ similarMovies, show, showMoreMovies }) => {

    return (
        <div>
            <Container className="mt-5">
                <h3 className="text-white">Similar Movies</h3>
                <hr></hr>
                <Row>
                    {similarMovies &&
                        similarMovies.slice(0, show).map((movie) => (
                            <Col key={movie.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Movie {...movie} />
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