import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import light from '@/themes/light'
import { setGlobalTheme } from '@/themes/setGlobalTheme.js'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(light)

  onMounted(() => {
    setGlobalTheme(theme.value)
  })

  return { theme }
})
