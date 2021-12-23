import React from 'react';
import { FormControl } from "react-bootstrap";
import { useData } from '../DataContext';
import { useHistory } from "react-router-dom";

const AutoSuggest = ({ searchValue, handleChange, handleKeyPress, setSearchValue }) => {

    const history = useHistory();

    const { autoSuggestResults } = useData();

    const onListItemClick = (e) => {
        history.push({
            pathname: "/movieDetails",
            search: '?id=' + e.target.value
        });
        setSearchValue(autoSuggestResults.find((result) => result.id === e.target.value).title)
    }

    return (
        <div className="autosuggest-container me-2">
            <FormControl
                type="search"
                value={searchValue}
                placeholder="Search"
                className="search-box"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                aria-label="Search"
            />
            {autoSuggestResults &&
                <div className="autosuggest-wrapper primary-color">
                    <ul className="autosuggest-list">
                        {autoSuggestResults.slice(0, 10).map((data) =>
                            <li value={data.id} title={data.title} className="truncate" onMouseDown={onListItemClick}>
                                {data.title}
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
};

export default AutoSuggest;