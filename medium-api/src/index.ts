import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./generated/prisma";
import { decode, jwt, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Honosjoai eo!");
});

// signup route
app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // extract the body
  const reqBody = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: reqBody.email,
      password: reqBody.password,
    },
  });

  const token = await sign({ id: user.id }, "secret");

  return c.json({ jwt: token });
});

// signin route
app.post("/api/v1/signin", (c) => {
  return c.text("api/v1/signin user signin route");
});

// blog posting route
app.post("/api/v1/blog", (c) => {
  return c.text("api/v1/blog new blog posting route");
});

// blog updating route
app.put("/api/v1/blog", (c) => {
  return c.text("api/v1/signup blogs update route");
});

// getting all blogs route
app.get("/api/v1/blog/:id", (c) => {
  return c.text("getting all blogs route");
});

// not found route
app.notFound((c) => {
  return c.text("custom 404 not found message", 404);
});

export default app;
