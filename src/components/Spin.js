import React from 'react';
import { Spinner } from "react-bootstrap";

const Spin = () => {
    return (
        <div className="spinner">
            <Spinner animation="border" variant="success" />
        </div>
    );
};

export default Spin;