#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import prompts from "prompts";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function safeName(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "") || "my-app";
}

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "targetDir",
      message: "Project name:",
      initial: "my-app"
    },
    {
      type: "select",
      name: "pm",
      message: "Package manager:",
      choices: [
        { title: "npm", value: "npm" },
        { title: "pnpm", value: "pnpm" },
        { title: "yarn", value: "yarn" },
        { title: "bun", value: "bun" }
      ],
      initial: 0
    },
    {
      type: "confirm",
      name: "install",
      message: "Install dependencies now?",
      initial: true
    }
  ]);

  const targetDirName = safeName(response.targetDir);
  const dest = path.resolve(process.cwd(), targetDirName);
  const templateDir = path.resolve(__dirname, "../template");

  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
    console.error(`Error: target directory "${targetDirName}" is not empty.`);
    process.exit(1);
  }

  // Copy template
  await fs.copy(templateDir, dest, {
    filter: (src) => !src.includes("node_modules")
  });

  // Patch package.json name
  const pkgPath = path.join(dest, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
      pkg.name = targetDirName;
      await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
    } catch (e) {
      console.warn("Warning: could not update package.json name:", e);
    }
  }

  // Initialize git (best effort)
  try {
    execSync("git init", { stdio: "ignore", cwd: dest });
  } catch {}

  // Install deps if chosen
  if (response.install) {
    const cmds = {
      npm: "npm install",
      pnpm: "pnpm install",
      yarn: "yarn",
      bun: "bun install"
    };
    const cmd = cmds[response.pm] || "npm install";
    console.log(`\nInstalling dependencies with ${response.pm}...\n`);
    execSync(cmd, { stdio: "inherit", cwd: dest });
  }

  console.log("\nSuccess! Next steps:");
  console.log(`  cd ${targetDirName}`);
  if (!response.install) {
    console.log(`  ${(response.pm || "npm")} install`);
  }
  console.log(`  ${(response.pm || "npm")} run dev\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
