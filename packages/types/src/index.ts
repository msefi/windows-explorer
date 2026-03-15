export type NodeType = 'FOLDER' | 'FILE';

export interface FileNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  size?: number;
  extension?: string;
}

export interface TreeFileNode extends FileNode {
  children?: TreeFileNode[];
  expanded?: boolean;
}
