<template>
  <div class="upload-margin">
    <div class="upload-alert_position" v-if="isError">
      <v-alert
        density="compact"
        :text="message"
        title="エラー"
        type="error"
        class="upload-alert_message"
      ></v-alert>
    </div>
    <v-file-input
      v-model="files"
      label="ファイル添付"
      prepend-icon="mdi-camera"
      accept="image/png, image/jpeg, image/bmp, image/gif, image/webp, image/avif, image/heic, image/*"
    ></v-file-input>
    <div v-if="!isEmpty(filesList)">
      <v-textarea
        v-model="content"
        label="内容"
        color="brown-darken-1"
        bg-color="grey-lighten-2"
      ></v-textarea>
      <v-list lines="two">
        <v-list-item
          v-for="(file, itemIndex) in filesList"
          :key="file.name"
          :subtitle="file.name"
          :title="file.type"
        >
          <template v-slot:prepend>
            <v-avatar>
              <v-icon icon="mdi-file-image"></v-icon>
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              size="x-small"
              color="brown-darken-1"
              @click="fileDelete(itemIndex)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>
    <div class="text-center" v-if="!isEmpty(filesList)">
      <v-btn
        size="x-large"
        variant="flat"
        color="brown-darken-1"
        prepend-icon="mdi-cloud-upload"
        @click="fileUpload"
        :loading="isLoading"
      >
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
        アップロード
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, fileFilter } from "~/composables/common";
import { useAccount } from '~/composables/account';

const { account } = useAccount();
const config = useRuntimeConfig();
const isLoading = ref(false);
const isError = ref(false);
const message = ref(null);
const files = ref([]);
const filesList = ref([]);
const content = ref();
const counter = ref(0);

// ファイル配列から削除
const fileDelete = (itemIndex: number) => {
  filesList.value.splice(itemIndex, 1);
}

// ファイルアップロード
const fileUpload = async () => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append('uid', account.value.uid);
  formData.append('content', content.value);
  for (var i = 0; i < filesList.value.length; i++) {
    formData.append('fileArray', filesList.value[i]);
  }

  const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaUploadImage}`, {
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
      files.value = [];
      filesList.value = [];
      content.value = null;
      counter.value = 0;
    }
  } else {
    message.value = "システムエラーが発生しました。";
    isError.value = true;
    isLoading.value = false;
  }
}

// ファイルリスト生成
watch([files, counter], (newFiles: any) => {
  if (!isEmpty(files.value.name)) {
    const getFile = newFiles[0];
    if (fileFilter(filesList.value, getFile)) {
      filesList.value.push(getFile);
    }
    files.value = [];
    counter.value++;
  }
});
</script>