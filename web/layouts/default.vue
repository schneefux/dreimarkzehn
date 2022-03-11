<template>
  <div class="dark">
    <div class="flex flex-col justify-between min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {},
  setup(props, { root }) {
    const { localePath } = useContext()

    useMeta(() => {
      // https://i18n.nuxtjs.org/seo/#improving-performance
      // will also add rel=canonical without query params
      return root.$nuxtI18nHead({ addSeoAttributes: true, addDirAttribute: true })
    })

    const links = [ {
      name: 'Leaderboards',
      target: localePath('/leaderboard/hours'),
    }, {
      name: 'Guides',
      target: '/blog/guides',
    }, {
      name: 'Status',
      target: localePath('/status'),
    }, {
      name: 'Privacy',
      target: '/about',
    }]

    return {
      links,
    }
  },
})
</script>
