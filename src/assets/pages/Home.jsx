import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function Home() {

    const [pokemon, setPokemon] = useState()

    axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
        .then((response) => setPokemon(response.data))

    return (
        <div>
            <h1>Pokedex - Primeira Geração</h1>
            <ul>
                <li>{pokemon?.name}</li>
            </ul>
        </div>
    )
}

export default Home