<script setup>
import { useThemeStore } from '@/stores/theme.js'
import { usePokemonsStore } from '@/stores/pokemons'
import { storeToRefs } from 'pinia'
import BaseModal from '@/components/modal/BaseModal.vue'
import { onMounted, onUpdated, ref } from 'vue'
import { getPokemonByName } from '@/services/pokemonsService.js'
import { mapPokemonAttrs } from '@/helpers/mapPokemonAttrs.js'
import { formatPokemonData } from '@/helpers/formatPokemonData.js'
import GButton from '@/components/common/GButton.vue'
import ShareButton from '@/components/common/ShareButton.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const pokemonsStore = usePokemonsStore()
const { isFavoritePokemon, togglePokemonFavoriteStatus } = pokemonsStore

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  pokename: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const pokemon = ref(null)
const mappedAttrs = ref({})
const dataToCopy = ref('')

onUpdated(async () => {
  if (!props.open) return
  try {
    const res = await getPokemonByName(props.pokename)
    let mappedData = mapPokemonAttrs(res)
    mappedAttrs.value = mappedData
    dataToCopy.value = formatPokemonData(mappedData)
  } catch (e) {
    console.error(e)
    emit('close')
  }
})
</script>

<template>
  <base-modal :open="open" @close="$emit('close')">
    <div class="content-container">
      <div class="image-container">
        <img src="@/assets/images/landscape.png" alt="pokemon landscape" />
      </div>

      <ul class="info-container">
        <li class="info-item" v-for="key in Object.keys(mappedAttrs)" :key="key">
          <p>
            <span>{{ key }}:</span> {{ mappedAttrs[key] }}
          </p>
        </li>
      </ul>

      <div class="actions-container">
        <div class="share-btn">
          <share-button
            share-text="Share with friends"
            clicked-text="Copied!"
            :data="dataToCopy"
            width="225px"
            mobile-width="225px"
          />
        </div>
        <div class="fav-icon-modal" @click="togglePokemonFavoriteStatus({ name: pokename })">
          <IconFavorite :is-enabled="isFavoritePokemon(pokename)" />
        </div>
      </div>
    </div>
  </base-modal>
</template>

<style scoped lang="scss">
.content-container {
  .image-container {
    height: 220px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;

      -webkit-border-top-left-radius: 8px;
      -webkit-border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  .info-container {
    list-style-type: none;

    .info-item {
      padding: 10px 0;
      margin: 0 30px;
      color: v-bind('theme.text.p');
      font-size: 17px;
      border-bottom: 1px solid v-bind('theme.border');

      span {
        font-weight: 700;
      }
    }
  }

  .actions-container {
    position: absolute;
    padding: 0 v-bind('theme.padding.modal.mobile');
    bottom: v-bind('theme.padding.modal.mobile');
    width: 100%;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    .fav-icon-modal {
      cursor: pointer;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      background: v-bind('theme.item.icon.background');
    }
  }
}
</style>
