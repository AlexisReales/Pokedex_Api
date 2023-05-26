const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0

async function getpoke(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    
    let x = await fetch(url)
        .then((response) => { return response.json()})

    console.log(x);
    let nome = x.name
    let photo = x.sprites.front_default
    let numb = x.id
    let type = x.types
    let weight = x.weight / 2.205
    let habilidades = x.abilities

    let hb = "";

    for(let i = 0; i < x.types.length; i++){
        hb += `
        <p>${x.types}</p>
        `
    }

    alert(hb)


    document.getElementById("popup").innerHTML = `
        <div class="pokeClick" id="pokeClick">
            <p>${nome}</p>
            <span class="number">#${numb}</span>

            <div class="detail">
                <span>Peso: ${weight.toFixed(2)}Kg</span>
                <img src="${photo}" alt="${nome}">
                <span>${hb}</span>
            </div> 

            <button type="button" id="closepopup" onclick="closepopup()">
                Fechar
            </button>
        </div>
    `;

    document.getElementById("popup").style.display = "block";
}

function loadPokemonItens(offset, limit){
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="getpoke(${pokemon.number})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types"> 
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div> 
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

LoadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if(qtdRecordWithNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)    

        LoadMoreButton.parentElement.removeChild(LoadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }

    loadPokemonItens(offset, limit)
})