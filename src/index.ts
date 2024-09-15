import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { serve } from '@hono/node-server';
import { PrismaClient } from '@prisma/client';

import blogs from './handlers/blogs';

const app = new Hono();
app.use(logger());
export const prisma: PrismaClient = new PrismaClient();

app.route("/blogs", blogs);
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
