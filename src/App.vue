<script setup>
import LeftMenu from '@/components/MainMenu.vue';
import SetupResourcesPanel from '@/components/panels/SetupResoucesPanel.vue';
import QueryCommandPanel from '@/components/panels/QueryCommandPanel.vue';
import QueryResultsPanel from '@/components/panels/QueryResultsPanel.vue';
</script>
<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <header class="flex flex-row justify-center py-2 pr-4 bg-gray-200">
      <h1 class="text-white font-bold text-xs">SQAL</h1>
    </header>
    <main class="flex flex-row h-screen">
      <LeftMenu class="flex flex-col w-64 h-full" />
      <section class="flex flex-col w-full h-full bg-gray-50 p-4 overflow-y-scroll">
        <flex-col class="flex bg-gray-100 rounded">
          <flex-row>
            <SetupResourcesPanel />
          </flex-row>
          <flex-row class="p-4 bg-gray-200">
            <flex-col class="flex space-y-1">
              <flex-row>
                <QueryCommandPanel />
              </flex-row>
              <flex-row>
                <QueryResultsPanel />
              </flex-row>
            </flex-col>
          </flex-row>
        </flex-col>
      </section>
    </main>
  </div>
</template>
<style lang="scss" scoped></style>
