<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import LeftMenu from '@/components/MainMenu.vue';
import SetupResourcesPanel from '@/components/panels/SetupResourcesPanel.vue';
import SourceAttributesPanel from '@/components/panels/SourceAttributesPanel.vue';
import QueryCommandPanel from '@/components/panels/QueryCommandPanel.vue';
import QueryVisualEditorPanel from '@/components/panels/QueryVisualEditorPanel.vue';
import QueryResultsPanel from '@/components/panels/QueryResultsPanel.vue';
import EditorModeButton from '@/components/buttons/EditorModeButton.vue';

import { useSourcesStore } from '@/store/sources.js';

const sourcesStore = useSourcesStore();
const { isAttributesPanelOpened } = storeToRefs(sourcesStore);

let isModeCommand = ref(true);
const selectCommandMode = () => {
  console.log('> App -> selectCommandMode');
  if (!isModeCommand.value) isModeCommand.value = true;
};
const selectEditorMode = () => {
  console.log('> App -> selectEditorMode');
  if (isModeCommand.value) isModeCommand.value = false;
};
</script>
<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <header class="flex flex-row justify-center py-2 pr-4 bg-gray-200 select-none border-b-1 border-gray-300">
      <h1 class="text-dark font-normal text-xs">SQAL</h1>
    </header>
    <main class="flex flex-row h-screen">
      <LeftMenu class="flex flex-col max-w-72 w-64 h-full" />
      <section class="flex flex-col w-full h-full bg-gray-50 p-4 overflow-y-scroll custom-scrollbar">
        <flex-col class="flex bg-gray-100 space-y-1 rounded">
          <flex-row>
            <SetupResourcesPanel />
          </flex-row>
          <flex-row class="bg-gray-200">
            <flex-col class="flex">
              <flex-row class="flex w-full justify-around">
                <EditorModeButton
                  title="Commands"
                  :is-enabled="isModeCommand"
                  @selected="selectCommandMode"
                />
                <EditorModeButton
                  title="Visual Editor"
                  :is-enabled="!isModeCommand"
                  @selected="selectEditorMode"
                />
              </flex-row>
              <flex-row>
                <flex-col class="flex space-y-2 p-4">
                  <flex-row v-if="isModeCommand">
                    <QueryCommandPanel />
                  </flex-row>
                  <flex-row v-if="!isModeCommand">
                    <QueryVisualEditorPanel />
                  </flex-row>
                </flex-col>
              </flex-row>
            </flex-col>
          </flex-row>
          <flex-row
            v-if="isModeCommand"
            class="bg-gray-200"
          >
            <QueryResultsPanel class="p-4" />
          </flex-row>
        </flex-col>
      </section>
      <SourceAttributesPanel
        v-if="isAttributesPanelOpened"
        class="flex flex-col w-64"
      />
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
