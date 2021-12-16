import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ThemeButton from "../components/ThemeButton";

const MovieDropdown = ({ loadFilterType, getSearchRequest, message, setMessage }) => {

    const [tempSearchValue, setTempSearchValue] = useState();

    const history = useHistory();

    const handleChange = (event) => {
        setTempSearchValue(event.target.value);
    }

    const onDropdownItemClick = (pathName) => {
        loadFilterType(pathName);
    }

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            onSearchClick();
        }
    }

    const onSearchClick = () => {
        if (tempSearchValue) {
            setMessage("Search results for " + tempSearchValue);
            getSearchRequest(tempSearchValue);
            history.push({
                search: '?search=' + tempSearchValue
            })
        }
    };

    return (
        <>
            <Navbar className="navbar-main fixed-top"  expand="lg">
                <Container>
                    <Navbar.Brand className="primary-color" role="button" onClick={() => onDropdownItemClick("popular")}>MovieDB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavDropdown title="Categories" id="navbarScrollingDropdown" value="popular">
                                <NavDropdown.Item className="secondary-color" onClick={() => onDropdownItemClick("popular")}>Popular Movies</NavDropdown.Item>
                                <NavDropdown.Item className="secondary-color" onClick={() => onDropdownItemClick("top_rated")}>Top Rated Movies</NavDropdown.Item>
                                <NavDropdown.Item className="secondary-color" onClick={() => onDropdownItemClick("upcoming")}>Upcoming Movies</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex" onSubmit={e => e.preventDefault()}>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2 search-box"
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                aria-label="Search"
                            />
                            <ThemeButton 
                                onClick={onSearchClick}
                                text="Search"
                            />
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
};

export default MovieDropdown;