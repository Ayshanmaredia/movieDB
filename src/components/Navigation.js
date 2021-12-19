import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { useData } from "../DataContext";

const Navigation = () => {

    const { loadData, getSearchRequest, setMessage, searchValue, setSearchValue } = useData();

    

    const history = useHistory();

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onDropdownItemClick = (pathName) => {
        loadData(pathName, history);
    }

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            onSearchClick();
        }
    }

    const onSearchClick = () => {
        if (searchValue) {
            setMessage("Search results for " + searchValue);
            getSearchRequest(searchValue);
            history.push({
                pathname: '/popular',
                search: '?search=' + searchValue
            })
        }
    };

    return (
        <>
            <Navbar className="navbar-main fixed-top" expand="lg">
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
                                value={searchValue}
                                placeholder="Search"
                                className="me-2 search-box"
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                aria-label="Search"
                            />
                            <ThemeButton
                                onClick={onSearchClick}
                                text="Search"
                                iconType="search"
                            />
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
};

export default Navigation;