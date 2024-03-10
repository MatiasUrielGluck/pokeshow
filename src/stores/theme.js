import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import { setGlobalTheme } from '@/themes/setGlobalTheme.js'
import light from '@/themes/light'
import dark from '@/themes/dark.js'

const themeName = 'themeName'

const getInitialTheme = () => {
  let savedTheme = localStorage.getItem(themeName)
  if (savedTheme) return savedTheme === 'light' ? light : dark
  localStorage.setItem(themeName, 'light')
  return light
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(getInitialTheme())

  const toggleTheme = () => {
    theme.value = theme.value.name === 'light' ? dark : light
    localStorage.setItem(themeName, theme.value.name)
    setGlobalTheme(theme.value)
  }

  onMounted(() => {
    setGlobalTheme(theme.value)
  })

  return { theme, toggleTheme }
})
