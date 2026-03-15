export type NodeType = 'FOLDER' | 'FILE';

export interface FileNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
}

export interface TreeFileNode extends FileNode {
  children?: TreeFileNode[];
  expanded?: boolean;
}
