<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import PokeItem from './PokeItem.vue';

// Store config
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="pokelist-container">
    <PokeItem v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<style lang="scss" scoped>
.pokelist-container {
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
}
</style>
