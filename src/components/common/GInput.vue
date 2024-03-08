<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { getIconByName } from '@/helpers'
import { GInputEnum } from '@/enums/GInputEnum'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const model = defineModel()

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: GInputEnum.text
  },
  icon: {
    type: String,
    default: null
  },
  padding: {
    type: String,
    default: '12px 16px'
  },
  mobilePadding: {
    type: String,
    default: '12px 16px'
  },
  width: {
    type: String,
    default: 'fit-content'
  },
  mobileWidth: {
    type: String,
    default: 'fit-content'
  }
})
</script>

<template>
  <div class="input-container">
    <div class="icon">
      <component :is="getIconByName(icon)" />
    </div>
    <input :type="type" :placeholder="placeholder" v-model="model" />
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  position: relative;
  width: v-bind(width);

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    /* left: 16px; */
    height: 100%;
    display: grid;
    place-items: center;
    padding: 12px 16px;
  }

  input {
    width: v-bind(width);
    border: none;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    font-size: 16px;
    font-weight: 500;
    color: v-bind('theme.input.text');

    padding: v-bind('padding');

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: v-bind('theme.input.placeholder');
      opacity: 1;
    }

    &::-ms-input-placeholder {
      color: v-bind('theme.input.placeholder');
    }
  }
}
</style>
