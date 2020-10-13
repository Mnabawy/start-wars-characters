import React, { useState } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList'
import dummyData from './dummy-data'
import endpoint from './endpoint'
import './styles.scss';


const useFetch = url => {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    React.useEffect(() => {
        setLoading(true);
        setResponse([]);
        setError(null);

        fetch(endpoint + '/characters')
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                setResponse(response)
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            })
    }, [])
    return [response, loading, error]
}

const Application = () => {
    const [response, loading, error] = useFetch(endpoint + '/characters');
    const characters = (response && response.characters) || [];

    return (
        <diV className="Application">
            <header>
                <h1>Star wars Characters</h1>
            </header>
            <main>
                <section className="sidebar">
                    {loading ? (
                        <p> Loading </p>
                    ) : (
                            <CharacterList characters={characters} />
                        )
                    }
                    {error && <p className="error">{error.message}</p>}
                </section>
            </main>
        </diV>
    )
}

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Router>
        <Application />
    </Router>,
    rootElement
);