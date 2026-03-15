import { Elysia, t } from 'elysia';
import { NodeService } from '../service/node.service';

const nodeService = new NodeService();

export const nodeRoutes = new Elysia({ prefix: '/api/v1/nodes' })
  .get('/', async ({ query }) => {
    const parentId = query.parentId || null;
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '50', 10);
    
    return await nodeService.getNodesByParent(parentId, page, limit);
  }, {
    query: t.Object({
      parentId: t.Optional(t.String()),
      page: t.Optional(t.String()),
      limit: t.Optional(t.String())
    })
  })
  .get('/search', async ({ query }) => {
    const q = query.q;
    const limit = parseInt(query.limit || '50', 10);
    
    if (!q) return [];
    
    return await nodeService.searchNodes(q, limit);
  }, {
    query: t.Object({
      q: t.String(),
      limit: t.Optional(t.String())
    })
  });
