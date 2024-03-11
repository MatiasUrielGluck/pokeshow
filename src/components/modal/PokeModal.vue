<script setup>
import { useThemeStore } from '@/stores/theme.js'
import { usePokemonsStore } from '@/stores/pokemons'
import { storeToRefs } from 'pinia'
import BaseModal from '@/components/modal/BaseModal.vue'
import { onUpdated, ref } from 'vue'
import { getPokemonByName } from '@/services/pokemonsService.js'
import { mapPokemonAttrs } from '@/helpers/mapPokemonAttrs.js'
import { formatPokemonData } from '@/helpers/formatPokemonData.js'
import ShareButton from '@/components/common/ShareButton.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import LoadingComponent from '@/components/common/LoadingComponent.vue'

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

const mappedAttrs = ref({})
const dataToCopy = ref('')
const isLoading = ref(true)
const pokeImage = ref(true)

onUpdated(async () => {
  if (!props.open) return
  try {
    isLoading.value = true
    const res = await getPokemonByName(props.pokename)

    pokeImage.value = res.sprites.front_default
    let image = new Image()
    image.src = res.sprites.front_default

    let mappedData = mapPokemonAttrs(res)
    mappedAttrs.value = mappedData
    dataToCopy.value = formatPokemonData(mappedData)
  } catch (e) {
    console.error(e)
    emit('close')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <base-modal :open="open" @close="$emit('close')">
    <div class="modal-loading" v-if="isLoading">
      <LoadingComponent />
    </div>

    <div class="content-container" v-else>
      <div class="image-container">
        <div class="landscape">
          <img src="@/assets/images/landscape.png" alt="pokemon landscape" />
        </div>
        <div class="poke-image">
          <img :src="pokeImage" alt="pokemon image" />
        </div>
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
.modal-loading {
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
}

.content-container {
  .image-container {
    height: 220px;

    .landscape img {
      object-fit: cover;
      width: 100%;
      height: 220px;

      -webkit-border-top-left-radius: 8px;
      -webkit-border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .poke-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 220px;
      display: grid;
      place-items: center;

      img {
        position: absolute;
        bottom: 0;
        width: 160px;
      }
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
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      background: v-bind('theme.item.icon.background');
    }
  }
}
</style>
