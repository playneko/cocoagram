<template>
  <v-layout class="mx-auto compass-margin-top_15" max-width="100%">
    <v-infinite-scroll :items="imageList" :onLoad="load" class="compass-loading-center" width="100%">
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
                <v-img :src="item.filepath + item.filename" cover @click="pageMove(item.no)"></v-img>
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
const imageList = ref([]);
const pagenum = ref(0);
const listTotal = ref(0);

const pageMove = async (sid: number) => {
  await navigateTo(`/detail/${sid}`);
}

// イメージリスト取得
const load = async ({ done }: any) => {
  if (listTotal.value >= pagenum.value) {
    // ページは５件ずつ増やす
    pagenum.value = pagenum.value + 5;
    const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaCompassList}`, {
      method: "POST",
      body: {
        pagenum: pagenum.value
      }
    }));
    if (!isEmpty(data.value)) {
      if (data.value.success && !isEmpty(data.value.rows)) {
        listTotal.value = data.value.total;
        imageList.value.push(...data.value.rows);
      }
    }
  }
  done('ok');
}
</script>