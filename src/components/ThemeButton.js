import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThemeButton = ({ onClick, text, disable, iconType }) => {
    return (
        <button
            className={`${disable ? "button-disable" : "theme-button"}`}
            onClick={onClick}
            disabled={disable}
            type="button">
            {iconType &&
                <span className="theme-button-wrapper"><FontAwesomeIcon icon={iconType} /></span>}
            {text}
        </button>
    );
};

export default ThemeButton;