import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from "hono/jwt";

import { Hono } from "hono";

export const userRouter = new Hono<{
  Bindings: {
    CONNECTION_POOL_URL: string;
    JWT_SECRET: string;
  };
}>();

// signup endpoint
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.users.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

    return c.json({ token: token, userId: user.id });
  } catch (e) {
    return c.json({ msg: e });
  }
});

// signin endpoint
userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.CONNECTION_POOL_URL,
  }).$extends(withAccelerate());

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
});
