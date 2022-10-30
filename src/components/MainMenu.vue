<script setup>
import { storeToRefs } from 'pinia';
import { useQueriesStore } from '@/store/queries';
const queriesStore = useQueriesStore();
const { list: queries } = storeToRefs(queriesStore);

const onAddQuery = () => {
  console.log('> MainMenu -> addQuery');
  queriesStore.add('New query');
};
const onDeleteSelectedQuery = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  e.stopPropagation();
  console.log('> MainMenu -> deleteQuery', e);
  queriesStore.deleteSelected();
};
const onSelectQuery = async (query) => {
  console.log('> MainMenu -> selectQuery', query);
  await queriesStore.select(query.id);
};
</script>

<template>
  <aside class="px-2 bg-gray-100 border-r-1 border-gray-200">
    <section class="flex flex-row justify-between items-center py-2 b-y-1">
      <small class="text-gray-600 font-normal">Queries</small>
      <button
        class="i-ic:outline-add-box bg-gray hover:bg-dark"
        @click="onAddQuery"
      />
    </section>
    <section
      v-if="queries.length"
      class="flex flex-row h-full mt-2"
    >
      <ul class="list-decimal list-inside w-full flex flex-col">
        <li
          v-for="(item, index) in queries"
          :key="item.id"
          class="w-full py-1 pl-1 select-none hover:bg-gray-200 flex flex-row justify-between items-center"
          :class="{ 'font-bold': item.isSelected }"
          @click="onSelectQuery(item)"
        >
          <span class="text-sm">{{ index + 1 }}. {{ item.name }}</span>
          <button
            v-if="item.isSelected"
            class="i-ic:outline-delete mr-2 bg-gray hover:bg-red"
            @click="onDeleteSelectedQuery"
          />
        </li>
      </ul>
    </section>
    <section
      v-else
      class="leading-5 mt-2 pl-1"
    >
      <small class="text-gray-400"> Press plus button to create new query entity. </small>
      <small class="text-gray-400"> You will be able to edit its name after creation and compose command. </small>
    </section>
  </aside>
</template>
