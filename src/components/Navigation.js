import React, { useCallback } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, Row, Col, Dropdown } from "react-bootstrap";
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
        <Container fluid className="navbar-main py-2 px-5">
            <Row className="align-items-center">
                <Col md={6} className="my-1">
                    <div className="primary-color d-inline-block navbar-brand" role="button" onClick={() => onDropdownItemClick("popular")}>MovieDB</div>
                    <Nav
                        className="d-inline-block navbar-wrapper"
                        navbarScroll
                    >
                        <NavDropdown title="Categories" id="navbarScrollingDropdown" value="popular">
                            <NavDropdown.Item className="secondary-color" onClick={() => onDropdownItemClick("popular")}>Popular Movies</NavDropdown.Item>
                            <NavDropdown.Item className="secondary-color" onClick={() => onDropdownItemClick("top_rated")}>Top Rated Movies</NavDropdown.Item>
                            <NavDropdown.Item className="secondary-color" onClick={() => onDropdownItemClick("upcoming")}>Upcoming Movies</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Col>
                <Col md={6} className="my-1">
                    <div className="d-flex search-container" onSubmit={e => e.preventDefault()}>

                        <AutoSuggest
                            searchValue={searchValue}
                            handleChange={handleChange}
                            handleKeyPress={handleKeyPress}
                            setSearchValue={setSearchValue}
                        />
                        <span className="search-btn">
                            <ThemeButton
                                onClick={onSearchClick}
                                text="Search"
                                iconType="search"
                            />
                        </span>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Navigation;