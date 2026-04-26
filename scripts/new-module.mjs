#!/usr/bin/env node
// Usage: npm run new-module -- <kebab-name> "Display Label"
// Example: npm run new-module -- my-chart "My Chart"

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Argument parsing ─────────────────────────────────────────────────────────

const [, , rawName, rawLabel] = process.argv;

if (!rawName) {
  console.error("Usage: npm run new-module -- <kebab-name> [\"Display Label\"]");
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(rawName)) {
  console.error(`Error: Module name must be kebab-case (lowercase letters, digits, hyphens). Got: "${rawName}"`);
  process.exit(1);
}

const moduleName = rawName;                              // e.g. "my-chart"
const label = rawLabel ?? moduleName
  .split("-")
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(" ");                                             // e.g. "My Chart"

// PascalCase: "my-chart" → "MyChart"
const pascalName = moduleName
  .split("-")
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join("");

// camelCase: "my-chart" → "myChart"
const camelName = pascalName[0].toLowerCase() + pascalName.slice(1);

// ── Guard: no collision ───────────────────────────────────────────────────────

const moduleDir = join(ROOT, "src", "modules", moduleName);
if (existsSync(moduleDir)) {
  console.error(`Error: Module directory already exists: ${moduleDir}`);
  process.exit(1);
}

// ── File templates ────────────────────────────────────────────────────────────

const routesTsx = `\
import { ModuleRoute, indexRoute } from "../../common/routing";
import ${pascalName}Index from "./${pascalName}Index";

export const ${camelName}Routes: ModuleRoute[] = [indexRoute(<${pascalName}Index />)];
`;

const indexTsx = `\
import AppWrapper from "../../common/AppWrapper";
import { PageSizeKey } from "../../common/pageSizeSettings";

const DEFAULT_PAGE_SIZE: PageSizeKey = "8.5x11";

type State = Record<string, never>;
const initialState: State = {};

export default function ${pascalName}Index() {
  return (
    <AppWrapper<State>
      title="${label}"
      defaultPageSize={DEFAULT_PAGE_SIZE}
      initialState={initialState}
      renderSVG={(_state) => (
        <svg>
          {/* TODO: render SVG content */}
        </svg>
      )}
      renderControls={(_state, _setState) => (
        <div>
          {/* TODO: add controls */}
        </div>
      )}
    />
  );
}
`;

// ── Write module files ───────────────────────────────────────────────────────

mkdirSync(moduleDir, { recursive: true });
writeFileSync(join(moduleDir, "routes.tsx"), routesTsx, "utf8");
writeFileSync(join(moduleDir, `${pascalName}Index.tsx`), indexTsx, "utf8");
console.log(`✔ Created src/modules/${moduleName}/routes.tsx`);
console.log(`✔ Created src/modules/${moduleName}/${pascalName}Index.tsx`);

// ── Patch moduleRegistry.ts ──────────────────────────────────────────────────

const registryPath = join(ROOT, "src", "common", "moduleRegistry.ts");
let registry = readFileSync(registryPath, "utf8");

// 1. Insert import after the last existing module import line
const importLine = `import { ${camelName}Routes } from "../modules/${moduleName}/routes";`;

const lastImportMatch = [...registry.matchAll(/^import \{[^}]+\} from "\.\.\/modules\/[^"]+";$/gm)];
if (lastImportMatch.length === 0) {
  console.error("Error: Could not locate module imports in moduleRegistry.ts. Please add the import manually:");
  console.error(`  ${importLine}`);
} else {
  const lastMatch = lastImportMatch[lastImportMatch.length - 1];
  const insertPos = lastMatch.index + lastMatch[0].length;
  registry = registry.slice(0, insertPos) + "\n" + importLine + registry.slice(insertPos);
  console.log(`✔ Added import to moduleRegistry.ts`);
}

// 2. Append registry entry before the closing `];` of modules
const entryLine = `  { segment: "${moduleName}", label: "${label}", routes: ${camelName}Routes },`;
const closingBracket = /(\n];)/;
if (!closingBracket.test(registry)) {
  console.error("Error: Could not locate closing `];` of modules in moduleRegistry.ts. Please add the entry manually:");
  console.error(`  ${entryLine}`);
} else {
  registry = registry.replace(closingBracket, `\n${entryLine}$1`);
  console.log(`✔ Registered "${label}" in modules`);
}

writeFileSync(registryPath, registry, "utf8");

console.log(`\nModule "${label}" is ready at /svgdraw/${moduleName}`);
console.log(`Start the dev server with: npm run dev`);
