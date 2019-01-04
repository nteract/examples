const util = require("util");
const writeFile = util.promisify(require("fs").writeFile);
const readFile = util.promisify(require("fs").readFile);

const { json2ts } = require("json-ts");
const { format } = require("prettier");

async function main() {
  const manifestRaw = await readFile("manifest.json");

  const rootName = "Manifest";
  const manifestTypes = json2ts(manifestRaw, {
    rootName,
    prefix: ""
  });

  const typeScriptDefinition = format(
    `
  declare module '@nteract/examples' {
    ${manifestTypes}

    export const manifest: ${rootName};
  }
  `,
    { parser: "typescript" }
  );

  await writeFile("index.d.ts", typeScriptDefinition);
}

main();
