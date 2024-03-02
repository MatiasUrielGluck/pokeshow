import pokemonsApi from '@/api/pokemonsApi'

export const getPokemons = async () => {
  const response = await pokemonsApi.get('pokemon?limit=100000&offset=0')
  return response.data
}
