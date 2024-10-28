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
          @click="setIsComment(false)"
        ></v-btn>
        <v-toolbar-title>コメント</v-toolbar-title>
      </v-toolbar>
      <div class="comment-scroll">
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
import { useComment } from '~/composables/comment';
import { useAccount } from '~/composables/account';
import { isEmpty } from "~/composables/common";

const { isComment, setIsComment } = useComment();
const { account } = useAccount();
const avatarMe = ref(account.value.photoURL);
</script>