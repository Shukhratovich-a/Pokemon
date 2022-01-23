// SELECT ELEMENTS
var elPokemonList = document.querySelector(".pokemons__list");
var elPokemonForm = document.querySelector(".pokemons__form");
var elPokemonInputs = document.querySelectorAll(".pokemons__input");
var elPokemonInputName = document.querySelector(".pokemons__input[name='name']");
var elPokemonInputType = document.querySelector(".pokemons__input[name='type']");
var elPokemonInputWeight = document.querySelector(".pokemons__input[name='weight']");
var elPokemonInputHeight = document.querySelector(".pokemons__input[name='height']");
var elPokemonInputUrl = document.querySelector(".pokemons__input[name='url']");

// ADD BOOTSTRAP CLASSES FOR INPUTS
function editInputs(inputs = []) {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].classList.add(
      "border",
      "border-3",
      "border-dark",
      "text-center",
      "text-black",
      "fw-bold"
    );
  }
}

// EARLY RETURN
function earlyReturn(inputs = []) {
  var summ = 0;

  // EDIT BORDER COLOR
  for (var i = 0; i < inputs.length - 1; i++) {
    if (inputs[i].value === "") {
      inputs[i].classList.remove("border-dark");
      inputs[i].classList.add("border-danger", "pokemons__input--disabled");
      summ += 1;
    } else {
      inputs[i].classList.add("border-dark");
      inputs[i].classList.remove("border-danger", "pokemons__input--disabled");
    }
  }

  // EDIT IMAGE INPUT PLACEHOLDER
  inputs[inputs.length - 1].setAttribute("placeholder", "Default image");

  return summ;
}

// RENDER POKEMONS FROM POKEMONS ARRAY
function renderPokemons(pokemonArray = [], pokemonList) {
  pokemonList.innerHTML = null;

  for (var i = 0; i < pokemons.length; i++) {
    // CREATE NEW ELEMENTS
    var pokemonItem = document.createElement("li");
    var pokemonInner = document.createElement("div");
    var pokemonPicture = document.createElement("img");
    var pokemonInfo = document.createElement("div");
    var pokemonName = document.createElement("h3");
    var pokemontype = document.createElement("p");
    var pokemonBottom = document.createElement("div");
    var pokemonWeight = document.createElement("p");
    var pokemonHeight = document.createElement("p");

    // SET ATTRIBUTES FOR NEW ELEMENTS
    pokemonItem.setAttribute("class", "pokemon px-2 col-lg-3 col-md-4 col-12 ");
    pokemonInner.setAttribute("class", "pokemon__inner pt-4 bg-white border border-3 border-dark");
    pokemonPicture.setAttribute("class", "pokemon__image mx-auto mb-5");
    // SET DEFAULT IMAGE
    if (pokemonArray[i].img === "") {
      pokemonPicture.setAttribute("src", "./images/default.png");
    } else {
      pokemonPicture.setAttribute("src", pokemonArray[i].img);
    }
    pokemonPicture.setAttribute("alt", pokemonArray[i].name + "'s image");
    pokemonPicture.setAttribute("width", "157");
    pokemonPicture.setAttribute("height", "157");
    pokemonInfo.setAttribute("class", "pokemon__info p-4 border-top border-3 border-dark");
    pokemonName.setAttribute("class", "pokemon__name mb-1 fw-bold");
    pokemontype.setAttribute("class", "pokemon__type mb-4 h5");
    pokemonBottom.setAttribute("class", "pokemon__bottom d-flex fw-bold");
    pokemonWeight.setAttribute("class", "pokemon__weight m-0 me-4");
    pokemonHeight.setAttribute("class", "pokemon__height m-0");

    // SET TEXT
    pokemonName.textContent = pokemonArray[i].name;
    pokemontype.textContent = pokemonArray[i].type.join(", ");
    pokemonWeight.textContent = pokemonArray[i].weight;
    pokemonHeight.textContent = pokemonArray[i].height;

    // APPENDING
    pokemonList.appendChild(pokemonItem);
    pokemonItem.appendChild(pokemonInner);
    pokemonInner.appendChild(pokemonPicture);
    pokemonInner.appendChild(pokemonInfo);
    pokemonInfo.appendChild(pokemonName);
    pokemonInfo.appendChild(pokemontype);
    pokemonInfo.appendChild(pokemonBottom);
    pokemonBottom.appendChild(pokemonWeight);
    pokemonBottom.appendChild(pokemonHeight);
  }
}

// FUNCTION ADD NEW POKEMONS
function addNewPokemon(_name, _type, _weight, _height, _url, pokemonArray = []) {
  // TAKE VALUES
  var newPokemonName = _name.value.trim();
  var newPokemonType = _type.value.trim();
  var newPokemonWeight = _weight.value.trim() + " kg";
  var newPokemonHeight = _height.value.trim() + " m";
  var newPokemonUrl = _url.value.trim();

  // CREATE NEW POKEMON OBJECT
  var newPokemon = {
    name: newPokemonName,
    type: newPokemonType.split(" "),
    weight: newPokemonWeight,
    height: newPokemonHeight,
    img: newPokemonUrl,
  };

  // UNSHIFT NEW OBJECT
  pokemonArray.unshift(newPokemon);
}

// RENDER NEW POKEMON
var renderNewPokemon = function (evt) {
  evt.preventDefault();

  // EARLY RETURN
  editInputs(elPokemonInputs);

  earlyReturn(elPokemonInputs);

  if (earlyReturn(elPokemonInputs)) {
    return;
  }

  // USE FUNCTION ADD NEW POKEMON
  addNewPokemon(
    elPokemonInputName,
    elPokemonInputType,
    elPokemonInputWeight,
    elPokemonInputHeight,
    elPokemonInputUrl,
    pokemons
  );

  // USE DUNCTION RENDER POKEMONS
  renderPokemons(pokemons, elPokemonList);

  // UNSET VALUES INPUTS
  elPokemonInputName.value = null;
  elPokemonInputType.value = null;
  elPokemonInputWeight.value = null;
  elPokemonInputHeight.value = null;
  elPokemonInputUrl.value = null;
  elPokemonInputUrl.setAttribute("placeholder", "Image: URL");
};

// USE DUNCTION RENDER POKEMONS
renderPokemons(pokemons, elPokemonList);

// USE FUNCTION EDIT INPUTS
editInputs(elPokemonInputs);

// LISTENING POKEMONS FORM
elPokemonForm.addEventListener("submit", renderNewPokemon);
