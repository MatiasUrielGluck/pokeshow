<script setup>
import { useThemeStore } from '@/stores/theme'
import { usePokemonsStore } from '@/stores/pokemons'
import { storeToRefs } from 'pinia'
import BottomBar from '@/components/common/BottomBar.vue';

const themeStore = useThemeStore()
const pokemonsStore = usePokemonsStore()
const { theme } = storeToRefs(themeStore)
const { pokemons } = storeToRefs(pokemonsStore)
</script>

<template>
  <div class="container">
    <input type="text" placeholder="Search">
    <!-- PokeList -->
    <BottomBar />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: v-bind('theme.padding.body.desktop');

  @media (width < 768px) {
    padding: v-bind('theme.padding.body.mobile');
  }

  h1 {
    margin-top: 48px;
    font-weight: 500;
    font-size: 28px;
    color: v-bind('theme.text.h1');
  }
}
</style>
