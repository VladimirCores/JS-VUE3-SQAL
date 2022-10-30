<script setup>
import { storeToRefs } from 'pinia';
import { useQueriesStore } from '@/store/queries.js';
import { useSourcesStore } from '@/store/sources.js';

const queriesStore = useQueriesStore();
const sourcesStore = useSourcesStore();

const { selected: source } = storeToRefs(sourcesStore);

const onSourceAttributeClick = (attr) => {
  console.log('> SourceAttributesPanel -> onSourceAttributeClick', attr);
  queriesStore.appendToSelectedCommand(attr);
};
</script>
<template>
  <section class="h-full bg-gray-100 px-4 border-l-1 border-gray-200">
    <flex-row class="py-2">
      <small class="text-gray-600 font-normal"> Available attributes:</small>
    </flex-row>
    <flex-row v-if="source">
      <flex-col class="flex text-gray-700">
        <flex-row
          v-for="attr in source.data"
          :key="attr"
        >
          <button
            class="hover:text-black"
            @click="onSourceAttributeClick(attr)"
          >
            {{ attr }}
          </button>
        </flex-row>
      </flex-col>
    </flex-row>
    <div
      v-else
      class="leading-5"
    >
      <small class="text-gray-400"> Select source to see all available attributes. </small>
      <small class="text-gray-400"> Click on attribute add it at the end of the query. </small>
    </div>
  </section>
</template>
<style scoped></style>
