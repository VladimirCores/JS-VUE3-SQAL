<script setup>
import { storeToRefs } from 'pinia';
import { useQueriesStore } from '@/store/queries.js';
import { useSourcesStore } from '@/store/sources.js';

const queriesStore = useQueriesStore();
const sourcesStore = useSourcesStore();

const { selected: query } = storeToRefs(queriesStore);
const { list: sources, isLoadingSource, isAttributesPanelOpened } = storeToRefs(sourcesStore);

const onUpdateSelectedQueryName = (e) => {
  console.log('> SetupResourcesPanel -> updateSelectedQueryName', e);
  queriesStore.updateSelectedName(e.currentTarget.value);
};

const onSelectSource = (e) => {
  console.log('> SetupResourcesPanel -> selectSource', e.currentTarget);
  const index = e.currentTarget.selectedIndex;
  const options = e.currentTarget.options;
  sourcesStore.select(options[index].value);
};
const onOpenCloseSourcePanel = () => {
  console.log('> SetupResourcesPanel -> onOpenCloseSourcePanel', isAttributesPanelOpened.value);
  sourcesStore.triggerVisibilityOfAttributesPanel();
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
    <div class="flex flex-col">
      <div class="flex flex-row items-top justify-end space-x-2">
        <div class="flex flex-col h-full">
          <span
            v-show="isLoadingSource"
            class="i-ic:baseline-rotate-right animate-spin text-xl bg-yellow"
          ></span>
        </div>
        <div class="flex flex-col w-full">
          <div class="flex flex-row justify-between items-center text-gray-500">
            <small class="px-2">Source:</small>
            <button @click="onOpenCloseSourcePanel">
              <span
                class="i-ic:round-keyboard-double-arrow-right"
                :class="{ 'rotate-180': isAttributesPanelOpened }"
              ></span>
            </button>
          </div>

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