const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
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

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   return fetch(url)
    .then((response) =>  response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons => pokemons.map(pokeApi.getPokemonDetail)))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

 

   