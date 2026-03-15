<script setup lang="ts">
import { ref, provide } from 'vue';
import FolderTree from './components/FolderTree.vue';
import FolderContents from './components/FolderContents.vue';
import UIButton from './components/ui/Button.vue';
import UIInput from './components/ui/Input.vue';
import { Search, Monitor, HardDrive, LayoutGrid, List } from 'lucide-vue-next';
import type { FileNode } from '@windows-explorer/types';

const activeFolderId = ref<string | null>(null);
const activeFolderPath = ref<FileNode[]>([]);
const searchQuery = ref("");
const viewMode = ref<'grid' | 'list'>('grid');

const selectFolder = (folder: FileNode, path: FileNode[]) => {
  activeFolderId.value = folder.id;
  activeFolderPath.value = path;
  searchQuery.value = ""; // Clear search when navigating
};

provide('activeFolderId', activeFolderId);
provide('selectFolder', selectFolder);

const handleSearchInput = (value: string) => {
  searchQuery.value = value;
  if (value) {
    activeFolderId.value = null;
    activeFolderPath.value = [];
  }
};
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="header-left">
        <div class="window-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
        <div class="header-logo">
          <Monitor :size="18" color="var(--accent-color)" />
          <span>This PC</span>
        </div>
      </div>
      
      <div class="header-middle">
        <div class="address-bar">
          <div class="nav-controls">
            <UIButton variant="icon" size="sm" title="Back">‹</UIButton>
            <UIButton variant="icon" size="sm" title="Forward">›</UIButton>
          </div>
          <div class="path-display">
            <HardDrive :size="14" />
            <span class="path-segment">This PC</span>
            <template v-for="(segment, idx) in activeFolderPath" :key="segment.id">
              <span class="path-separator">›</span>
              <span class="path-segment" :class="{ current: idx === activeFolderPath.length - 1 }">{{ segment.name }}</span>
            </template>
          </div>
        </div>
      </div>

      <div class="header-right">
        <UIInput 
          v-model="searchQuery"
          @update:modelValue="handleSearchInput"
          placeholder="Search files..."
        >
          <template #prefix>
            <Search :size="16" class="search-icon-pos" />
          </template>
        </UIInput>
      </div>
    </header>
    
    <div class="app-body">
      <aside class="left-panel">
        <div class="sidebar-section">
          <h3 class="section-title">Navigation</h3>
          <FolderTree />
        </div>
      </aside>
      
      <main class="right-panel">
        <div class="panel-header">
          <div class="view-info">
            <h2 v-if="searchQuery">Search results for "{{ searchQuery }}"</h2>
            <h2 v-else-if="activeFolderPath.length > 0">{{ activeFolderPath[activeFolderPath.length - 1].name }}</h2>
            <h2 v-else>This PC</h2>
          </div>
          <div class="view-controls">
            <UIButton 
              variant="secondary" 
              size="sm" 
              :active="viewMode === 'grid'" 
              title="Grid view"
              @click="viewMode = 'grid'"
            >
              <LayoutGrid :size="16" />
            </UIButton>
            <UIButton 
              variant="secondary" 
              size="sm" 
              :active="viewMode === 'list'" 
              title="List view"
              @click="viewMode = 'list'"
            >
              <List :size="16" />
            </UIButton>
          </div>
        </div>
        <div class="content-scroll">
          <FolderContents 
            :folderId="activeFolderId" 
            :searchQuery="searchQuery" 
            :viewMode="viewMode"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--surface-color);
  color: var(--text-primary);
}

.app-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--surface-color);
  gap: 1.5rem;
  z-index: 100;
}

/* Header Left */
.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-width: 240px;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.control.close { background-color: #ff5f56; }
.control.minimize { background-color: #ffbd2e; }
.control.maximize { background-color: #27c93f; }

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Header Middle */
.header-middle {
  flex: 1;
  display: flex;
  justify-content: center;
}

.address-bar {
  display: flex;
  align-items: center;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 4px 8px;
  width: 100%;
  max-width: 600px;
  gap: 12px;
}

.nav-controls {
  display: flex;
  gap: 4px;
}

.path-display {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  overflow: hidden;
  white-space: nowrap;
}

.path-separator { opacity: 0.4; margin: 0 2px; }
.path-segment.current { color: var(--text-primary); font-weight: 500; }

/* Header Right */
.header-right {
  min-width: 240px;
}

.search-icon-pos {
  position: absolute;
  left: 10px;
  z-index: 1;
  color: var(--text-secondary);
  pointer-events: none;
}

:deep(.ui-input) {
  padding-left: 34px !important;
}

/* Body Layout */
.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.left-panel {
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
  background-color: var(--surface-hover);
  overflow-y: auto;
}

.sidebar-section {
  padding: 1rem 0;
}

.section-title {
  padding: 0 1.5rem 0.5rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  font-weight: 600;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--surface-color);
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.view-controls {
  display: flex;
  background: var(--bg-color);
  padding: 2px;
  border-radius: 6px;
  gap: 2px;
}

.content-scroll {
  flex: 1;
  overflow-y: auto;
}
</style>
