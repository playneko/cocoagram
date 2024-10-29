<template>
  <v-dialog
    v-model="isComment"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card>
      <v-toolbar>
        <v-btn
          icon="mdi-close"
          @click="closeModal"
        ></v-btn>
        <v-toolbar-title>コメント</v-toolbar-title>
      </v-toolbar>
      <div class="comment-scroll">
        <div v-for="(item, itemIndex) in commentList" :key="itemIndex">
          <v-list lines="two">
            <v-list-item
              class="comment-list-title"
              :prepend-avatar="item.s_photo"
              :title="item.s_name + ' ' + datetimeDiff(item.createdAt)"
            >
              <template v-slot:subtitle>
                {{item.content}}
              </template>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <div class="comment-write">
        <v-text-field class="comment-wirte_margin">
          <template v-slot:prepend>
            <v-avatar
              size="40"
              class="home-avatar-right text-center"
              v-if="!isEmpty(avatarMe)"
            >
              <v-img :src="avatarMe"></v-img>
            </v-avatar>
          </template>
          <template v-slot:append>
            <v-btn icon="mdi-rocket" size="40" color="brown-lighten-1"></v-btn>
          </template>
        </v-text-field>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { isEmpty, datetimeDiff } from "~/composables/common";
import { useComment } from '~/composables/comment';
import { useAccount } from '~/composables/account';

const { commentNo, commentCount, isComment, setIsComment } = useComment();
const { account } = useAccount();
const config = useRuntimeConfig();
const avatarMe = ref(account.value.photoURL);
const commentList = ref([]);

// モーダルクローズ
const closeModal = () => {
  commentList.value = [];
  setIsComment(false);
}

// コメント取得
const { data, refresh } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaCommentList}`, {
  method: "POST",
  body: {
    sid: commentNo.value
  }
}),{
  watch: [commentNo, commentCount]
});

// リストを再取得した場合、データを再設定
watch(data, (commentNo: any, commentCount: any) => {
  commentList.value = [];
  if (!isEmpty(data.value)) {
    if (data.value.success) {
      commentList.value = data.value.rows;
    }
  }
});
</script>