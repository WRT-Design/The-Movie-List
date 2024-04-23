<script setup>
import { RouterView } from 'vue-router'
// import { PageLoader } from '@/components/page-loader.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)
</script>

<template>
  <main>
    <div>
      <RouterView />
    </div>
  </main>
</template>

<script>
import PageLoader from '@/components/PageLoader.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    PageLoader,
  },
  methods: {
    openModal() {

    }
  }
}
</script>

<style lang="scss">
body {
  background-color: var(--surface-0);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}
</style>
