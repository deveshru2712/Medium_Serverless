import { Hono } from "hono";
import authRouter from "./routes/auth.routes";
import { cors } from "hono/cors";
import blogRoutes from "./routes/blog.routes";

const app = new Hono();

// app.use(cors());

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://medium-serverless-ao8jacpk5-devesh-chandras-projects.vercel.app",
      "https://medium-serverless-git-master-devesh-chandras-projects.vercel.app",
      "https://medium-serverless-devesh-chandras-projects.vercel.app",
    ],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/auth", authRouter);
app.route("/api/blog", blogRoutes);

export default app;
