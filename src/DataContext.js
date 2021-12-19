import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export const useData = () => {
    return useContext(DataContext);
}

const base_url = "https://api.themoviedb.org/3/";

export const DataProvider = ({ children }) => {

    const [message, setMessage] = useState();
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const getSearchRequest = (searchValue) => {
        setSearchValue(searchValue)
        if (searchValue) {
            fetch(base_url + `search/movie?api_key=` + process.env.REACT_APP_API_KEY + `&language=en-US&query=${searchValue}&page=1&include_adult=false`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.results.length === 0) {
                        setMessage("No results found for " + searchValue);
                        setMovies(data.results);
                    } else {
                        setMovies(data.results);
                    }
                });
        }
    }

    const loadData = (pathName, history) => {
        fetch(base_url + "movie/" + pathName + "?api_key=" + process.env.REACT_APP_API_KEY + "&language=en-US&page=1")
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
                history.push(pathName);
                setMessage("");
            });
    }

    const value = { loadData, getSearchRequest, setMessage, message, movies, searchValue, setSearchValue };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

}