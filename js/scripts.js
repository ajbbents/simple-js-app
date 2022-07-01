//start 1.2 task
let pokemonList = [
  {name: 'Hypno', type: 'psychic', height: 1.6},
  {name: 'Jigglypuff', type: ['fairy', 'normal'], height: 0.5},
  {name: 'Liepard', type: 'dark', height: 1.1},
  {name: 'Muk', type: 'poison', height: 1.2},
  {name: 'Palkia', type: ['dragon', 'water'], height: 4.2},
  {name: 'Rattata', type: ['normal', 'dark'], height: 0.3}
];

//wanting my list to appear with each iteration on a new line, but...
for (let i=0; i<pokemonList.length; i++){
  if (pokemonList[i].name != 0 && pokemonList[i].height < 3){ //iterates out all items smaller than height 3
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
} else if (pokemonList[i].name !=0 && pokemonList[i].height > 3){ //iterates out all items larger than height 3
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - what a big one! ");
}
}

/*for (let i=0; i<pokemonList.length; i++){
  if (pokemonList[i].name != 0 && pokemonList[i].height < 0.4){
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
} else if (pokemonList[i].name !=0 && pokemonList[i].height < 1){
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
} else if (pokemonList[i].name !=0 && pokemonList[i].height < 1.2){
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
} else if (pokemonList[i].name !=0 && pokemonList[i].height < 1.5){
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
} else if (pokemonList[i].name !=0 && pokemonList[i].height < 2){
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
} else if (pokemonList[i].name !=0 && pokemonList[i].height > 3){
  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - what a big one! ");
}
}*/
//Trying to see if I could get the loop to iterate each item on its own line/space. No dice.
