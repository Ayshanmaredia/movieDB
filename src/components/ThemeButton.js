import React from 'react';
import { Button } from "react-bootstrap";

const ThemeButton = ({ onClick, text, disable }) => {
    return (
        <Button
            className={`${disable ? "button-disable" : "theme-button"}`}
            onClick={onClick}
            disabled={disable}
            type="button">{text}</Button>
    );
};

export default ThemeButton;