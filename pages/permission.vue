<template>
  <div>
    <div class="permission-logo_position">
      <div class="permission-logo_center permission-logo_font">
        CocoaGram
      </div>
    </div>
    <div class="permission-alert_position">
      <v-alert
        class="permission-alert_message"
        border="start"
        border-color="purple"
        elevation="2"
      >許可されてないアカウントです。</v-alert>
    </div>
    <div class="permission-btn_position">
      <div class="permission-btn_center">
        <v-btn
          @click="relogin"
          prepend-icon="mdi-reload"
        >
          <template v-slot:prepend>
            <v-icon color="error"></v-icon>
          </template>
          再ログイン
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const relogin = () => {
  navigateTo('/member/login', { replace: true });
}
</script>