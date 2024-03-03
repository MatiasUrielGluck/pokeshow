<script setup>
import { useThemeStore } from '@/stores/theme'
import { usePokemonsStore } from '@/stores/pokemons'
import { storeToRefs } from 'pinia'
import BottomBar from '@/components/common/BottomBar.vue';
import GInput from '@/components/common/GInput.vue';

const themeStore = useThemeStore()
const pokemonsStore = usePokemonsStore()
const { theme } = storeToRefs(themeStore)
const { pokemons } = storeToRefs(pokemonsStore)
</script>

<template>
  <div class="poke-container">
    <GInput placeholder="Search" icon="search" padding="16px 48px" width="100%"/>
    <!-- PokeList -->
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

  h1 {
    margin-top: 48px;
    font-weight: 500;
    font-size: 28px;
    color: v-bind('theme.text.h1');
  }
}
</style>
