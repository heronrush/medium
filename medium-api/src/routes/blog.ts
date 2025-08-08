import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import z from "zod";

export const blogRouter = new Hono<{
  Bindings: {
    CONNECTION_POOL_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

const blogPublishSchema = z.object({
  title: z.string(),
  content: z.string(),
});

// middleware - checks on every /api/v1/blog route
// and gets the jwt token and checks if it's valid or not
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization") || "";

  try {
    const verifiedJwt = await verify(token, c.env.JWT_SECRET);
    const userId = verifiedJwt.userId as string;

    c.set("userId", userId);

    await next();
  } catch (e) {
    c.status(401);
    return c.json({
      msg: "unauthorized",
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

  const response = blogPublishSchema.safeParse(body);

  if (response.success) {
    try {
      const blog = await prisma.blog.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: userId,
        },
      });

      return c.json({ msg: "blog successfully created" });
    } catch (e) {
      c.status(500);
      return c.json({ msg: "error while creating blog post" });
    }
  } else {
    c.status(401);
    return c.json({
      msg: "invalid data format provided while publishing a blog",
    });
  }
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
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const specificBlog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
    });

    if (specificBlog) {
      return c.json({ blog: specificBlog });
    }
  } catch (e) {
    c.status(401);
    return c.json({ msg: "invalid request" });
  }
});
