<template>
  <div class="profile-overflow-modify">
    <div class="d-flex profile-margin" v-if="isError">
      <v-alert
        density="compact"
        :text="message"
        title="エラー"
        type="error"
        class="profile-alert_message"
      ></v-alert>
    </div>
    <div class="profile-margin" v-if="isSuccess">
      <v-alert
        density="compact"
        text="プロフィール修正成功"
        title="成功"
        type="success"
        class="profile-alert_message"
      ></v-alert>
    </div>
    <div class="profile-margin" v-else-if="!isSuccess">
      <div>
        <v-file-input
          v-model="files"
          label="画像"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="画像を選択してください。"
          prepend-icon="mdi-camera"
        ></v-file-input>
      </div>
      <div>
        <v-textarea
          label="プロフィル内容"
          color="brown-darken-1"
          bg-color="grey-lighten-2"
          v-model="content"
        ></v-textarea>
      </div>
      <div class="text-center">
        <v-btn
          size="large"
          variant="flat"
          color="brown-darken-1"
          prepend-icon="mdi-account-edit"
          @click="profileSave"
          :loading="isLoading"
        >
          <template v-slot:prepend>
            <v-icon color="white"></v-icon>
          </template>
          プロフィール修正
        </v-btn>
      </div>
    </div>
	</div>
</template>
  
<script setup lang="ts">
import { useAccount } from '~/composables/account';
import { isEmpty } from "~/composables/common";

const { account } = useAccount();
const config = useRuntimeConfig();
const isLoading = ref(false);
const isError = ref(false);
const isSuccess = ref(false);
const message: any = ref(null);
const files: any = ref();
const content = ref();

// プロフィール情報修正
const profileSave = async () => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append('uid', account.value.uid);
  formData.append('content', content.value);
  formData.append('files', files.value);

  const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaProfileSave}`, {
    method: "POST",
    body: formData
  }));
  if (!isEmpty(data.value)) {
    isLoading.value = false;
    isError.value = false;
    message.value = null;
    if (!data.value.success) {
      message.value = "システムエラーが発生しました。";
      isError.value = true;
    } else {
      files.value = null;
      isSuccess.value = true;
    }
  } else {
    message.value = "システムエラーが発生しました。";
    isError.value = true;
    isLoading.value = false;
  }
}

// プロフィール情報取得
const loadInfo = async () => {
  const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaProfileInfo}`, {
    method: "POST",
    body: {
      uid: account.value.uid
    }
  }));

  if (!isEmpty(data.value)) {
    if (data.value.success) {
      content.value = data.value.rows.content
    }
  }
}

await loadInfo();
</script>