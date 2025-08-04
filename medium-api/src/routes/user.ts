import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

import { Hono } from "hono";
import z from "zod";

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
      const user = await prisma.users.create({
        data: {
          fullname: body.fullname,
          email: body.email,
          password: body.password,
        },
      });

      const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

      return c.json({ msg: "signup success", token: token, userId: user.id });
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
        return c.json({ msg: "incorrect credentials /signin" });
      }

      const token = await sign(
        {
          userId: user.id,
        },
        c.env.JWT_SECRET
      );

      return c.json({ token: token, userId: user.id });
    } catch (e) {
      return c.text("error - signin");
    }
  } else {
    return c.json({ msg: "provide valid/correct signin data" });
  }
});
