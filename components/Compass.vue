<template>
  <v-layout class="mx-auto compass-margin-top_15" max-width="100%">
    <v-main>
      <v-container fluid class="compass-container_npd">
        <v-row dense>
          <v-col
            v-for="n in 8"
            :key="n"
            cols="4"
            class="compass-col_npd"
          >
            <v-sheet
              color="grey-lighten-2"
              class="compass-radius"
            >
              <v-img src="https://api.playneko.com/devneko/image/get/2024/10/27/000/001.jpg" cover @click="pageMove(2)"></v-img>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
const pageMove = async (did: number) => {
  await navigateTo(`/detail/image/${did}`);
}
</script>