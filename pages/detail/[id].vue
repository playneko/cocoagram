<template>
  <div>
    <v-carousel
      height="400"
      show-arrows="hover"
      hide-delimiter-background
    >
      <v-carousel-item
        cover
        v-for="(item, itemIndex) in detailList" :key="itemIndex"
      >
        <v-sheet height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <v-img
              :aspect-ratio="1"
              :src="item.filename"
              width="100%"
            ></v-img>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <div
      class="mx-auto"
      color="#fff"
      max-width="100%"
      v-if="!isEmpty(detailInfo.no)"
    >
      <v-card-text class="py-2">
        {{detailInfo.content}}
      </v-card-text>
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar :image="detailInfo.photoUrl"></v-avatar>
          </template>
          <v-list-item-title>{{datetimeDiff(detailInfo.createAt)}}</v-list-item-title>
          <v-list-item-subtitle>{{detailInfo.name}}</v-list-item-subtitle>
        </v-list-item>
      </v-card-actions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, datetimeDiff } from "~/composables/common";

const route = useRoute();
const config = useRuntimeConfig();
const detailList = ref([]);
const detailInfo = ref({
  no: null,
  content: null,
  photoUrl: null,
  name: null,
  createAt: null
});

const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaDetailInfo}`, {
  method: "POST",
  body: {
    sid: route.params.id
  }
}));
if (!isEmpty(data.value)) {
  if (data.value.success && !isEmpty(data.value.rows)) {
    detailList.value = data.value.rows;
    detailInfo.value = {
      no: data.value.rows[0].no,
      content: data.value.rows[0].content,
      photoUrl: data.value.rows[0].s_photo,
      name: data.value.rows[0].s_name,
      createAt: data.value.rows[0].createdAt
    };
  }
}
</script>