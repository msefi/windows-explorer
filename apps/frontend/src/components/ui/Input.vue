<script setup lang="ts">
defineProps<{
  modelValue?: string;
  placeholder?: string;
  type?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="ui-input-wrapper">
    <slot name="prefix" />
    <input 
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="ui-input"
    />
    <slot name="suffix" />
  </div>
</template>

<style scoped>
.ui-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.ui-input {
  width: 100%;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  font-size: 0.875rem;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s;
}

.ui-input:focus {
  border-color: var(--accent-color);
}
</style>
