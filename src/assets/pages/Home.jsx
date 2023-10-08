import axios from 'axios'
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react'
import Pokemon from '../scripts/pokemon-model';
import '../pages/Home.css'


function Home() {
    
   
const [pokemons, setPokemons] = useState([])
const [name, setName] = useState('')
const api = 'https://pokeapi.co/api/v2/pokemon'
const limitList = 151
let offsetList = 0

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


const getPokemons =  (offset, limit) => {
    axios.get(`${api}?offset=${offset}&limit=${limit}`)
    .then((response) => response.data)
    .then((jsonBody) => jsonBody.results)
    .then((results) => results.map((link) => link.url))
    .then((urls) => urls.map((url) => getLinksPokemons(url)))
}


const getLinksPokemons = (url) => {
    axios.get(url)
    .then((pokemons) => pokemons.data)
    .then((getListPokemons))
} 

const getListPokemons = (pokeDetail) => {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return setPokemons((prev) => {{
        return [...prev, pokemon]
    }})
} 

const getPokemon = (pokeDetail) => {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)

    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return setPokemons([pokemon])
}

const searchPokemon = () => {
    axios.get(`${api}/${nome}`).then(({ data }) => {
        getPokemon(data)
      }, err => {
        alert('Pokemon não encontrado')
      })
    }
  
    const onChangeName = ({ target }) => {
      setName(target.value)
  }

console.log(pokemons)

useEffect(() => {  
 if (pokemons.length < limitList){
     getPokemons(offsetList, limitList) 
 }
}, [])


    return (
        <section id="content" className="content">
            <h1>Pokedex - Primeira Geração</h1>
            <input
        type="text"
        onChange={onChangeName}
        placeholder='Ex: Pikachu'
        value={nome}
      />
      <button onClick={searchPokemon}>Buscar</button>
            <ol id="pokemonList" className="pokemons"> 

         {pokemons.map((pokemon, i) => (
             <> 
            <Link style={{textDecoration: 'none'}} to={`/DetailsPokemons/${pokemon.number}`}>
             <li id="pokemon" className={pokemon.type}> 
            <span className="name">{pokemon.name}</span>
            <span className="number">#{pokemon.number}</span>
            <div className="detail">
            <ol className="types">
             {pokemon.types.map((type) => <li  id='type' className={type}>{type}</li>)}
             </ol>
             <img src={pokemon.image}/>
             </div>
             </li>
             </Link>
             
             </>
             ))}
             </ol>
    </section>
    )
}

export default Home;