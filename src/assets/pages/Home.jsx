import axios from 'axios'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import '../pages/Home.css'


function Home() {

  const api = 'https://pokeapi.co/api/v2/pokemon'
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState([])
  const [pokemonsByType, setPokemonsByType] = useState([])
  const [name, setName] = useState('')
  const [filter, setFilter] = useState(false)
  const limitList = 151
  const offsetList = 0
  let select = document.getElementById('StatusType')
  let value = select.options[select.selectedIndex].value

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


  const getPokemons = (offset, limit) => {
    axios.get(`${api}?offset=${offset}&limit=${limit}`)
      .then((response) => response.data)
      .then((jsonBody) => jsonBody.results)
      .then((results) => results.map((link) => link.url))
      .then((urls) => urls.map((url) => getLinksPokemons(url)))
  }


  const getLinksPokemons = (url) => {
    axios.get(url)
      .then((pokemons) => {
        return setPokemons((prev) => {
          {
            return [...prev, pokemons.data]
          }
        })
      })
  }

  const searchPokemon = () => {
    setPokemon([])
    setPokemonsByType([])

    axios.get(`${api}/${name.toLocaleLowerCase(0)}`)
      .then((response) => {
        setFilter(true)
        setPokemon([response.data])
      }, err => {
        alert('Pokemon não encontrado')
      })
  }

  const onChangeName = ({ target }) => {
    setName(target.value)
  }

  const filterTypes = () => {
    setPokemonsByType([])
    setPokemon([])

    if (value === 'all') {
      setFilter(false)
    }

    pokemons.map((pokemon, i) => {
      pokemon.types.map((typeSlot) => {
        if (typeSlot.type.name == value) {
          setFilter(true)
          setPokemonsByType((prev) => {
            {
              return [...prev, pokemon]
            }
          })
        }
      })
    }
    )
  }

  console.log(pokemons)
  console.log(pokemonsByType)

  useEffect(() => {
    if (pokemons.length < limitList) {
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

      <select id='StatusType'>
        <option value='all'>All</option>
        <option value='normal'>Normal</option>
        <option value='grass'>Grass</option>
        <option value='fire'>Fire</option>
        <option value='water'>Water</option>
        <option value='electric'>Electric</option>
        <option value='ice'>Ice</option>
        <option value='ground'>Ground</option>
        <option value='flying'>Flying</option>
        <option value='poison'>Poison</option>
        <option value='fighting'>Fighting</option>
        <option value='psychic'>Psychic</option>
        <option value='dark'>Dark</option>

      </select>

      <button onClick={filterTypes}>Filtrar</button>
      <ol id="pokemonList" className="pokemons">
        {!filter && pokemons.map((pokemon, i) => (
          <>
            <Link style={{ textDecoration: 'none' }} to={`/DetailsPokemons/${pokemon.id}`}>
              <li id="pokemon" className={pokemon.types.map((typeSlot) => typeSlot.type.name).splice(0, 1)}>
                <span className="name">{pokemon.name}</span>
                <span className="number">#{pokemon.id}</span>
                <div className="detail">
                  <ol className="types">
                    {pokemon.types.map((typeSlot) => <li id='type' className={typeSlot.type.name}>{typeSlot.type.name}</li>)}
                  </ol>
                  <img src={pokemon.sprites.other.dream_world.front_default} />
                </div>
              </li>
            </Link>

          </>
        ))}

        {filter && pokemonsByType.map((pokemon, i) => (
          <>
            <Link style={{ textDecoration: 'none' }} to={`/DetailsPokemons/${pokemon.id}`}>
              <li id="pokemon" className={pokemon.types.map((typeSlot) => typeSlot.type.name).splice(0, 1)}>
                <span className="name">{pokemon.name}</span>
                <span className="number">#{pokemon.id}</span>
                <div className="detail">
                  <ol className="types">
                    {pokemon.types.map((typeSlot) => <li id='type' className={typeSlot.type.name}>{typeSlot.type.name}</li>)}
                  </ol>
                  <img src={pokemon.sprites.other.dream_world.front_default} />
                </div>
              </li>
            </Link>

          </>
        ))}

        {filter && pokemon.map((pokemon, i) => (
          <>
            <Link style={{ textDecoration: 'none' }} to={`/DetailsPokemons/${pokemon.id}`}>
              <li id="pokemon" className={pokemon.types.map((typeSlot) => typeSlot.type.name).splice(0, 1)}>
                <span className="name">{pokemon.name}</span>
                <span className="number">#{pokemon.id}</span>
                <div className="detail">
                  <ol className="types">
                    {pokemon.types.map((typeSlot) => <li id='type' className={typeSlot.type.name}>{typeSlot.type.name}</li>)}
                  </ol>
                  <img src={pokemon.sprites.other.dream_world.front_default} />
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