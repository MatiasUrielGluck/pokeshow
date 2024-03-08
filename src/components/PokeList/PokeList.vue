<script setup>
import PokeItem from './PokeItem.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const listToRender = ref([])
const scrollView = ref(null)

const loadMoreItems = (clear = false) => {
  if (clear) listToRender.value = []
  listToRender.value.push(...props.items.slice(listToRender.value.length, listToRender.value.length + 30))
}

const handleScroll = () => {
  let element = scrollView.value
  if (element.getBoundingClientRect().bottom < window.innerHeight + 200) loadMoreItems()
}

watch(() => props.items, () => {
  loadMoreItems(true)
})

onMounted(() => {
  // window.addEventListener()
  loadMoreItems(true)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="pokelist-container" ref="scrollView">
    <PokeItem v-for="(item, index) in listToRender" :key="index" :item="item" />
  </div>
</template>

<style lang="scss" scoped>
.pokelist-container {
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
}
</style>
