import React from 'react';

import Character from './Character';

const Characters = ({ characters = [] }) => {
    return (
        <section>
            {characters.map(character => (
                <Character key={character.id} character={character} />
            ))}
        </section>
    )
}

export default Characters; 