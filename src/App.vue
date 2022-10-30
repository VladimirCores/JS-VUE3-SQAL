<script setup>
import { storeToRefs } from 'pinia';
import { useQueriesStore } from '@/store/queries';
import { useSourcesStore } from '@/store/sources.js';

import LeftMenu from '@/components/MainMenu.vue';

const queriesStore = useQueriesStore();
const sourcesStore = useSourcesStore();

const { selected: query } = storeToRefs(queriesStore);
const { list: sources } = storeToRefs(sourcesStore);

const updateSelectedQueryName = (e) => {
  console.log('> App -> updateSelectedQueryName', e);
  queriesStore.updateSelectedName(e.currentTarget.value);
};

const selectSource = (e) => {
  console.log('> App -> selectSource', e.currentTarget);
  const index = e.currentTarget.selectedIndex;
  const options = e.currentTarget.options;
  sourcesStore.select(options[index].value);
};
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <header class="flex flex-row justify-center py-2 pr-4 bg-gray-200">
      <h1 class="text-gray-500 font-normal text-xs">SQAL</h1>
    </header>
    <main class="flex flex-row h-screen">
      <LeftMenu />
      <div class="w-full h-full bg-gray-50 p-4">
        <div class="flex flex-col h-full bg-gray-100 rounded">
          <div class="flex flex-row p-4 justify-between items-center">
            <div class="flex flex-col">
              <small class="text-gray-500 px-1">Selected:</small>
              <input
                :value="query?.name"
                class="custom-input"
                @keyup.enter="updateSelectedQueryName"
              />
            </div>
            <div class="flex flex-col w-36">
              <small class="text-gray-500 px-2">Source:</small>
              <select
                name="sources"
                class="custom-input"
                @change="selectSource"
              >
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
          <div class="p-4 bg-gray-200 w-full h-full"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
