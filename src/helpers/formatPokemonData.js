import router from '@/router/index.js'

export const formatPokemonData = (pokeData) => {
  console.log()
  let result = 'Hey! Check out this pokemon...\n\n'
  for (const key of Object.keys(pokeData)) {
    result += `${key}: ${pokeData[key]}\n`
  }
  result = result.slice(0, result.length - 1)
  result += `\n\n${window.location.origin}/all?name=${pokeData.Name.toLowerCase()}`
  return result
}
