<template>
  <div class="mx-auto header-fixed" width="100%">
    <v-toolbar color="surface">
      <v-btn icon="mdi-chevron-left" class="header-logo_font" @click="movePage(1, null, null)"></v-btn>
      <v-toolbar-title class="header-title_font text-center">CocoaGram</v-toolbar-title>
      <v-btn icon v-if="routeIndex > -1">
        <v-icon>mdi-dots-vertical</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in menuList"
              :key="index"
              :value="index"
              @click="item.type === 3 ? detailDelete(item.id) : movePage(item.type, item.page, item.id)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <div style="width: 64px;" v-if="routeIndex < 0"></div>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, headerSubMenu } from "~/composables/common";
import { useAccount } from '~/composables/account';

const { account } = useAccount();
const config = useRuntimeConfig();
const route: any = useRoute();
const menuList: any = ref([
  { title: '削除', page: '', id: !isEmpty(route.params.id) ? route.params.id : null, type: 3 }
]);
const routeIndex = ref(route.name ? headerSubMenu(route.name) : -1);

// ページ移動
const movePage = async (_type: any, _page: any, id: any) => {
  if (_type === 1) {
    await navigateTo('/', { replace: true });
  } else {
    await navigateTo(`/${_page}/${id}`);
  }
}

// 詳細内容処理
const sendFetch = async (url: any, content: string, emoji: string, sid: number) => {
  const { data } = await useAsyncData('item', () => $fetch(`${url}`, {
    method: "POST",
    body: {
      sid: sid,
      uid: account.value.uid,
    }
  }));
  if (!isEmpty(data.value)) {
    if (data.value.success) {
      movePage(1, null, null);
    }
  }
}

// 詳細内容削除
const detailDelete = async (sid: number) => {
  if (window.confirm('削除しますか？')) {
    await sendFetch(config.public.apiCocoaDetailDelete, "", "", sid);
  }
}

watch(route, () => {
  if (route.name) {
    routeIndex.value = headerSubMenu(route.name);
  }
});
</script>
