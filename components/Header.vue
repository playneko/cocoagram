<template>
  <div class="mx-auto header-fixed" width="100%">
    <v-toolbar color="surface">
      <v-btn icon="mdi-instagram" class="header-logo_font"></v-btn>
      <v-toolbar-title class="header-title_font">CocoaGram</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon="mdi-magnify" class="header-icon_font"></v-btn> -->
      <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
      <template v-slot:extension>
        <v-tabs color="primary" grow v-model="tabs">
          <v-tab :value="1">
            <v-icon icon="mdi-home" size="28"></v-icon>
          </v-tab>
          <v-tab :value="2">
            <v-icon icon="mdi-compass-outline" size="28"></v-icon>
          </v-tab>
          <v-tab :value="3">
            <v-icon icon="mdi-plus-circle-outline" size="28"></v-icon>
          </v-tab>
          <v-tab :value="4">
            <v-avatar size="28">
              <v-img :src="avatarImage"></v-img>
            </v-avatar>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
import { useAccount } from '~/composables/account';
import { useTabs } from '~/composables/tabs';
const { account } = useAccount();
const { setTabs } = useTabs();
const avatarImage = ref();
const tabs = ref();

// 選択タブをストアに設定
setTabs(tabs);
// アバタイメージを取得と設定
avatarImage.value = account.value.photoURL;
</script>