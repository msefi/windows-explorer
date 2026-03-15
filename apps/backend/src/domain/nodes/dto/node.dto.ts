import type { NodeType } from "@windows-explorer/types";

export interface CreateNodeDto {
  name: string;
  type: NodeType;
  parentId?: string | null;
}

export interface NodeResponseDto {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
}

export interface PaginatedNodesDto {
  data: NodeResponseDto[];
  total: number;
  page: number;
  limit: number;
}
