import { eq, isNull, ilike, sql } from 'drizzle-orm';
import { db } from '../../../db';
import { nodes } from '../../../db/schema';
import type { CreateNodeDto } from '../dto/node.dto';

export class NodeRepository {
  async findByParentId(parentId: string | null, limit: number, offset: number) {
    const query = db.select().from(nodes);
    
    // Base condition
    const condition = parentId ? eq(nodes.parentId, parentId) : isNull(nodes.parentId);
    
    // Get paginated data
    const data = await query
      .where(condition)
      .limit(limit)
      .offset(offset)
      .orderBy(
        sql`CASE WHEN ${nodes.type} = 'FOLDER' THEN 0 ELSE 1 END`, 
        nodes.name
      );

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(nodes)
      .where(condition);
      
    return { data, total: Number(countResult[0].count) };
  }

  async searchNodes(searchTerm: string, limit: number) {
    return await db.select()
      .from(nodes)
      .where(ilike(nodes.name as any, `%${searchTerm}%`))
      .limit(limit)
      .orderBy(
        sql`CASE WHEN ${nodes.type} = 'FOLDER' THEN 0 ELSE 1 END`, 
        nodes.name
      );
  }

  async create(data: CreateNodeDto) {
    const result = await db.insert(nodes).values({
      name: data.name,
      type: data.type,
      parentId: data.parentId || null,
    }).returning();
    return result[0];
  }

  async truncate() {
    await db.delete(nodes);
  }
}
