import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonsStore = defineStore('pokemons', () => {
  const pokemons = ref([])

  const setPokemons = (data) => {
    pokemons.value = data
  }

  return { pokemons, setPokemons }
})
