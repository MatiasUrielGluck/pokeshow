<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import GButtonVue from '@/components/common/GButton.vue'
import ThemeSwitch from '@/components/common/ThemeSwitch.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <ThemeSwitch />
  <div class="home-container">
    <h1>Uh-oh!</h1>
    <p>You look lost on your journey!</p>
    <GButtonVue
      text="Go back home"
      type="primary"
      padding="12px 16px"
      @click="$router.push('/')"
    />
  </div>
</template>

<style lang="scss" scoped>
.home-container {
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
