import { Hono } from "hono";

import { prisma } from "../";

interface CreateOptions {
  details: string;
  author: string;
}

const blogs = new Hono();

blogs.get("/", async (c) => {
  return c.json(await prisma.blog.findMany());
});

blogs.get("/:id", async (c) => {
  const idStr = c.req.param();
  const id = parseInt(idStr.id);

  return c.json(
    await prisma.blog.findUnique({
      where: { id },
    })
  );
});

blogs.post("/new/c", async (c) => {
  const data: CreateOptions = await c.req.json();

  await prisma.blog.create({
    data: { author: data.author, details: data.details },
  });

  return c.body("New blog was created.");
});

blogs.delete("/:id", async (c) => {
  const idStr = c.req.param();
  const id = parseInt(idStr.id);

  await prisma.blog.delete({
    where: { id },
  });

  return c.body(`Blog with id ${ id } was deleted.`);
});

blogs.patch("/:id", async (c) => {
  const idStr = c.req.param();
  const id = parseInt(idStr.id);

  const data: CreateOptions = await c.req.json();

  await prisma.blog.update({
    where: { id },
    data: {
      author: data.author,
      details: data.details,
    }
  })

  return c.body(`Blog with id ${ id } was updated.`);
})

export default blogs;
