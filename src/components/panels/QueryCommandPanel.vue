<script setup>
import { storeToRefs } from 'pinia';
import { useQueriesStore } from '@/store/queries.js';

const queriesStore = useQueriesStore();
const { selected: query, isQueryNotSelected, canExecuteQuery } = storeToRefs(queriesStore);

const onUpdateSelectedQueryCommand = (e) => {
  const value = e.currentTarget.value;
  console.log('> QueryCommandPanel -> onUpdateSelectedQueryCommand', { value });
  queriesStore.updateSelectedCommand(value);
};
const onExecuteQuery = async () => {
  console.log('> QueryCommandPanel -> onExecuteQuery:', { command: query.value.command });
  await queriesStore.executeCurrentQueryCommand();
};
const onCleanQuery = () => {
  console.log('> QueryCommandPanel -> onCleanQuery');
  if (window.confirm('Confirm clean query')) {
    queriesStore.updateSelectedCommand('');
    queriesStore.updateSelectedResults(null);
  }
};
</script>

<template>
  <div class="flex-col w-full">
    <div class="flex flex-row">
      <small class="text-gray-500 px-1">Enter SQL command:</small>
    </div>
    <div class="flex flex-row py-1">
      <textarea
        class="w-full h-16 text-lg rounded focus:outline-none p-2 border-1 border-gray-500"
        :disabled="isQueryNotSelected"
        :value="query?.command"
        @input="onUpdateSelectedQueryCommand"
      ></textarea>
    </div>
    <div class="flex flex-row justify-end items-center mt-1 space-x-4">
      <div
        v-if="!isQueryNotSelected"
        class="flex-col"
      >
        <button
          :disabled="!canExecuteQuery"
          class="py-1 px-2 text-gray-400 enabled:hover:text-red-500"
          @click="onCleanQuery"
        >
          <small>Clean</small>
        </button>
      </div>
      <div class="flex-col">
        <button
          :disabled="!canExecuteQuery"
          class="btn btn-rounded-border"
          @click="onExecuteQuery"
        >
          Execute
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
