<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { createNamespcace } from '@hw/utils/create';
import { computed } from 'vue';
import { iconProps } from './icon';

defineOptions({
  name: 'hw-icon'
});

const bem = createNamespcace('icon');

const props = defineProps(iconProps);

const style = computed(() => {
  if (!props.size && !props.color) return {};

  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  };
});
</script>

<style scoped></style>
