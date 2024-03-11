<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { capitalize, ref } from 'vue'
import { usePokemonsStore } from '@/stores/pokemons'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import BaseModal from '@/components/modal/BaseModal.vue'

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
  <div class="pokeitem-container" @click="$emit('select', item)">
    <div class="name">
      {{ capitalize(item.name) }}
    </div>
    <div class="icon" @click.stop="togglePokemonFavoriteStatus(item)">
      <IconFavorite :is-enabled="isFavoritePokemon(item.name)" />
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

  .name {
    color: v-bind('theme.item.text');
  }

  .icon {
    border-radius: 50%;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    background: v-bind('theme.item.icon.background');
  }
}
</style>
