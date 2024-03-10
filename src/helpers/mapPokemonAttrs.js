import { capitalize } from 'vue'

const createTypesString = (types) => {
  let typesString = ''
  types.forEach(type => {
    typesString += `${capitalize(type.type.name)}, `
  })
  return typesString.slice(0, typesString.length - 2)
}

export const mapPokemonAttrs = (pokemon) => {
  return {
    Name: capitalize(pokemon.name),
    Weight: pokemon.weight,
    Height: pokemon.height,
    Types: createTypesString(pokemon.types)
  }
}