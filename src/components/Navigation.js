import React, { useCallback } from "react";
import { Navbar, Container, Nav, NavDropdown, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { useData } from "../DataContext";
import debounce from "lodash.debounce";
import AutoSuggest from "../components/AutoSuggest";

const Navigation = () => {

    const { loadData, getSearchRequest, setMessage, searchValue, setSearchValue, searchDebounce } = useData();

    const history = useHistory();

    const debouncedSave = useCallback(
        debounce(nextValue => searchDebounce(nextValue), 1000),
        [],
    );

    const handleChange = event => {
        const { value: nextValue } = event.target;
        setSearchValue(nextValue);
        debouncedSave(nextValue);
    };

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
                pathname: '/',
                search: '?search=' + searchValue
            })
        }
    };

    return (
        <>
            <Navbar variant="dark" className="navbar-main fixed-top" expand="lg">
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

                            <AutoSuggest
                                searchValue={searchValue}
                                handleChange={handleChange}
                                handleKeyPress={handleKeyPress}
                                setSearchValue={setSearchValue}
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