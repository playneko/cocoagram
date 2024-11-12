<template>
  <div class="mx-auto header-fixed" width="100%">
    <v-toolbar color="surface">
      <v-btn icon="mdi-chevron-left" class="header-logo_font" @click="backPage"></v-btn>
      <v-toolbar-title class="header-title_font text-center">CocoaGram</v-toolbar-title>
      <div style="width: 64px;"></div>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
const backPage = () => {
  navigateTo('/', { replace: true });
}
</script>
