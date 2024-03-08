<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import IconFavoriteEnabled from '../icons/IconFavoriteEnabled.vue';
import IconFavoriteDisabled from '../icons/IconFavoriteDisabled.vue';
import { capitalize } from 'vue'
import { usePokemonsStore } from '@/stores/pokemons';

// Store config
const themeStore = useThemeStore()
const pokemonsStore = usePokemonsStore()
const { theme } = storeToRefs(themeStore)
const { isFavoritePokemon, togglePokemonFavoriteStatus } = pokemonsStore

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="pokeitem-container">
    <div class="name">
      {{ capitalize(item.name) }}
    </div>
    <div class="icon" @click="togglePokemonFavoriteStatus(item)">
      <IconFavoriteEnabled v-if="isFavoritePokemon(item.name)"/>
      <IconFavoriteDisabled v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pokeitem-container {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  padding: 12px;
  height: 65px;
  border-radius: 8px;
  background: v-bind('theme.item.background');

  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
}
</style>
