<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import { Folder, File as FileIcon } from 'lucide-vue-next';
import type { FileNode } from '@windows-explorer/types';

const props = defineProps<{
  folderId: string | null;
  searchQuery?: string;
  viewMode: 'grid' | 'list';
}>();

const selectFolder = inject<(folder: FileNode, path: FileNode[]) => void>('selectFolder');

const contents = ref<FileNode[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchContents = async (id: string | null, search?: string) => {
  if (!id && !search) {
    contents.value = [];
    return;
  }
  
  try {
    isLoading.value = true;
    error.value = null;
    
    let url = `http://localhost:3000/api/v1/nodes`;
    if (search) {
      url = `http://localhost:3000/api/v1/nodes/search?q=${encodeURIComponent(search)}`;
    } else if (id) {
      url += `?parentId=${id}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch contents');
    
    const data = await res.json();
    // Paginated response has 'data' wrapper, search might just return array
    contents.value = Array.isArray(data) ? data : (data.data || []);
  } catch (err: any) {
    error.value = err.message || 'An error occurred';
    contents.value = [];
  } finally {
    isLoading.value = false;
  }
};

watch(() => [props.folderId, props.searchQuery], ([newId, newSearch]) => {
  fetchContents(newId as string | null, newSearch as string | undefined);
}, { immediate: true });

const handleItemClick = (item: FileNode) => {
  if (item.type === 'FOLDER' && selectFolder) {
    selectFolder(item, []); 
  }
};
</script>

<template>
  <div class="folder-contents">
    <div v-if="!folderId && !searchQuery" class="empty-state">
      <Folder :size="48" color="var(--border-color)" stroke-width="1.5" />
      <p>Select a folder in the left panel to view it</p>
    </div>
    
    <div v-else-if="isLoading" class="loading-state">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="contents.length === 0" class="empty-state">
      <p>No items found.</p>
    </div>
    
    <div v-else :class="viewMode === 'grid' ? 'grid-view' : 'list-view'">
      <template v-if="viewMode === 'grid'">
        <div 
          v-for="item in contents" 
          :key="item.id" 
          class="grid-item"
          @dblclick="handleItemClick(item)"
        >
          <div class="item-icon-wrapper">
            <Folder v-if="item.type === 'FOLDER'" :size="48" fill="var(--accent-color)" color="var(--accent-color)" stroke-width="1" />
            <FileIcon v-else :size="40" fill="#fff" color="var(--text-secondary)" stroke-width="1.5" />
          </div>
          <span class="item-name" :title="item.name">{{ item.name }}</span>
        </div>
      </template>
      <template v-else>
        <!-- List View Header -->
        <div class="list-header">
          <div class="col-name">Name</div>
          <div class="col-type">Type</div>
          <div class="col-size">Size</div>
        </div>
        <div 
          v-for="item in contents" 
          :key="item.id" 
          class="list-item"
          @dblclick="handleItemClick(item)"
        >
          <div class="col-name">
            <Folder v-if="item.type === 'FOLDER'" :size="18" fill="var(--accent-color)" color="var(--accent-color)" stroke-width="1" />
            <FileIcon v-else :size="18" color="var(--text-secondary)" stroke-width="1.5" />
            <span>{{ item.name }}</span>
          </div>
          <div class="col-type">{{ item.type === 'FOLDER' ? 'Folder' : (item.extension || item.name.split('.').pop()?.toUpperCase() || 'File') }}</div>
          <div class="col-size">{{ item.size ? (item.size / 1024).toFixed(0) + ' KB' : '--' }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.folder-contents {
  padding: 1.5rem;
  height: 100%;
}

.empty-state, .loading-state, .error-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  gap: 1rem;
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  align-items: start;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  cursor: default;
  user-select: none;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.grid-item:hover {
  background-color: var(--surface-hover);
  border-color: var(--border-color);
}

.grid-item:active {
  background-color: var(--accent-light);
  border-color: rgba(37, 99, 235, 0.2);
}

.item-icon-wrapper {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-name {
  font-size: 0.8125rem;
  text-align: center;
  width: 100%;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--text-primary);
}

/* List View Styles */
.list-view {
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 0.5rem;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  cursor: default;
  user-select: none;
  font-size: 0.8125rem;
  transition: all 0.2s;
}

.list-item:hover {
  background-color: var(--surface-hover);
}

.col-name {
  flex: 2;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-type {
  flex: 1;
  color: var(--text-secondary);
}

.col-size {
  width: 80px;
  text-align: right;
  color: var(--text-secondary);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
