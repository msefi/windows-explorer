<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  active?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  active: false,
});
</script>

<template>
  <button 
    class="ui-button" 
    :class="[variant, size, { active }]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
  outline: none;
  font-family: inherit;
}

/* Variants */
.primary {
  background-color: var(--accent-color);
  color: white;
}
.primary:hover { background-color: var(--accent-hover); }

.secondary {
  background-color: var(--bg-color);
  color: var(--text-primary);
  border-color: var(--border-color);
}
.secondary:hover { background-color: var(--surface-hover); border-color: var(--text-secondary); }

.ghost {
  background-color: transparent;
  color: var(--text-secondary);
}
.ghost:hover { background-color: var(--surface-hover); color: var(--text-primary); }

.icon {
  background-color: transparent;
  color: var(--text-secondary);
  padding: 0;
}
.icon:hover { color: var(--text-primary); }
.icon.active { color: var(--accent-color); }

/* Sizes */
.sm { padding: 4px 8px; font-size: 0.75rem; }
.md { padding: 8px 16px; font-size: 0.875rem; }
.lg { padding: 12px 24px; font-size: 1rem; }
.icon-size { width: 32px; height: 32px; }

.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
