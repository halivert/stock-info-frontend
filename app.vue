<template>
  <div class="is-fullheight main" v-cloak>
    <Navbar />
    <NuxtPage />
  </div>
</template>

<style>
[v-cloak] {
  display: none !important;
}

body,
#__nuxt,
.is-fullheight {
  height: 100vh;
}

.main {
  display: flex;
  flex-direction: column;
}
</style>
