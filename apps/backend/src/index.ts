import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { nodeRoutes } from './domain/nodes/controller/node.controller';

const app = new Elysia()
  .use(cors())
  .use(nodeRoutes)
  .post("/api/v1/seed", async () => {
    const proc = Bun.spawn(["bun", "run", "src/db/seed.ts"]);
    const text = await new Response(proc.stdout).text();
    return { message: "Seeding complete", output: text };
  });

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
