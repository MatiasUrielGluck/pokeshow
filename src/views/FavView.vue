<script setup>
import { usePokemonsStore } from '@/stores/pokemons'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import router from '@/router'
import { getPokemons } from '@/services/pokemonsService'
import LoadingComponent from '@/components/common/LoadingComponent.vue'
import PokeTemplate from '@/templates/PokeTemplate.vue'

const pokemonsStore = usePokemonsStore()
const { pokemons } = storeToRefs(pokemonsStore)
const { setPokemons } = pokemonsStore

onMounted(async () => {
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
    <LoadingComponent fullscreen />
  </div>
  <div class="template-container" v-else>
    <PokeTemplate show-favorites />
  </div>
</template>

<style lang="scss" scoped></style>
