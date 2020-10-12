import React from 'react';

const SearchCharacters = ({ query, onChange: handleChange }) => {
    return (
        <input
            onChange={handleChange}
            placeholder="Seach Here"
            type="Search"
            valye={query}
        />
    )
}

export default SearchCharacters;