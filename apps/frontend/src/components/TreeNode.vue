<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-vue-next';
import type { TreeFileNode, FileNode } from '@windows-explorer/types';

const props = defineProps<{
  node: TreeFileNode;
  depth: number;
  parentPath: FileNode[];
}>();

const isExpanded = ref(props.node.expanded ?? false);
const isLoading = ref(false);
const activeFolderId = inject<ReturnType<typeof ref<string | null>>>('activeFolderId');
const selectFolder = inject<(folder: FileNode, path: FileNode[]) => void>('selectFolder');

// Start as empty array unless preloaded
const children = ref<TreeFileNode[]>(props.node.children || []);

const hasFetched = ref(children.value.length > 0);

// We assume it's a folder, they all have a chevron to try and load. 
// Standard OS behavior leaves chevrons until clicked, then removes if empty.
const hasChevron = computed(() => {
  if (!hasFetched.value && props.node.type === 'FOLDER') return true;
  return children.value.length > 0;
});

const isSelected = computed(() => {
  return activeFolderId?.value === props.node.id;
});

const currentPath = computed(() => {
  return [...props.parentPath, {
    id: props.node.id,
    name: props.node.name,
    type: props.node.type,
    parentId: props.node.parentId
  }];
});

const fetchChildren = async () => {
  if (hasFetched.value || props.node.type !== 'FOLDER') return;
  
  try {
    isLoading.value = true;
    const res = await fetch(`http://localhost:3000/api/v1/nodes?parentId=${props.node.id}`);
    const data = await res.json();
    
    // Only keep folders for the tree on the left side
    const folders = data.data.filter((n: FileNode) => n.type === 'FOLDER');
    children.value = folders.map((f: FileNode) => ({ ...f, children: [], expanded: false }));
    hasFetched.value = true;
  } catch (err) {
    console.error("Failed to load children", err);
  } finally {
    isLoading.value = false;
  }
};

const toggleExpand = async (e: Event) => {
  e.stopPropagation();
  if (!isExpanded.value) {
    if (!hasFetched.value) {
      await fetchChildren();
    }
    isExpanded.value = true;
  } else {
    isExpanded.value = false;
  }
};

const handleSelect = async () => {
  if (selectFolder) {
    selectFolder(props.node, currentPath.value);
  }
  
  // Auto-expand and load when clicked
  if (!isExpanded.value && props.node.type === 'FOLDER') {
    if (!hasFetched.value) {
      await fetchChildren();
    }
    if (children.value.length > 0) {
      isExpanded.value = true;
    }
  }
};
</script>

<template>
  <li class="tree-node">
    <div 
      class="node-content" 
      :class="{ 'is-selected': isSelected }"
      :style="{ paddingLeft: `${depth * 1.5 + 0.5}rem` }"
      @click="handleSelect"
    >
      <button 
        v-if="hasChevron" 
        class="expand-btn" 
        @click.stop="toggleExpand"
      >
        <ChevronDown v-if="isExpanded" :size="16" class="icon" />
        <ChevronRight v-else :size="16" class="icon" />
      </button>
      <div v-else class="expand-placeholder"></div>
      
      <div class="node-icon">
        <FolderOpen v-if="isExpanded && children.length > 0" :size="18" fill="var(--accent-hover)" color="var(--accent-hover)" />
        <FolderOpen v-else-if="isSelected && children.length === 0" :size="18" fill="var(--accent-color)" color="var(--accent-color)" />
        <Folder v-else :size="18" fill="var(--text-secondary)" color="var(--text-secondary)" />
      </div>
      
      <span class="node-name">{{ node.name }}</span>
    </div>

    <!-- Recursive Children Render -->
    <ul v-if="isExpanded && children.length > 0" class="node-children">
      <TreeNode 
        v-for="child in children" 
        :key="child.id" 
        :node="child" 
        :depth="depth + 1" 
        :parentPath="currentPath"
      />
    </ul>
  </li>
</template>

<style scoped>
.tree-node {
  display: block;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem;
  cursor: pointer;
  user-select: none;
  color: var(--text-primary);
  border-radius: 4px;
  margin: 1px 0.5rem;
  transition: background-color 0.15s ease;
}

.node-content:hover {
  background-color: var(--surface-color);
}

.node-content.is-selected {
  background-color: var(--accent-light);
  color: var(--accent-text);
}

.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--text-secondary);
  transition: background-color 0.2s;
}

.expand-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
}

.expand-placeholder {
  width: 24px;
  height: 24px;
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem 0 0.125rem;
}

.node-name {
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-children {
  margin: 0;
  padding: 0;
}
</style>
