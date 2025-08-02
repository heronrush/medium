import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    CONNECTION_POOL_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// middleware
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization") || "";

  try {
    const verifiedJwt = await verify(token, c.env.JWT_SECRET);
    const userId = verifiedJwt.userId as string;

    c.set("userId", userId);

    await next();
    return c.json({ msg: "token is not verified" });
  } catch (e) {
    return c.json({
      msg: "error in middleware - problem in token verification",
    });
  }
});

// publishing a new blog post
blogRouter.post("/publish", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

  const userId = await c.get("userId");

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    if (blog) {
      return c.json({ msg: "blog successfully created" });
    }
  } catch (e) {
    return c.json({ msg: "error while creating blog post" });
  }

  return c.text("Hello Hono!");
});

// changing a blog post content
blogRouter.put("/update", (c) => {
  return c.text("Hello Hono!");
});

// getting all blog posts of all users
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany();

    return c.json({ blogs: blogs });
  } catch (e) {
    return c.json({ msg: "error while send blogs in bulk" });
  }
});

// getting a blog post by its id
blogRouter.get("/:id", (c) => {
  return c.text("Hello Hono!");
});
