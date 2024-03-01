import { ref } from 'vue'
import { defineStore } from 'pinia'

import light from '@/themes/light'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(light)

  return { theme }
})
