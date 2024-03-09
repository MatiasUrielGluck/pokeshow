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
  listToRender.value.push(
    ...props.items.slice(listToRender.value.length, listToRender.value.length + 30)
  )
}

const handleScroll = () => {
  let element = scrollView.value
  if (element.getBoundingClientRect().bottom < window.innerHeight + 200) loadMoreItems()
}

watch(
  () => props.items,
  () => {
    loadMoreItems(true)
  }
)

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
  <div ref="scrollView">
    <TransitionGroup name="list" tag="div" class="pokelist-container">
      <PokeItem v-for="item in listToRender" :key="item" :item="item" />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.pokelist-container {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
