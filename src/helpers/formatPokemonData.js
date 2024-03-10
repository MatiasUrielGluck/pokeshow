export const formatPokemonData = (pokeData) => {
  let result = 'Hey! Check out this pokemon...\n\n'
  for (const key of Object.keys(pokeData)) {
    result += `${key}: ${pokeData[key]}\n`
  }
  result = result.slice(0, result.length - 1)
  result += '\n\nhttps://pokeshow-matiasurielgluck.netlify.app'
  return result
}
