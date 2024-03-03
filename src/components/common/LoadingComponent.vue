<script setup>
import IconLoading from '@/components/icons/IconLoading.vue'

defineProps({
  fullscreen: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="`loading-container ${fullscreen ? 'fullscreen' : ''}`">
    <IconLoading />
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  &.fullscreen {
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
    z-index: 1000;
  }
  svg {
    animation: rotate 1s linear infinite forwards;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
