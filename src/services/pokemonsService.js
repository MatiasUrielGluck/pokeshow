import pokemonsApi from '@/api/pokemonsApi'

export const getPokemons = async () => {
  const response = await pokemonsApi.get('?limit=100000&offset=0')
  return response.data
}

export const getPokemonByName = async (name) => {
  const response = await pokemonsApi.get(`/${name}`)
  return response.data
}
