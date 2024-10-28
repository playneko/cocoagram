<template>
  <v-layout class="mx-auto" max-width="100%">
    <v-main v-for="(item, itemIndex) in storyList" :key="itemIndex">
      <v-card
        density="compact"
        :title="item.s_name"
        variant="text"
        :prepend-avatar="item.s_photo"
      >
        <v-img :src="item.filepath + item.filename" cover></v-img>

        <div class="home-div-flex">
          <v-btn
            :icon="item.isLike > 0 ? 'mdi-heart' : 'mdi-heart-outline'"
            :class="item.isLike > 0 ? 'home-like-font_color' : ''"
            variant="text"
          ></v-btn>
          <div>
            <v-btn icon="mdi-message-outline" variant="text" @click="commentToggle(true, item.no)"></v-btn>
            <span v-if="item.comment_cnt > 0">+{{item.comment_cnt}}</span>
          </div>
          <v-btn icon="mdi-link-variant" variant="text"></v-btn>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-bookmark-outline" variant="text"></v-btn>
        </div>

        <v-card-text>
          <div v-if="item.like_cnt > 0">
            <v-avatar
              size="20"
              class="home-avatar-right"
              v-if="item.like_cnt > 1"
            >
              <v-img :src="item.l_photo"></v-img>
            </v-avatar>
            <span
              class="home-like-font_bold"
              v-if="item.like_cnt > 1"
            >
              {{item.l_name}}
            </span>
            <span v-if="item.like_cnt > 1">他が </span>
            「いいね！」 しました
          </div>
          <div v-show="isRead !== itemIndex">
            {{stringCut(item.content)}}
            <span class="home-global-color" @click="readToggle(itemIndex)">続きを読む</span>
          </div>
          <div v-show="isRead === itemIndex">
            {{item.content}}
            <span class="home-global-color" @click="readToggle(-1)">読み返す</span>
          </div>
          <div class="home-global-color" @click="commentToggle(true, item.no)">
            コメントをすべて見る
          </div>
          <div class="home-global-color">
            <v-icon icon="mdi-clock" start></v-icon>
            {{dayjs(item.createdAt).format('YYYY年MM月DD日')}}
          </div>
        </v-card-text>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { useAsyncData, useRuntimeConfig } from "nuxt/app";
import { isEmpty, stringCut } from "~/composables/common";
import { useComment } from '~/composables/comment';
import { useAccount } from '~/composables/account';
import dayjs from 'dayjs'

const { setIsComment, setCommentIdx } = useComment();
const { account } = useAccount();
const config = useRuntimeConfig();
const isLoading = ref(false);
const isError = ref(false);
const message = ref(null);
const storyList = ref([]);
const isRead = ref(-1);

// 続きを読む
const readToggle = (index: number) => {
  isRead.value = index;
}

// コメント開く
const commentToggle = (invaild: boolean, index: number) => {
  setIsComment(invaild);
  setCommentIdx(index);
}

// ストーリィリスト取得
const getStoryList = async () => {
  const { data, pending } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaStoryList}`, {
    method: "POST",
    body: {
      uid: account.value.uid
    }
  }));

  if (!isEmpty(data.value)) {
    isLoading.value = false;
    if (!data.value.success) {
      message.value = "システムエラーが発生しました。";
      isError.value = true;
    } else {
      storyList.value = data.value.rows;
    }
  } else {
    message.value = "システムエラーが発生しました。";
    isError.value = true;
    isLoading.value = false;
  }
}
getStoryList();
</script>