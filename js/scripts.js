let pokemonRepository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	// let modalContainer = document.querySelector('#modal');

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	//returns list of pokemon and characteristics
	function getAll() {
		return pokemonList;
	}

	//add pokes to list, creates button for each poke
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.list-group-horizontal');
		let listItem = document.createElement('li');
		listItem.classList.add('group-list-item');
		let buttonItem = document.createElement('button');
		buttonItem.classList.add('pokemonButton');
		buttonItem.innerText = pokemon.name;
		buttonItem.setAttribute('data-toggle', 'modal');
		buttonItem.setAttribute('data-target', '#pokemon-modal');
		$(buttonItem).addClass( 'button-class', 'btn-block', 'btn', 'm1' );
		buttonItem.classList.add('button-class');
		listItem.appendChild(buttonItem);
		pokemonList.appendChild(listItem);
		buttonItem.addEventListener('click', function() {
			showDetails(pokemon);
		});
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			showModal(pokemon);
			console.log(pokemon);
		});
	}

	//fetches list from api
	function loadList() {
		return fetch(apiUrl)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				json.results.forEach(function(item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function(e) {
				console.error(e);
			});
	}

	//loads pokemon details
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function(response) {
				return response.json();
			})
			.then(function(details) {
				// now we add the details to the listItem
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.weight = details.weight;
				item.types = details.types.map(type => type.type.name).join(', ');
				item.abilities = details.abilities.map(ability => ability.ability.name).join(', ');
			})
			.catch(function(e) {
				console.error(e);
			});
	}

	function showModal(pokemon) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');

		modalTitle.empty();
		modalBody.empty();

		let nameElement = $('<h3>' + pokemon.name + '</h3>');
		let imageElement = $('<img class="pokemon-img">');
		imageElement.attr('src', pokemon.imageUrl);
		let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
		let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
		let typeElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
		let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

		modalTitle.append(nameElement);
		modalBody.append(imageElement);
		modalBody.append(heightElement);
		modalBody.append(weightElement);
		modalBody.append(typeElement);
		modalBody.append(abilitiesElement);
	}

	const search = document.getElementById('search');
	search.addEventListener('input', searchList);

	function searchList() {
		let searchInput = document.getElementById('search').value;
		searchInput = searchInput.toLowerCase();
		const listItems = $('button');
		listItems.each(function() {
			const item = $(this);
			const name = item.text();
			if (name.includes(searchInput)) {
				item.show();
			} else {
				item.hide();
			}
		});
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};
})();

pokemonRepository.loadList().then(function() {
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
