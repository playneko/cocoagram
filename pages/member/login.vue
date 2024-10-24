<template>
  <div>
    <div class="login-logo_position">
      <div class="login-logo_center login-logo_font">
        CocoaGram
      </div>
    </div>
    <div class="login-btn_position">
      <div class="login-btn_center">
        <v-btn @click="signInGoogle" size="x-large">
          <template v-slot:prepend>
            <v-avatar image="https://api.playneko.com/devneko/image/assets/image/google_g_icon.png"></v-avatar>
          </template>
          Google ログイン
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";
import { useAuth } from "../../composables/auth";

const signInGoogle = async () => {
  await useAuth().signInWithGoogle();
  console.log(useAuth().token.value);
  if (useAuth().token.value) {
    navigateTo('/');
  }
}
</script>