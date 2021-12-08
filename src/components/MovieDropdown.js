import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

const MovieDropdown = ({ setSearchValue, loadFilterType, getMovieRequest }) => {

    const [tempSearchValue, setTempSearchValue] = useState();

    const history = useHistory();

    const handleChange = (event) => {
        setTempSearchValue(event.target.value);
    }

    const onDropdownItemClick = (pathName) => {
        loadFilterType(pathName);
    }

    const onSearchClick = () => {
        // setSearchValue(tempSearchValue);
        getMovieRequest(tempSearchValue);
        history.push({
            search: '?search=' + tempSearchValue
        })
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand role="button" onClick={() => onDropdownItemClick("popular")}>MovieDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavDropdown title="Categories" id="navbarScrollingDropdown" value="popular">
                            <NavDropdown.Item onClick={() => onDropdownItemClick("popular")}>Popular Movies</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => onDropdownItemClick("top_rated")}>Top Rated Movies</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => onDropdownItemClick("upcoming")}>Upcoming Movies</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            onChange={handleChange}
                            aria-label="Search"
                        />
                        <Button onClick={onSearchClick} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MovieDropdown;