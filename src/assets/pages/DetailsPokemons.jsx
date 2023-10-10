import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import iconBack from '../images/cc7f765ef44e613b06767db205f83e42.png'
import '../pages/DetailsPokemons.css'

function DetailsPokemons() {
    const [pokemon, setPokemon] = useState([])

    let {number} = useParams()

    const getPokemon = () => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then((pokemon) => {return setPokemon((prev) => {{
            return [...prev, pokemon.data]
        }})
    })
}

    console.log(pokemon)

    useEffect(() => {
        if(pokemon.length < 1){
            getPokemon()
        }
     }, [] )

    return (
<section id="contentDetails" className="contentDetails">
    <div className='align'>
    <Link style={{textDecoration: 'none'}} to="/">
            <img src={iconBack} className='iconBack'></img>
        Voltar
    </Link>
    </div>

    {pokemon.map((pokemon, i) => (
                <>
                 <ol id="pokemonDetails" className="pokemonDetails"> 
                <li id="thePokemonSelected" className={pokemon.types.map((typeSlot) =>  typeSlot.type.name).splice(0, 1)}>
               <h1 className="name">{pokemon.name}</h1>
               <span className="number">#{pokemon.id}</span>
               <div className="detail">
                <ol className="types">
                {pokemon.types.map((typeSlot) => <li  id='type' className={typeSlot.type.name}>{typeSlot.type.name}</li>)}
               </ol>
               </div>
               <img src={pokemon.sprites.other.dream_world.front_default}/>
            </li>
            
  <li className="tributesPokemon">
  <div className="powers">
  <ol className="powerDetails">
  <div className="nameStat">
               {pokemon.stats.map((stats) => <li className="stat">{stats.stat.name}</li>)}
               </div>
    <div className="numberPower">
               {pokemon.stats.map((stats) => <li className="power">{stats.base_stat}</li>)}
</div>
  </ol>
  </div>
  </li>
</ol>
                </>
            ))
        }
     
    </section>
    )
}

export default DetailsPokemons;