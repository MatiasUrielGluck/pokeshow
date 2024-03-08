<script setup>
import PokeItem from './PokeItem.vue'

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
