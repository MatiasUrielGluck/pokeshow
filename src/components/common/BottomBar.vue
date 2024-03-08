<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import GButtonVue from '@/components/common/GButton.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>

<template>
  <div class="bottom-bar">
    <GButtonVue
      text="All"
      icon="list-all"
      type="primary"
      padding="12px 16px"
      width="275px"
      mobileWidth="40%"
      minWidth="150px"
      @click="$router.push('/all')"
    />
    <GButtonVue
      text="Favorites"
      icon="fav-plain"
      type="secondary"
      padding="12px 16px"
      width="275px"
      mobileWidth="40%"
      minWidth="150px"
      @click="$router.push('/favorites')"
    />
  </div>
</template>

<style lang="scss" scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  z-index: 10;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  background: v-bind('theme.bottomBar.background');
  box-shadow: 0 -5px 4px #0000000d;

  padding: v-bind('theme.padding.bottomBar.desktop');

  @media (width < 1000px) {
    padding: v-bind('theme.padding.bottomBar.mobile');
  }
}
</style>
