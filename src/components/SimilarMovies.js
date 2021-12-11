import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Movie from "../components/Movie";

const SimilarMovies = ({ similarMovies }) => {

    return (
        <div>
            <Container>
                <Row>
                    {similarMovies &&
                        similarMovies.map((movie) => (
                            <Col md={3}>
                                <Movie key={movie.id} {...movie}
                                />
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
};

export default SimilarMovies;