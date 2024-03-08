import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonsStore = defineStore('pokemons', () => {
  const pokemons = ref([])
  const favPokemons = ref([])

  const setPokemons = (data) => {
    pokemons.value = data
  }

  const isFavoritePokemon = (name) => {
    return !!favPokemons.value.find((pokemon) => pokemon.name === name)
  }

  const togglePokemonFavoriteStatus = (pokemon) => {
    if (!favPokemons.value.find((poke) => poke.name === pokemon.name)) {
      favPokemons.value.push(pokemon)
    } else {
      favPokemons.value = favPokemons.value.filter((poke) => poke.name !== pokemon.name)
    }
  }

  return { pokemons, setPokemons, isFavoritePokemon, togglePokemonFavoriteStatus }
})
