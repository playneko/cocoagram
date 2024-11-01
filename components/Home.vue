<template>
  <v-layout class="mx-auto" max-width="100%">
    <v-infinite-scroll :items="storyList" :onLoad="load" class="home-loading-center">
      <v-main v-for="(item, itemIndex) in storyList" :key="itemIndex">
        <v-card
          density="compact"
          :title="item.s_name"
          variant="text"
          :prepend-avatar="item.s_photo"
        >
          <v-img :src="item.filepath + item.filename" cover @click="pageMove(item.no)"></v-img>

          <div class="home-div-flex">
            <v-btn
              :icon="item.isLike > 0 ? 'mdi-heart' : 'mdi-heart-outline'"
              :class="item.isLike > 0 ? 'home-like-font_color' : ''"
              variant="text"
              @click="onClickLike(itemIndex, item.no)"
            ></v-btn>
            <div>
              <v-btn icon="mdi-message-outline" variant="text" @click="commentToggle(true, item.no)"></v-btn>
              <span v-if="item.comment_cnt > 0">+{{item.comment_cnt}}</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-link-variant" variant="text"></v-btn>
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
              {{datetimeDiff(item.createdAt)}}
            </div>
          </v-card-text>
        </v-card>
      </v-main>
    </v-infinite-scroll>
  </v-layout>
</template>

<script setup lang="ts">
import { isEmpty, stringCut, datetimeDiff, distinctLike } from "~/composables/common";
import { useComment } from '~/composables/comment';
import { useAccount } from '~/composables/account';

const { setIsComment, setCommentNo, setCommentCount } = useComment();
const { account } = useAccount();
const config = useRuntimeConfig();
const storyList = ref([]);
const isRead = ref(-1);
const pagenum = ref(0);
const listTotal = ref(0);

// 続きを読む
const readToggle = (index: number) => {
  isRead.value = index;
}

// コメント開く
const commentToggle = (invaild: boolean, index: number) => {
  setIsComment(invaild);
  setCommentNo(index);
  setCommentCount();
}

// いいね処理
const onClickLike = async (idx: number, sid: number) => {
  if (distinctLike(storyList.value, sid) > 0) {
    const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaLikeUp}`, {
      method: "POST",
      body: {
        sid: sid,
        uid: account.value.uid
      }
    }));
    if (!isEmpty(data.value)) {
      if (data.value.success) {
        storyList.value[idx].isLike = 1;
      }
    }
  }
}

const pageMove = async (sid: number) => {
  await navigateTo(`/detail/${sid}`);
}

// ストーリィリスト取得
const load = async ({ done }: any) => {
  if (listTotal.value >= pagenum.value) {
    // ページは５件ずつ増やす
    pagenum.value = pagenum.value + 5;
    const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaStoryList}`, {
      method: "POST",
      body: {
        uid: account.value.uid,
        pagenum: pagenum.value
      }
    }));
    if (!isEmpty(data.value)) {
      if (data.value.success && !isEmpty(data.value.rows)) {
        listTotal.value = data.value.total;
        storyList.value.push(...data.value.rows);
      }
    }
  }
  done('ok');
}
</script>