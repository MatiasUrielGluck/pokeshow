<script setup>
import { useThemeStore } from '@/stores/theme'
import { usePokemonsStore } from '@/stores/pokemons'
import { storeToRefs } from 'pinia'
import BottomBar from '@/components/common/BottomBar.vue'
import GInput from '@/components/common/GInput.vue'
import { computed, ref } from 'vue'
import PokeList from '@/components/PokeList/PokeList.vue'

// Store config
const themeStore = useThemeStore()
const pokemonsStore = usePokemonsStore()
const { theme } = storeToRefs(themeStore)
const { pokemons, favPokemons } = storeToRefs(pokemonsStore)

const props = defineProps({
  showFavorites: {
    type: Boolean,
    default: false
  }
})

// Refs
const searchQuery = ref('')
const scrollView = ref(null)

// Computed
const filteredPokemons = computed(() => {
  let pokeListToUse = props.showFavorites ? favPokemons : pokemons
  return pokeListToUse.value.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.value))
})
</script>

<template>
  <div class="poke-container">
    <div class="searchbar-container">
      <GInput
        placeholder="Search"
        icon="search"
        padding="16px 48px"
        width="100%"
        v-model="searchQuery"
      />
    </div>
    <div class="list-container" ref="scrollView">
      <PokeList :items="filteredPokemons" />
    </div>
    <BottomBar />
  </div>
</template>

<style lang="scss" scoped>
.poke-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: v-bind('theme.padding.body.desktop');

  @media (width < 1000px) {
    padding: v-bind('theme.padding.body.mobile');
  }

  .searchbar-container {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100px;
    background: v-bind('theme.background');
    padding: v-bind('theme.padding.bottomBar.desktop');
    padding-top: 25px;

    @media (width < 1000px) {
      padding: v-bind('theme.padding.bottomBar.mobile');
    }
  }

  h1 {
    margin-top: 48px;
    font-weight: 500;
    font-size: 28px;
    color: v-bind('theme.text.h1');
  }

  .list-container {
    width: 100%;
    margin-top: 80px;
    padding-bottom: 100px;
  }
}
</style>
