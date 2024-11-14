<template>
  <div class="profile-overflow">
    <div class="d-flex profile-margin">
      <v-avatar size="100">
        <v-img
          :src="profileInfo.photoURL"
        ></v-img>
      </v-avatar>
      <div class="profile-text">
        <div class="profile-text-style">{{ profileInfo.like_cnt }}</div>
        <div>いいね</div>
      </div>
      <div class="profile-text">
        <div class="profile-text-style">{{ profileInfo.comment_cnt }}</div>
        <div>コメント</div>
      </div>
    </div>
    <div class="profile-top profile-name">
      {{profileInfo.displayName}}
    </div>
    <div v-show="isRead !== 1" class="profile-content">
      <div v-html="stringCut(replaceNl2blank(profileInfo.content))"></div>
      <span @click="readToggle(1)">続きを読む</span>
    </div>
    <div v-show="isRead === 1" class="profile-content">
      <div v-html="replaceNl2blank(profileInfo.content)"></div>
      <span @click="readToggle(-1)">読み返す</span>
    </div>
    <div>
      <v-layout class="mx-auto" max-width="100%">
        <v-infinite-scroll :items="imageList" :onLoad="loadList" class="profile-loading-center" width="100%">
          <v-main>
            <v-container fluid class="profile-container_npd">
              <v-row dense>
                <v-col
                  v-for="(item, itemIndex) in imageList"
                  :key="itemIndex"
                  cols="4"
                  class="profile-col_npd"
                >
                  <v-sheet
                    color="grey-lighten-2"
                    class="profile-radius"
                  >
                    <v-img :src="item.filename" cover @click="pageMove(item.no)" class="profile-img-height"></v-img>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </v-infinite-scroll>
      </v-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { stringCut, replaceNl2blank } from "~/composables/common";
import { useAccount } from '~/composables/account';

const { account } = useAccount();
const config = useRuntimeConfig();
const profileInfo = ref({});
const imageList = ref([]);
const pagenum = ref(1);
const isRead = ref(-1);
const scrollFlg = ref(true);

// 続きを読む
const readToggle = (index: number) => {
  isRead.value = index;
}

// 詳細ページ移動
const pageMove = async (sid: number) => {
  await navigateTo(`/detail/${sid}`);
}

// コメント取得
const loadInfo = async () => {
  const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaProfileInfo}`, {
    method: "POST",
    body: {
      uid: account.value.uid
    }
  }));

  if (!isEmpty(data.value)) {
    if (data.value.success) {
      profileInfo.value = data.value.rows
    }
  }
}

// イメージリスト取得
const loadList = async ({ done }: any) => {
  if (scrollFlg.value) {
    // ページは５件ずつ増やす
    const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaProfileList}`, {
      method: "POST",
      body: {
        uid: account.value.uid,
        pagenum: pagenum.value
      }
    }));
    if (!isEmpty(data.value)) {
      pagenum.value = pagenum.value + 1;
      scrollFlg.value = data.value.scroll > 0 ? true : false;
      if (data.value.success && !isEmpty(data.value.rows)) {
        imageList.value.push(...data.value.rows);
      }
    }
  }
  done('ok');
}

await loadInfo();
</script>