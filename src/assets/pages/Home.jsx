import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect,useRef} from 'react'
import api from "../scripts/poke-api";
import Pokemon from '../scripts/pokemons-model';

function Home() {
    
   
    const [pokemons, setPokemons] = useState([])
    
    const getPokemons = () => {
            api
            .get()
            .then((response) => response.data)
            .then((jsonBody) => jsonBody.results)
            .then((results) => results.map((link) => link.url))
            .then((urls) => urls.map((url) => getLinksPokemons(url)))
    }
    
    const getListPokemons = (pokeDetail) => {
        const pokemon = new Pokemon()

        pokemon.name = pokeDetail.name

        pokemons.push(pokemon)
        
        return setPokemons([...pokemons])
    } 

const getLinksPokemons = (url) => {
    axios.get(url)
    .then((pokemons) => pokemons.data)
    .then(getListPokemons)
} 

console.log(pokemons)

useEffect(() => {
    let limit = 5
    if (pokemons.length < limit) {
        getPokemons()
    }
    
}, [])


    return (
        <div>
            <h1>Pokedex - Primeira Geração</h1>
            <ul>
         {pokemons.map((pokemon, i) => (
             <li key={i}>{pokemon.name}</li>
         ))}
        
            </ul>
        </div>
    )
}

export default Home