<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Button',
  },
  isEnabled: Boolean,
});
// eslint-disable-next-line vue/valid-define-emits
defineEmits(['selected']);
</script>
<template>
  <button
    class="btn w-full text-xs text-gray-700 pb-2 pt-3 border-b-1 border-gray-300"
    :class="{ '!bg-gray-200 font-bold border-b-none': props.isEnabled }"
    @click="$emit('selected')"
  >
    {{ props.title }}
  </button>
</template>
<style scoped></style>
