<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQueriesStore } from '@/store/queries';

const queryStore = useQueriesStore();
const { selected } = storeToRefs(queryStore);
</script>
<template>
  <div class="flex flex-col space-y-3 pb-2">
    <div class="flex flex-row items-center space-x-2">
      <flex-col class="text-gray-500"><small>Results</small></flex-col>
      <flex-col class="border-t-1 mt-1.5 border-gray-400 w-full"></flex-col>
    </div>
    <div class="flex-row pb-3">
      <div v-if="selected?.isLoading">Loading ...</div>
      <table-fixed
        v-else-if="selected?.results"
        class="table border-collapse w-full mb-6"
      >
        <table-header-group>
          <table-row>
            <table-cell
              v-for="column in selected.results.columns"
              :key="column"
              class="text-center font-bold pb-5"
            >
              {{ column }}
            </table-cell>
          </table-row>
        </table-header-group>
        <table-row-group>
          <table-row
            v-for="row in selected.results.rows"
            :key="row.index"
            class="hover:bg-gray-100"
          >
            <table-cell
              v-for="(item, index) in row.values"
              :key="index"
              class="border border-gray-400 p-2"
            >
              <small>{{ item }}</small>
            </table-cell>
          </table-row>
        </table-row-group>
      </table-fixed>
      <div
        v-else
        class="w-full text-center"
      >
        <small class="text-gray-400">Create and execute query to get some results</small>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
