export const formatPokemonData = (pokeData) => {
  let result = ''
  for (const key of Object.keys(pokeData)) {
    result += `${key}: ${pokeData[key]}\n`
  }
  return result.slice(0, result.length - 1)
}