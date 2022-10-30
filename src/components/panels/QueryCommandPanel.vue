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
  <flex-col class="flex w-full space-y-1">
    <flex-row>
      <small class="text-gray-500 px-1">Enter SQL command:</small>
    </flex-row>
    <flex-row>
      <textarea
        class="w-full h-16 text-lg rounded focus:outline-none p-2 border-1 border-gray-500"
        :disabled="isQueryNotSelected"
        :value="query?.command"
        @input="onUpdateSelectedQueryCommand"
      ></textarea>
    </flex-row>
    <flex-row class="flex justify-end items-center space-x-4">
      <flex-col v-if="!isQueryNotSelected">
        <button
          :disabled="!canExecuteQuery"
          class="py-1 px-2 text-gray-400 enabled:hover:text-red"
          @click="onCleanQuery"
        >
          <small>Clean</small>
        </button>
      </flex-col>
      <flex-col>
        <button
          :disabled="!canExecuteQuery"
          class="btn btn-rounded-border"
          @click="onExecuteQuery"
        >
          Execute
        </button>
      </flex-col>
    </flex-row>
  </flex-col>
</template>

<style scoped></style>
