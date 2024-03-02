<script setup>
import { usePokemonsStore } from '@/stores/pokemons'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import router from '@/router'
import { getPokemons } from '@/services/pokemonsService'
import LoadingComponent from '@/components/common/LoadingComponent.vue'

const pokemonsStore = usePokemonsStore()
const { pokemons } = storeToRefs(pokemonsStore)
const { setPokemons } = pokemonsStore

onMounted(async () => {
  console.warn('Probando')
  if (!pokemons.value.length) {
    try {
      const response = await getPokemons()
      setPokemons(response.results)
    } catch (error) {
      console.error(error)
      router.push('/tryagain')
    }
  }
})
</script>

<template>
  <div class="loading-container" v-if="!pokemons.length">
    <LoadingComponent fullscreen/>
  </div>
  <div class="container" v-else>
    <h1>Hola</h1>
  </div>
</template>

<style lang="scss" scoped></style>
