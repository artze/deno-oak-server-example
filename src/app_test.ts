import { superoak } from "@src/deps.ts";

import { app } from "@src/app.ts";

Deno.test("GET /sum-tool", async () => {
  const req = await superoak.superoak(app);
  await req.get("/sum-tool").expect("Welcome to Sum Tool");
});

Deno.test("POST /sum-tool", async (t) => {
  await t.step("with valid request", async () => {
    const req = await superoak.superoak(app);
    await req
      .post("/sum-tool")
      .send({ numbers: [1, 2, 3] })
      .expect(200, { answer: 6 });
  });
  await t.step("without request body", async () => {
    const req = await superoak.superoak(app);
    await req.post("/sum-tool").expect(400, [
      {
        code: "invalid_type",
        expected: "object",
        received: "null",
        path: [],
        message: "Expected object, received null",
      },
    ]);
  });
  await t.step("without required property in request body", async () => {
    const req = await superoak.superoak(app);
    await req
      .post("/sum-tool")
      .send({ foo: "bar" })
      .expect(400, [
        {
          code: "invalid_type",
          expected: "array",
          received: "undefined",
          path: ["numbers"],
          message: "Required",
        },
      ]);
  });
  await t.step("with incorrect data type in request body", async () => {
    const req = await superoak.superoak(app);
    await req
      .post("/sum-tool")
      .send({ numbers: [1, "foo"] })
      .expect(400, [
        {
          code: "invalid_type",
          expected: "number",
          received: "string",
          path: ["numbers", 1],
          message: "Expected number, received string",
        },
      ]);
  });
});
