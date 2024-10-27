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
import { navigateTo, useAsyncData, useCookie, useRuntimeConfig } from "nuxt/app";
import { useAuth } from "../../composables/auth";

const config = useRuntimeConfig();
const authUserInfo = useCookie<object | null>('authUserInfo');

// Googleログイン
const signInGoogle = async () => {
  await useAuth().signInWithGoogle();
  if (useAuth().token.value) {
    authUserInfo.value = useAuth().token.value;
    // await sendSignInAuth(userInfo);
    await navigateTo('/');
  }
}

// 認証番号サーバに転送
const sendSignInAuth = async (userInfo) => {
  const { data, pending } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaSignInAuth}`, {
    method: "POST",
    body: {
      token: userInfo.value.token,
      uid: userInfo.value.uid,
      email: userInfo.value.email,
      photoURL: userInfo.value.photoURL,
      phoneNumber: userInfo.value.phoneNumber,
      displayName: userInfo.value.displayName,
      emailVerified: userInfo.value.emailVerified ? 1 : 0
    }
  }));
}
</script>