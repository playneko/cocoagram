<template>
  <div>
    <div v-for="(item, itemIndex) in detailList" :key="itemIndex">
      <v-img
        :aspect-ratio="1"
        class="bg-white detail-bottom_10"
        :src="item.filepath + item.filename"
        width="100%"
      ></v-img>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const detailList = ref([]);

const load = async () => {
  const { data } = await useAsyncData('item', () => $fetch(`${config.public.apiCocoaDetailImage}`, {
    method: "POST",
    body: {
      'did': route.params.id
    }
  }));
  if (!isEmpty(data.value)) {
    if (data.value.success && !isEmpty(data.value.rows)) {
      detailList.value = data.value.rows;
    }
  }
}
load();
</script>