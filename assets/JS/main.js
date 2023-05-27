const pokemonList = document.getElementById('pokemonList')
const pokemonDetails = document.getElementById('pokemonDetails')
const thePokemon = document.getElementById('thePokemon')
const limitList = 5
const limitDetails = 1
const maxRecords = 151
let offsetDetails = 0
let offsetList = 0


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

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
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

document.getElementById('contentDetails').style.display = 'none'

function detailsPokemons (pokemon){
    document.getElementById('content').style.display = 'none'
    document.getElementById('contentDetails').style.display = 'inline'
    offsetDetails = pokemon - 1
    loadDetailsPokemon(offsetDetails, limitDetails)
}

function Back(){
    location.reload()
    }