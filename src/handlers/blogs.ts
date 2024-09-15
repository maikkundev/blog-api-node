import { Hono } from "hono";
import { html } from "hono/html";

import { prisma } from "../";

interface createOptions {
  details: string;
  author: string;
}

const app = new Hono();

app.get("/", async (c) => {
  return c.json(await prisma.blog.findMany());
});

app.get("/:id", async (c) => {
  const idStr = c.req.param();
  const id = parseInt(idStr.id);

  return c.json(
    await prisma.blog.findUnique({
      where: { id },
    })
  );
});

app.post("/new/c", async (c) => {
  const data: createOptions = await c.req.json();

  await prisma.blog.create({
    data: { author: data.author, details: data.details },
  });

  return c.body("New blog was created.");
});

app.delete("/:id", async (c) => {
  const idStr = c.req.param();
  const id = parseInt(idStr.id);

  await prisma.blog.delete({
    where: { id },
  });

  return c.body(`Blog with id ${id} was deleted.`);
});

export default app;
