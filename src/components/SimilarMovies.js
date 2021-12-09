import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Movie from "../components/Movie";

const SimilarMovies = () => {

    const [similarMovies, setSimilarMovies] = useState();

    const search = useLocation().search;

    useEffect(() => {
        const id = new URLSearchParams(search).get('id');
        getSimilarMovies(id);
    }, [])

    const getSimilarMovies = (id) => {
        fetch("https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=" + process.env.REACT_APP_API_KEY + "&language=en-US&page=1")
            .then((res) => res.json())
            .then((data) => {
                setSimilarMovies(data.results);
            })
    }

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