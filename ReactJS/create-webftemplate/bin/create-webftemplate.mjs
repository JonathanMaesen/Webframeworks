#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import prompts from "prompts";

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

// tiny args: <dir>
const argv = process.argv.slice(2);
const argDir = argv.find(a => !a.startsWith("-"));

async function main() {
    let targetDirName = safeName(argDir || "my-app");

    if (!argDir) {
        const response = await prompts([
            { type: "text", name: "targetDir", message: "Project name:", initial: "my-app" }
        ]);
        targetDirName = safeName(response.targetDir || "my-app");
    }

    const baseCwd = process.env.INIT_CWD || process.cwd();
    const dest = path.resolve(baseCwd, targetDirName);
    const templateDir = path.resolve(__dirname, "../template");

    // Sanity checks on template
    if (!(await fs.pathExists(templateDir))) {
        console.error(`\nError: template directory not found at:\n  ${templateDir}\n`);
        process.exit(1);
    }
    const templateEntries = await fs.readdir(templateDir).catch(() => []);
    if (templateEntries.length === 0) {
        console.error(`\nError: template directory is empty at:\n  ${templateDir}\n`);
        process.exit(1);
    }

    // Guard if target non-empty
    if (await fs.pathExists(dest)) {
        const entries = await fs.readdir(dest);
        if (entries.length > 0) {
            console.error(`Error: target directory "${targetDirName}" is not empty at:\n  ${dest}`);
            process.exit(1);
        }
    } else {
        await fs.ensureDir(path.dirname(dest));
    }

    console.log(`\nScaffolding into: ${dest}\n`);

    // *** The actual copy ***
    await fs.copy(templateDir, dest); // no filter

    // Verify copy
    const pkgPath = path.join(dest, "package.json");
    if (!(await fs.pathExists(pkgPath))) {
        const got = await fs.readdir(dest).catch(() => []);
        console.error(`\nError: copy appears to have failed.\n  Expected: ${pkgPath}\n  Dest entries now: [${got.join(", ")}]\n  Template was: ${templateDir}\n`);
        process.exit(1);
    }

    // Set app name
    try {
        const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
        pkg.name = targetDirName;
        await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
    } catch (e) {
        console.warn("Warning: could not update package.json name:", e);
    }

    console.log("\nSuccess! Next steps:");
    console.log(`  cd ${targetDirName}`);
    console.log("  npm install");
    console.log("  npm run dev\n");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
