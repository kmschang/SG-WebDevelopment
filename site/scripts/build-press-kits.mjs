import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(scriptDir, "..");
const repoRoot = resolve(siteRoot, "..");
const outputDir = resolve(siteRoot, "public", "press-kits");

const kits = [
  { source: "Assets/SonnazGroup", output: "SonnazGroup-PressKit.zip" },
  { source: "Assets/DayTracker", output: "DayTracker-PressKit.zip" },
  { source: "Assets/DiscountCalculator", output: "DiscountCalculator-PressKit.zip" },
  { source: "Assets/QuickerTipper", output: "QuickerTipper-PressKit.zip" }
];

await mkdir(outputDir, { recursive: true });

for (const kit of kits) {
  const sourceDir = resolve(repoRoot, kit.source);
  const outputPath = resolve(outputDir, kit.output);

  await new Promise((resolvePromise, rejectPromise) => {
    const archive = new ZipArchive({ zlib: { level: 9 } });
    const output = createWriteStream(outputPath);

    output.on("close", resolvePromise);
    archive.on("error", rejectPromise);
    archive.pipe(output);
    archive.glob("**/*", {
      cwd: sourceDir,
      ignore: ["**/*.zip", "**/.DS_Store"]
    });
    archive.finalize();
  });
}
