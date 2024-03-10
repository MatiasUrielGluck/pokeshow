<script setup>
import { ref } from 'vue'
import GButton from '@/components/common/GButton.vue'

const props = defineProps({
  shareText: {
    type: String,
    default: ''
  },

  clickedText: {
    type: String,
    default: ''
  },

  data: {
    type: String,
    required: true
  }
})

const initialIcon = 'share'
const clickedIcon = 'check'

const textToShow = ref(props.shareText)
const iconToShow = ref(initialIcon)

const shareData = () => {
  textToShow.value = props.clickedText
  iconToShow.value = clickedIcon
  navigator.clipboard.writeText(props.data)
  setTimeout(() => {
    textToShow.value = props.shareText
    iconToShow.value = initialIcon
  }, 3000)
}
</script>

<template>
  <g-button :text="textToShow" :icon="iconToShow" @click="shareData" />
</template>

<style scoped lang="scss"></style>
