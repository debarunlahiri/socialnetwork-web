import vinext from "vinext";
import { defineConfig } from "vite";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: [],
  r2_buckets: [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const isVercelBuild = process.env.VERCEL === "1" || process.env.NITRO_PRESET === "vercel";

  // Vercel needs Nitro's adapter; the normal build keeps the native Cloudflare
  // runtime used by local development and Sites deployments.
  const platformPlugin = isVercelBuild
    ? (await import("nitro/vite")).nitro()
    : (await import("@cloudflare/vite-plugin")).cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      });
  const tailwindPlugin = isVercelBuild
    ? (await import("@tailwindcss/vite")).default()
    : null;

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      tailwindPlugin,
      vinext(),
      platformPlugin,
    ],
  };
});
