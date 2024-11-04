<template>
  <div class="upload-margin">
    <v-file-input
      v-model="files"
      label="ファイル添付"
      prepend-icon="mdi-camera"
      accept="image/png, image/jpeg, image/bmp, image/gif, image/webp, image/avif, image/heic, image/*"
    ></v-file-input>
    <div>
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
              @click="fileDelete(itemIndex)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, fileFilter } from "~/composables/common";

const files = ref([]);
const counter = ref(0);
const filesList = ref([]);

const fileDelete = (itemIndex: number) => {
  console.log(itemIndex);
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