<script setup>
import { storeToRefs } from 'pinia';
import { useQueriesStore } from '@/store/queries.js';
import { useSourcesStore } from '@/store/sources.js';

const queriesStore = useQueriesStore();
const sourcesStore = useSourcesStore();

const { selected: query } = storeToRefs(queriesStore);
const { list: sources, isLoadingSource } = storeToRefs(sourcesStore);

const onUpdateSelectedQueryName = (e) => {
  console.log('> SelectPanel -> updateSelectedQueryName', e);
  queriesStore.updateSelectedName(e.currentTarget.value);
};

const onSelectSource = (e) => {
  console.log('> SelectPanel -> selectSource', e.currentTarget);
  const index = e.currentTarget.selectedIndex;
  const options = e.currentTarget.options;
  sourcesStore.select(options[index].value);
};
</script>

<template>
  <flex class="p-4 justify-between items-center">
    <div class="flex flex-col">
      <small class="text-gray-500 px-1">Selected:</small>
      <input
        :value="query?.name"
        class="custom-input"
        placeholder="Create query from menu"
        @keyup.enter="onUpdateSelectedQueryName"
      />
    </div>
    <div class="flex flex-col w-36">
      <div class="flex flex-row items-top spacer-x-4">
        <div class="flex flex-col w-4 h-full">
          <span
            v-show="isLoadingSource"
            class="i-ic:baseline-rotate-right animate-spin text-xl bg-yellow"
          ></span>
        </div>
        <div class="flex flex-col">
          <small class="text-gray-500 px-2">Source:</small>
          <select
            name="sources"
            class="custom-input"
            placeholder="Select source"
            @change="onSelectSource"
          >
            <option
              value=""
              disabled
              selected
            >
              Select source
            </option>
            <option
              v-for="source in sources"
              :key="source"
              :value="source.id"
              :selected="source.isSelected"
            >
              {{ source.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </flex>
</template>

<style scoped></style>
