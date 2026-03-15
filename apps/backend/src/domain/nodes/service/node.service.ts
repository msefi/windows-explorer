import { NodeRepository } from '../repository/node.repository';
import type { PaginatedNodesDto } from '../dto/node.dto';

export class NodeService {
  private repository: NodeRepository;

  constructor() {
    this.repository = new NodeRepository();
  }

  async getNodesByParent(parentId: string | null, page: number, limit: number): Promise<PaginatedNodesDto> {
    const offset = (page - 1) * limit;
    const { data, total } = await this.repository.findByParentId(parentId, limit, offset);
    
    // Convert to response DTO format
    const nodes = data.map((node: any) => ({
      id: node.id,
      name: node.name,
      type: node.type as 'FOLDER' | 'FILE',
      parentId: node.parentId
    }));

    return {
      data: nodes,
      total,
      page,
      limit
    };
  }

  async searchNodes(query: string, limit: number = 50) {
    const data = await this.repository.searchNodes(query, limit);
    return data.map((node: any) => ({
      id: node.id,
      name: node.name,
      type: node.type as 'FOLDER' | 'FILE',
      parentId: node.parentId
    }));
  }
}
