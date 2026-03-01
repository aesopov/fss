import { defineConfig } from "tsdown";

export default defineConfig({
  entry: { index: "src/index.ts", helpers: "src/helpers.ts" },
  exports: true,
});
