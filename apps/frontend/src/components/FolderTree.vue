<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TreeNode from './TreeNode.vue';
import type { TreeFileNode, FileNode } from '@windows-explorer/types';

const rootFolders = ref<TreeFileNode[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchRootFolders = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    // Fetch only root nodes (parentId is null)
    const res = await fetch('http://localhost:3000/api/v1/nodes?parentId=&limit=100');
    if (!res.ok) throw new Error('Failed to fetch folders');
    const data = await res.json();
    
    // We expect a paginated response { data, total, page, limit }
    const nodes: FileNode[] = data.data || [];
    
    // Filter to only show folders in the tree
    const folders = nodes.filter(n => n.type === 'FOLDER');
    
    rootFolders.value = folders.map(f => ({
      ...f,
      children: [],
      expanded: false
    }));
  } catch (err: any) {
    error.value = err.message || 'An error occurred';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchRootFolders();
});
</script>

<template>
  <div class="folder-tree-container">
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <span>Loading...</span>
    </div>
    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>
    <ul v-else class="tree-root">
      <TreeNode 
        v-for="node in rootFolders" 
        :key="node.id" 
        :node="node" 
        :depth="0"
        :parentPath="[]"
      />
    </ul>
    <div v-if="!isLoading && rootFolders.length === 0" class="empty-state">
      No folders found.
    </div>
  </div>
</template>

<style scoped>
.folder-tree-container {
  height: 100%;
}

.tree-root {
  padding: 0;
  margin: 0;
}

.loading-state, .error-state, .empty-state {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.error-state {
  color: #ef4444;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
