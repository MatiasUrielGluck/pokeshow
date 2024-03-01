<script setup>
import { useThemeStore } from '@/stores/theme'
import IconWelcome from '@/components/icons/IconWelcome.vue'
import { storeToRefs } from 'pinia'
import GButtonVue from '@/components/common/GButton.vue';

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <div class="container">
    <IconWelcome />
    <h1>Welcome to Pokédex</h1>
    <p>
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.
    </p>
    <GButtonVue text="Get started" type="primary" padding="12px 16px" />
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
  padding: 24px;
  text-align: center;

  h1 {
    margin-top: 48px;
    font-weight: 500;
    font-size: 28px;
    color: v-bind('theme.text.h1');
  }

  p {
    margin: 28px 0;
    color: v-bind('theme.text.p');
    max-width: 500px;
  }
}
</style>
