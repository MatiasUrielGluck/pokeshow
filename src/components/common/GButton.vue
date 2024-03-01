<script setup>
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { GButtonEnum } from '@/enums'
import { getIconByName } from '@/helpers'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const props = defineProps({
  text: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: GButtonEnum.primary
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

const getClassByType = () => {
  if (!Object.values(GButtonEnum).includes(props.type)) return GButtonEnum.primary
  return GButtonEnum[props.type]
}
</script>

<template>
  <button :class="`${getClassByType()}`">
    <div class="icon" v-if="icon">
      <component :is="getIconByName(icon)" />
    </div>
    <div class="text">
      {{ text }}
    </div>
  </button>
</template>

<style lang="scss" scoped>
button {
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: v-bind(padding);
  width: v-bind(width);
  border: none;
  border-radius: 24px;
  font-weight: 500;
  font-size: 18px;
  transition: all 0.3s ease;

  &.primary {
    background: v-bind('theme.button.primary.background');
    color: v-bind('theme.button.primary.text');

    &:hover {
      background: v-bind('theme.button.primary.hover');
    }
  }

  &.secondary {
    background: v-bind('theme.button.primary.background');
    color: v-bind('theme.button.primary.text');
  }

  @media (width < 768px) {
    padding: v-bind(mobilePadding);
    width: v-bind(mobileWidth);
  }

  .icon {
    height: 22px;
  }
}
</style>
