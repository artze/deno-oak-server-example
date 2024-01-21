import { oak, z } from "@src/deps.ts";

import { sumToolRouter } from "@src/sum-tool/router.ts";

const app = new oak.Application();
const router = new oak.Router();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      ctx.response.status = 400;
      ctx.response.body = err.issues;
    } else {
      throw err;
    }
  }
});

router.use("/sum-tool", sumToolRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
