import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const img_url = "https://image.tmdb.org/t/p/w200"

const Cast = ({ profile_path, original_name, character }) => {
    return (
        <Container className="cast-container">
            <Row className="my-3 text-center d-inline">
                <Col>
                    {profile_path ?
                        <Image className="profile" height={96} width={96} src={img_url + profile_path} roundedCircle />
                        :
                        <div className="userIconParent">
                            <div className="userIcon">
                                <FontAwesomeIcon icon="user" />
                            </div>
                        </div>
                    }
                </Col>
                <Col className="mt-1 text-center text-white">
                    <p className="name">{original_name}</p>
                    <p className="character">{character}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Cast;