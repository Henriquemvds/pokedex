import axios from 'axios'
import { Link } from "react-router-dom";
import { useState, useEffect} from 'react'
import '../pages/Home.css'


function Home() {
    
   
const [pokemons, setPokemons] = useState([])
const [name, setName] = useState('')
const api = 'https://pokeapi.co/api/v2/pokemon'
const limitList = 151
let offsetList = 0

pokemons.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
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
    .then((pokemons) => {
        return   setPokemons((prev) => {{
            return [...prev, pokemons.data]
        }})
    })
} 

const searchPokemon = () => {
    axios.get(`${api}/${name}`).then(({ data }) => {
       setPokemons([data])
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
        value={name}
      />
      <button onClick={searchPokemon}>Buscar</button>
            <ol id="pokemonList" className="pokemons"> 
            {pokemons.map((pokemon, i) => (
             <> 
            <Link style={{textDecoration: 'none'}} to={`/DetailsPokemons/${pokemon.id}`}>
             <li id="pokemon" className={pokemon.types.map((typeSlot) =>  typeSlot.type.name).splice(0, 1)}> 
            <span className="name">{pokemon.name}</span>
            <span className="number">#{pokemon.id}</span>
            <div className="detail">
            <ol className="types">
             {pokemon.types.map((typeSlot) => <li  id='type' className={typeSlot.type.name}>{typeSlot.type.name}</li>)}
             </ol>
             <img src={pokemon.sprites.other.dream_world.front_default}/>
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