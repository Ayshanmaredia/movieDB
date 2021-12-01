import React from 'react';
import { Dropdown, Form, FormControl, Button } from "react-bootstrap";

const MovieDropdown = ({ setFilterType }) => {

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Movie Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterType("popular")}>Popular Movies</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType("top_rated")}>Top Rated Movies</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType("upcoming")}>Upcoming Movies</Dropdown.Item>
            </Dropdown.Menu>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Dropdown>
    );
};

export default MovieDropdown;