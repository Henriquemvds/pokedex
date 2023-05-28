//Cria objetos a serem pesquisados
const pokeApi = {}

//Função que declara cada informção do pokemon em um objeto
function convertPokeApiDetailToPokemon(pokeDetail) {
    //Cria sua classe
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

//Função que transforma as informações da API para poderem ser lidas pelo Javascript e poder
//ser manipulada
pokeApi.getPokemonDetail = (pokemon) => {
    //Pega da API
    return fetch(pokemon.url)
    //Converte para ser interpretado
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
//Função que carrega todas as informações da API inclusa para carrega no Browser
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    //Pega o endereço
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   return fetch(url)
   //Converte para ser interpretado
    .then((response) =>  response.json())
    .then((jsonBody) => jsonBody.results)
    //Mapeia tudo
    .then((pokemons => pokemons.map(pokeApi.getPokemonDetail)))
    //Faz o browser carregar o solicitado
    .then((detailRequests) => Promise.all(detailRequests))
    //Envia para a maniupulaçãop
    .then((pokemonsDetails) => pokemonsDetails)
}

 

   
