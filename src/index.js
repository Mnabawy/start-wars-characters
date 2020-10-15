import React, { useEffect, useReducer } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';

import isFuntion from 'lodash/isFunction';

import CharacterList from './CharacterList'
import endpoint from './endpoint'
import './styles.scss';
import { dispatch } from 'rxjs/internal/observable/pairs';

const reducer = (state, action) => {

    if (action.type === 'FETCHING') {
        return {
            characters: [],
            loading: true,
            error: null
        }
    }

    if (action.type === 'RESPONSE_COMPLETE') {
        return {
            characters: action.payload.characters,
            loading: false,
            error: null,
        }
    }

    if (action.type === "ERROR") {
        return {
            characters: [],
            loading: false,
            error: action.payload.error,
        }
    }

    return state;
}

const fetchCharacters = (dispatch) => {

    dispatch({ type: "LOADING" })
    fetch(endpoint, '/characters')
        .then(response => response.json())
        .then(response => dispatch({
            type: 'RESPONSE_COMPLETED', payload: {
                characters: response.characters
            }
        })
        )
        .catch(error => { dispatch({ type: 'ERROR', payload: { error } }) })
}

const initialState = {
    characters: [],
    loading: false,
    error: null,
}

const useThunkReducer = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const enhancedDispatch = action => {

        if (isFuntion(action)) {
            action(dispatch)
        } else {
            dispatch(action)
        }

        dispatch(action);
    }

    return [state, dispatch]
}

const Application = () => {
    const [state, dispatch] = useThunkReducer(reducer, initialState)
    const { characters } = state;

    useEffect(() => {
        dispatch((disp) => {

        })

    }, []);

    return (
        <div className="Application">
            <header>
                <h1>Star wars Characters</h1>
            </header>
            <main>
                <section className="sidebar">
                    <button onClick={() => { }}>Fetch Characters</button>
                    <CharacterList characters={characters} />

                </section>
            </main>
        </div>
    )
}

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Router>
        <Application />
    </Router>,
    rootElement
);