<script setup>
import PokeItem from './PokeItem.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import PokeModal from '@/components/modal/PokeModal.vue'
import GButtonVue from '@/components/common/GButton.vue'
import router from '@/router/index.js'
import { useThemeStore } from '@/stores/theme.js'
import { storeToRefs } from 'pinia'
import { usePokemonsStore } from '@/stores/pokemons.js'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const pokemonsStore = usePokemonsStore()
const { pokemons } = storeToRefs(pokemonsStore)

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['clear-query'])

const listToRender = ref([])
const scrollView = ref(null)
const showModal = ref(false)
const selectedPokemonName = ref('')

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

const selectPokemon = (pokemon) => {
  selectedPokemonName.value = pokemon.name
  showModal.value = true
}

const handleEmptyList = () => {
  if (!props.items.length) {
    if (router.currentRoute.value.name === 'all') {
      emit('clear-query')
      return
    }
    router.push('/all')
  }
}

const handleQuery = (query) => {
  if (!query || !query.name) return
  if (!pokemons.value.find(pokemon => pokemon.name === query.name)) return
  selectPokemon({ name: query.name })
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
  handleQuery(router.currentRoute.value.query)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <poke-modal :open="showModal" :pokename="selectedPokemonName" @close="showModal = false" />
  <div class="empty-list" v-if="!items.length">
    <h1>Uh-oh!</h1>
    <p>You look lost on your journey!</p>
    <GButtonVue
      text="Go back home"
      type="primary"
      padding="12px 16px"
      @click="handleEmptyList"
    />
  </div>
  <div ref="scrollView">
    <TransitionGroup name="list" tag="div" class="pokelist-container">
      <PokeItem v-for="item in listToRender" :key="item" :item="item" @select="selectPokemon" />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.empty-list {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 28px;
    color: v-bind('theme.text.h1');
  }

  p {
    margin-bottom: 12px;
    color: v-bind('theme.text.p');
  }
}

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
