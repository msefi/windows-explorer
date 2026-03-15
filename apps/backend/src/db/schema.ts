import { pgTable, uuid, varchar, index } from "drizzle-orm/pg-core";

export const nodes = pgTable('nodes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 10 }).notNull(), // 'FOLDER' or 'FILE'
  parentId: uuid('parent_id')
}, (table) => {
  return {
    parentIdx: index('parent_id_idx').on(table.parentId),
    nameIdx: index('name_idx').on(table.name)
  }
});
