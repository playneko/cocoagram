<template>
  <v-layout class="mx-auto" max-width="100%">
    <v-infinite-scroll :items="imageList" :onLoad="load" class="compass-loading-center compass-margin-top" width="100%">
      <v-main>
        <v-container fluid class="compass-container_npd">
          <v-row dense>
            <v-col
              v-for="(item, itemIndex) in imageList"
              :key="itemIndex"
              cols="4"
              class="compass-col_npd"
            >
              <v-sheet
                color="grey-lighten-2"
                class="compass-radius"
              >
                <v-img :src="item.filename" cover @click="pageMove(item.no)" class="compass-img-height"></v-img>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-infinite-scroll>
  </v-layout>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const imageList: any = ref([]);
const pagenum = ref(1);
const scrollFlg = ref(true);

const pageMove = async (sid: number) => {
  await navigateTo(`/detail/${sid}`);
}

// イメージリスト取得
const load = async ({ done }: any) => {
  if (scrollFlg.value) {
    // ページは５件ずつ増やす
    const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaCompassList}`, {
      method: "POST",
      body: {
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
</script>