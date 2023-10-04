import axios from 'axios'
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react'
import api from "../scripts/poke-api";
import Pokemon from '../scripts/pokemon-model';
import '../pages/Home.css'


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


const getLinksPokemons = (url) => {
    axios.get(url)
    .then((pokemons) => pokemons.data)
    .then(getListPokemons)
} 

const getListPokemons = (pokeDetail) => {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    pokemons.push(pokemon)
    
    pokemons.sort(function (a, b) {
        if (a.number > b.number) {
          return 1;
        }
        if (a.number < b.number) {
          return -1;
        }
        // a must be equal to b
        return 0;
    });
    return setPokemons([...pokemons])
} 

console.log(pokemons)

useEffect(() => {
    let limit = 5
    if (pokemons.length < limit) {
        getPokemons()
    }
    
}, [])


    return (
        <section id="content" className="content">
            <h1>Pokedex - Primeira Geração</h1>
            <Link to="/DetailsPokemons">
            <ol id="pokemonList" className="pokemons"> 

         {pokemons.map((pokemon, i) => (
             <> <li id="pokemon" className={pokemon.type}> 
            <span className="name">{pokemon.name}</span>
            <span className="number">#{pokemon.number}</span>
            <div className="detail">
            <ol className="types">
             {pokemon.types.map((type) => <li  id='type' className={type}>{type}</li>)}
             </ol>
             <img src={pokemon.image}/>
             </div>
             </li>
             
             </>
             ))}
        
        </ol>
             </Link>
    </section>
    )
}

export default Home;