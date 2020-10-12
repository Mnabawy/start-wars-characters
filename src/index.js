import React, { useState } from 'react'
import ReactDOM from "react-dom";

import SearchCharacters from './SearchCharacters';
import Characters from './Characters';

import './styles.scss';

const Application = () => {
    const [query, setQuery] = useState('');
    const [characters, setCharacters] = useState([]);

    const handleQueryChange = newQuery => {
        setQuery(newQuery)
    }

    return (
        <diV className="Application">
            <SearchCharacters query={query} onChange={handleQueryChange} />
            <Characters characters={characters} />

        </diV>
    )
}

const rootElement = document.getElementById('root');

ReactDOM.render(<Application />, rootElement);