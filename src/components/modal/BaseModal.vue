<script setup>
import IconClose from '@/components/icons/IconClose.vue'
import { useThemeStore } from '@/stores/theme.js'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

defineProps({
  open: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])
</script>

<template>
  <Transition name="fade">
    <div v-if="open" class="modal" @click="$emit('close')">
      <div class="inner-container" @click.stop>
        <div class="close-icon">
          <icon-close @click="$emit('close')" />
        </div>
        <div class="custom-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.6);

  .inner-container {
    position: relative;
    width: calc(100% - v-bind('theme.padding.modal.desktop') * 2);
    height: 500px;
    background: v-bind('theme.background');
    border-radius: 8px;

    @media (width < 1000px) {
      width: calc(100% - v-bind('theme.padding.modal.mobile') * 2);
    }

    .close-icon {
      cursor: pointer;
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
