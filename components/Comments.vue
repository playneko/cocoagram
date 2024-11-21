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
              class="comment-list-title comment-subtitle-opacity"
              :prepend-avatar="item.s_photo"
              :title="item.s_name + ' ' + datetimeDiff(item.createdAt)"
            >
              <template v-slot:subtitle>
                <div v-if="!isEmpty(item.content)">
                  {{item.content}}
                </div>
                <div v-else-if="!isEmpty(item.emoji)">
                  <v-avatar size="80">
                    <v-img
                      :src="getImage(item.emoji)"
                    ></v-img>
                  </v-avatar>
                </div>
              </template>
              <template v-slot:append v-if="item.uid === userId">
                <v-btn
                  icon="mdi-close"
                  size="x-small"
                  @click="commentDelete(item.no)"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <div v-if="isEmoji" class="comment-emoji">
        <v-row dense class="comment-stamp text-center">
          <v-col
            v-for="item in imageList"
            :key="item.key"
            no-gutters
            :class="item.key === selectImage ? 'comment-emoji-select' : ''"
            @click="selectImage = item.key"
          >
            <v-sheet class="pa-1 ma-1">
              <v-avatar size="x-large">
                <v-img
                  :src="item.value"
                ></v-img>
              </v-avatar>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
      <div class="comment-write">
        <v-text-field
          class="comment-wirte_margin"
          v-model="commentContent"
        >
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
            <v-btn
              size="40"
              icon="mdi-panda"
              color="brown-lighten-1"
              @click="isEmoji = !isEmoji"
              :loading="isLoading"
            ></v-btn>
            <v-btn
              size="40"
              icon="mdi-rocket"
              class="comment-margin-left"
              color="brown-lighten-1"
              @click="commentWrite"
              :loading="isLoading"
            ></v-btn>
          </template>
        </v-text-field>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { isEmpty, datetimeDiff } from "~/composables/common";
import { imageList, getImage } from "~/composables/emoji";
import { useComment } from '~/composables/comment';
import { useAccount } from '~/composables/account';

const { commentNo, commentCount, isComment, setIsComment, setCommentCount } = useComment();
const { account } = useAccount();
const config = useRuntimeConfig();
const avatarMe = ref(account.value ? account.value.photoURL : null);
const userId = ref(account.value ? account.value.uid : null);
const commentList: any = ref([]);
const commentContent = ref("");
const isLoading = ref(false);
const isEmoji = ref(false);
const selectImage = ref();

// モーダルクローズ
const closeModal = () => {
  commentList.value = [];
  commentContent.value = "";
  selectImage.value = null;
  isLoading.value = false;
  isEmoji.value = false;
  setIsComment(false);
}

// コメント取得
const getComments = async () => {
  const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaCommentList}`, {
    method: "POST",
    body: {
      sid: commentNo.value
    }
  }));
  if (!isEmpty(data.value)) {
    if (data.value.success) {
      commentList.value = data.value.rows;
    }
  }
};

// リストを再取得した場合、データを再設定
watch(commentCount, () => {
  commentList.value = [];
  getComments();
});

// コメント処理
const sendFetch = async (url: any, content: string, emoji: string, cid: number) => {
  const { data } = await useAsyncData('item', () => $fetch(`${url}`, {
    method: "POST",
    body: {
      cid: cid,
      sid: commentNo.value,
      uid: account.value.uid,
      content: !isEmpty(content) ? content : null,
      emoji: !isEmpty(emoji) ? emoji : null
    }
  }));
  if (!isEmpty(data.value)) {
    if (data.value.success) {
      setCommentCount();
    }
  }
  commentContent.value = "";
  selectImage.value = null;
  isLoading.value = false;
  isEmoji.value = false;
}

// コメント作成
const commentWrite = async () => {
  if (!isEmpty(commentContent.value) || !isEmpty(selectImage.value)) {
    isLoading.value = true;
    await sendFetch(config.public.apiCocoaCommentWrite, commentContent.value, selectImage.value, 0);
  }
}

// コメント削除
const commentDelete = async (cid: number) => {
  isLoading.value = true;
  await sendFetch(config.public.apiCocoaCommentDelete, "", "", cid);
}
</script>