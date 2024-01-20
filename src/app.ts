import { oak } from "@src/deps.ts";

import { sumToolRouter } from "@src/sum-tool/router.ts";

const app = new oak.Application();
const router = new oak.Router();

router.use("/sum-tool", sumToolRouter.routes());

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
