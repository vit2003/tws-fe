import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Divider } from '@mui/material';

SearchBar.propTypes = {

};

function SearchBar({ placeholder, data }) {

    const history = useHistory();

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    const handleClickItem = (id) => {
        history.push(`/tradingPost/${id}`)
    }
    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <a className="dataItem" href={value.link} target="_blank" onClick={() => handleClickItem(value.id)}>
                                <p>{value.title} </p>
                                <Divider />
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;