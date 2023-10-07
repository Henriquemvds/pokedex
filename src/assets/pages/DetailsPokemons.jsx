import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import Pokemon from '../scripts/pokemon-model';
import iconBack from '../images/cc7f765ef44e613b06767db205f83e42.png'
import '../pages/DetailsPokemons.css'

function DetailsPokemons() {
    const [pokemon, setPokemon] = useState([])

    let {number} = useParams()

    const getPokemon = () => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then((response) => getDetailsPokemon(response.data))
    }

    const getDetailsPokemon = (pokeDetail) => {
        const pokemon = new Pokemon()
    
        pokemon.number = pokeDetail.id
        pokemon.name = pokeDetail.name
        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    
        const [type] = types
    
        pokemon.types = types
        pokemon.type = type

        const stats = pokeDetail.stats.map((stats) => stats.stat.name)
        const [stat] = stats
        pokemon.stats = stats
        pokemon.stat = stat

        const power = pokeDetail.stats.map((stats) => stats.base_stat)
        const [base_stat] = power
        pokemon.power = power
        pokemon.base_stat = base_stat
    
        pokemon.image = pokeDetail.sprites.other.dream_world.front_default
    
        return setPokemon([pokemon])
    } 

    console.log(pokemon)

    useEffect(() => {
        getPokemon()

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
                <li id="thePokemonSelected" className={pokemon.type}>
               <h1 className="name">{pokemon.name}</h1>
               <span className="number">#{pokemon.number}</span>
               <div className="detail">
                <ol className="types">
               {pokemon.types.map((type) => <li id='type' className={type}>{type}</li>)}
               </ol>
               </div>
               <img src={pokemon.image}/>
            </li>
            
  <li className="tributesPokemon">
  <div className="powers">
  <ol className="powerDetails">
  <div className="nameStat">
               {pokemon.stats.map((stat) => <li className="stat">{stat}</li>)}
               </div>
    <div className="numberPower">
               {pokemon.power.map((base_stat) => <li className="power">{base_stat}</li>)}
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