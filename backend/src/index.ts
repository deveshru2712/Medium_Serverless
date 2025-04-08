import { Hono } from "hono";
import authRouter from "./routes/auth.routes";
import { cors } from "hono/cors";
import blogRoutes from "./routes/blog.routes";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/auth", authRouter);
app.route("/api/blog", blogRoutes);

export default app;
