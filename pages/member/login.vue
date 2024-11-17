<template>
  <div>
    <div class="login-alert_position">
      <v-alert
        v-if="isError"
        density="compact"
        :text="message"
        title="エラー"
        type="error"
        class="login-alert_message"
      ></v-alert>
    </div>
    <div class="login-logo_position">
      <div class="login-logo_center login-logo_font">
        CocoaGram
      </div>
    </div>
    <div class="login-btn_position">
      <div class="login-btn_center">
        <v-btn @click="signInGoogle" size="x-large" :loading="isLoading">
          <template v-slot:prepend>
            <v-avatar image="https://api.playneko.com/file/cocoa/image/assets/image/google_g_icon.png"></v-avatar>
          </template>
          Google ログイン
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/auth";

let authUserInfo: any = useCookie<object | null>('authUserInfo');
const config = useRuntimeConfig();
const isLoading = ref(false);
const isError = ref(false);
const message: any = ref(null);

// Googleログイン
const signInGoogle = async () => {
  message.value = null;
  isError.value = false;
  isLoading.value = true;
  await useAuth().signInWithGoogle();
  if (useAuth().token.value) {
    await sendSignInAuth(useAuth().userInfo);
  }
}

// 認証番号サーバに転送
const sendSignInAuth = async (userInfo: { value: { token: any; uid: any; email: any; photoURL: any; phoneNumber: any; displayName: any; emailVerified: any; }; }) => {
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

  if (!isEmpty(data.value)) {
    isLoading.value = false;
    if (!data.value.success) {
      message.value = "システムエラーが発生しました。";
      isError.value = true;
    } else {
      authUserInfo.value = {
        token: userInfo.value.token,
        permission: data.value.permission
      };
      return await navigateTo('/', { replace: true });
    }
  } else {
    message.value = "システムエラーが発生しました。";
    isError.value = true;
    isLoading.value = false;
  }
}
</script>