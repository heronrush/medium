import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

import { Hono } from "hono";
import z, { email } from "zod";

export const userRouter = new Hono<{
  Bindings: {
    CONNECTION_POOL_URL: string;
    JWT_SECRET: string;
  };
}>();

// signup zod schema
const signupSchema = z.object({
  fullname: z.string(),
  email: z.string(),
  password: z.string(),
});

// signup zod schema
const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// signup endpoint
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const response = signupSchema.safeParse(body);

  if (response.success) {
    try {
      const userExists = await prisma.users.findFirst({
        where: {
          email: body.email,
        },
      });

      if (userExists) {
        c.status(409);
        return c.json({ msg: "user already exists" });
      } else {
        const user = await prisma.users.create({
          data: {
            fullname: body.fullname,
            email: body.email,
            password: body.password,
          },
        });

        const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

        return c.json({ msg: "signup success", token: token, userId: user.id });
      }
    } catch (e) {
      return c.json({ msg: e });
    }
  } else {
    return c.json({ msg: "provide valid/correct credentials for signup" });
  }
});

// signin endpoint
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const response = signinSchema.safeParse(body);

  if (response.success) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: body.email,
          password: body.password,
        },
      });

      if (!user) {
        c.status(401);
        return c.json({ msg: "no user found" });
      }

      const token = await sign(
        {
          userId: user.id,
        },
        c.env.JWT_SECRET
      );

      return c.json({ token: token, userId: user.id });
    } catch (e) {
      c.status(401);
      return c.json({ msg: "no user found" });
    }
  } else {
    c.status(401);
    return c.json({ msg: "invalid credentials" });
  }
});
