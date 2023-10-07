import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import Pokemon from '../scripts/pokemon-model';

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
        <section id="content" className="content">
            <h1>Detalhes</h1>
            <Link to="/">Home</Link>
            {pokemon.map((pokemon, i) => (
                <>
               <h1>{pokemon.name}</h1>
               <span>#{pokemon.number}</span>
               <ol>
               {pokemon.types.map((type) => <li class="type ${type}">{type}</li>)}
               </ol>
               <img src={pokemon.image}/>
               {pokemon.stats.map((stat) => <li class="stat">{stat}</li>)}
               {pokemon.power.map((base_stat) => <li class="power">{base_stat}</li>)}
                </>
            ))
        }
    </section>
    )
}

export default DetailsPokemons;