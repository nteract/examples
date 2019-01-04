const util = require("util");
const writeFile = util.promisify(require("fs").writeFile);
const readFile = util.promisify(require("fs").readFile);

const { json2ts } = require("json-ts");
const { format } = require("prettier");

async function main() {
  const manifestRaw = await readFile("manifest.json");

  const manifestNamespace = json2ts(manifestRaw, {
    rootName: "Manifest",
    prefix: ""
  });

  const typeScriptDefinition = format(
    `
  ${manifestNamespace}

  declare module '@nteract/examples' {
    const manifest: Manifest;
    export = manifest;
  }
  `,
    { parser: "typescript" }
  );

  await writeFile("index.d.ts", typeScriptDefinition);
}

main();
