import { oak, z } from "@src/deps.ts";

export const sumToolRouter = new oak.Router()
  .get("/", (ctx: oak.Context) => {
    ctx.response.body = "Welcome to Sum Tool";
  })
  .post("/", async (ctx: oak.Context) => {
    const reqBodySchema = z.object({ numbers: z.array(z.number()) });
    const reqBodyRaw = await ctx.request.body({ type: "json" }).value;
    const reqBody = reqBodySchema.parse(reqBodyRaw);
    const answer = reqBody.numbers.reduce((acc, current) => acc + current, 0);
    ctx.response.body = { answer };
  });
