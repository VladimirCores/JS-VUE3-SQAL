<script setup>
import { storeToRefs } from 'pinia';
import sql from '@/assets/json/sql.json';
import { useQueriesStore } from '@/store/queries.js';

const queriesStore = useQueriesStore();
const { selected: query, isQueryWithCommands, isQuerySelected } = storeToRefs(queriesStore);

const onAddQueryCommandClick = (e) => {
  const value = e.currentTarget.value;
  console.log('> QueryCommandPanel -> onAddQueryCommandClick', { value });
  queriesStore.appendCommandToSelected();
};
const onRemoveCommandFromQueryClick = (command) => {
  console.log('> QueryCommandPanel -> onRemoveCommandFromQueryClick', { command });
  queriesStore.removeCommandFromSelected(command);
};
const onCommandKeyChanged = (target, command) => {
  console.log('> QueryCommandPanel -> onCommandKeyChanged', { target, command });
  const index = target.selectedIndex;
  const options = target.options;
  queriesStore.changeCommandKeyForSelected(command, options[index].value);
};
const onCommandParamsChanged = (value, command) => {
  console.log('> QueryCommandPanel -> onCommandParamsChanged', { value, command });
  queriesStore.changeCommandParamsForSelected(command, value);
};
</script>

<template>
  <flex-col class="flex w-full space-y-1">
    <flex-row>
      <small class="text-gray-500 px-1">Add operation and parameters:</small>
    </flex-row>
    <flex-row
      v-if="isQueryWithCommands"
      class="flex"
    >
      <flex-col class="flex py-2 space-y-4 w-full">
        <flex-row
          v-for="command in query.commands"
          :key="command.key"
          class="flex space-x-4 items-center"
        >
          <flex-col>
            <select
              class="custom-input font-bold pl-1 border-gray-300 active:border-gray-400 focus:border-gray-400"
              @change="onCommandKeyChanged($event.currentTarget, command)"
            >
              <option
                value=""
                disabled
                selected
              >
                Select command
              </option>
              <option
                v-for="opt in sql.list"
                :key="opt"
                :value="opt"
                :selected="command.key === opt"
              >
                {{ opt }}
              </option>
            </select>
          </flex-col>
          <flex-col class="w-full">
            <input
              class="custom-input border-gray-300 w-full active:border-gray-400 focus:border-gray-400"
              :value="command.params"
              @keyup="onCommandParamsChanged($event.currentTarget.value, command)"
            />
          </flex-col>
          <flex-col>
            <button
              class="text-gray-300 hover:text-red active:text-red-600"
              @click="onRemoveCommandFromQueryClick(command)"
            >
              <span class="i-ic:baseline-remove-circle text-2xl"></span>
            </button>
          </flex-col>
        </flex-row>
      </flex-col>
    </flex-row>
    <flex-row class="flex justify-between pt-2">
      <small class="text-gray-400">Changes from this editor overrides current command</small>
      <button
        :disabled="!isQuerySelected"
        class="btn-icon-circle justify-self-end place-self-end"
        @click="onAddQueryCommandClick"
      >
        <span class="i-ic:baseline-add-circle text-2xl"></span>
      </button>
    </flex-row>
  </flex-col>
</template>

<style scoped></style>
