//Constantes que pegam uma parte do HTML
const pokemonList = document.getElementById('pokemonList')
const pokemonDetails = document.getElementById('pokemonDetails')
const thePokemon = document.getElementById('thePokemon')
//Constantes e variáveis para fazer alterações na lista no HTML
const limitList = 5
const limitDetails = 1
const maxRecords = 151
let offsetDetails = 0
let offsetList = 0

//Função que converte os objetos declarados em HTML na listagem principal
function convertPokemonToHtml(pokemon){

    return `
    <li id="thePokemon" class="pokemon ${pokemon.type}" onclick="detailsPokemons(${pokemon.number})">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
    <ol class="types">
    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol>
    <img src="${pokemon.image}" alt="${pokemon.name}"/>
    </div>
    </li>
    `
}

//Função que converte os objetos declarados em HTML na listagem dos detalhes de cada pokemon
function convertDetailsPokemonsToHtml(pokemon){
    return `
<li class="thePokemonSelected ${pokemon.type}">
  <h1 class="name">${pokemon.name}</h1>
  <span class="number">#${pokemon.number}</span>
  <div class="detail">
  <ol class="types">
  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
  </ol>
  </div>
  <img src="${pokemon.image}" alt="${pokemon.name}"/>
  </li>
  <li class="tributesPokemon">
  <div class="powers">
  <ol class="powerDetails">
  <div class="nameStat">
  ${pokemon.stats.map((stat) => `<li class="stat">${stat}</li>`).join('')}
  </div>
  <div class="numberPower">
  ${pokemon.power.map((base_stat) => `<li class="power">${base_stat}</li>`).join('')}
  </div>
  </ol>
  </div>
  </li>
  <div class="pagination">
  <button onclick="Back()">Back</button>
  </div>
    `
}

//Funções que carrega da API as informações dos pokemons considerando seu limitador de página 
function loadPokemonItems(offset, limit){
    //Pega todos os objetos e dá um limite de amostragem de acordo com os parâmetros
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //Separa cada informação e envia no HTML
        const newHtmlPokemons =  pokemons.map(convertPokemonToHtml).join('')
        pokemonList.innerHTML += newHtmlPokemons
    })
}
function loadDetailsPokemon(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtmlDetailsPokemons =  pokemons.map(convertDetailsPokemonsToHtml).join('')
        pokemonDetails.innerHTML = newHtmlDetailsPokemons
        
    })
}

loadPokemonItems(offsetList, limitList)

//Função que aumenta a listagem dos pokemons a cada clique até chegar no limitador total de amostragem 
function loadMoreButton (){
    offsetList += limitList
    const qtdRecords = offsetList + limitList
if (qtdRecords >= maxRecords){
    const newLimit = maxRecords - offsetList
    loadPokemonItems(offsetList, newLimit)
    
    loadMoreButton.parentElement.removeChild(loadMoreButton)
} else {
        loadPokemonItems(offsetList, limitList)
    }
}

//Função que carrega os detalhes do pokemon selecionado
function detailsPokemons (pokemon){
    document.getElementById('content').style.display = 'none'
    document.getElementById('contentDetails').style.display = 'inline'
    offsetDetails = pokemon - 1
    loadDetailsPokemon(offsetDetails, limitDetails)
}

//Função que recarrega a página
function Back(){
    location.reload()
    }
