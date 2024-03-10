<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<template>
  <div class="theme-switcher" @click="toggleTheme">
    <IconSun v-if="theme.name === 'dark'" />
    <IconMoon v-else />
  </div>
</template>

<style scoped lang="scss">
.theme-switcher {
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 900;

  height: 40px;
  width: 40px;
  background: #1F4287;

  border-radius: 50%;
  display: grid;
  place-items: center;
}
</style>