import IconClose from '@/components/icons/IconClose.vue'
import IconFavoriteDisabled from '@/components/icons/IconFavoriteDisabled.vue'
import IconFavoriteEnabled from '@/components/icons/IconFavoriteEnabled.vue'
import IconFavoritesPlain from '@/components/icons/IconFavoritesPlain.vue'
import IconListAll from '@/components/icons/IconListAll.vue'
import IconLoading from '@/components/icons/IconLoading.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const iconMap = {
    "close": IconClose,
    "fav-disabled": IconFavoriteDisabled,
    "fav-enabled": IconFavoriteEnabled,
    "fav-plain": IconFavoritesPlain,
    "list-all": IconListAll,
    "loading": IconLoading,
    "search": IconSearch,
}

export const getIconByName = (name) => {
    if (!name) return null
    return iconMap[name]
}