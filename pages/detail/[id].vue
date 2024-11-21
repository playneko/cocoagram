<template>
  <div class="detail-overflow">
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
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar :image="detailInfo.photoUrl"></v-avatar>
          </template>
          <v-list-item-title>{{datetimeDiff(detailInfo.createAt)}}</v-list-item-title>
          <v-list-item-subtitle>{{detailInfo.name}}</v-list-item-subtitle>
        </v-list-item>
      </v-card-actions>
      <v-card-text class="py-2">
        {{detailInfo.content}}
      </v-card-text>
    </div>
    <div class="detail-comment">
      <div class="text-center">
        <v-btn
          size="large"
          color="brown-lighten-1"
          prepend-icon="mdi-message-outline"
          @click="commentToggle(true, pageNo)"
        >
          <template v-slot:prepend>
            <v-icon color="white"></v-icon>
          </template>
            コメント
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, datetimeDiff } from "~/composables/common";
import { useComment } from '~/composables/comment';

const { setIsComment, setCommentNo, setCommentCount } = useComment();
const route = useRoute();
const config = useRuntimeConfig();
const pageNo = ref(Number(route.params.id));
const detailList = ref([]);
const detailInfo = ref({
  no: null,
  content: null,
  photoUrl: null,
  name: null,
  createAt: null
});

// パラメタがない場合、TOP画面へ
if (isEmpty(route.params.id)) {
  await navigateTo('/');
}

// コメント開く
const commentToggle = (invaild: boolean, index: number) => {
  setCommentCount();
  setIsComment(invaild);
  setCommentNo(index);
}

// 詳細内容取得
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