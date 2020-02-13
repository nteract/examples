const fs = require("fs");
const path = require("path");

const languages = ["r", "python", "node.js", "dotnet/csharp", "dotnet/fsharp", "dotnet/powershell", "julia"];

async function getExamples() {
  // Look within each directory our manifest needs
  const manifest = await Promise.all(
    // Loop vera ll keys (languages) within manifesst
    languages.map(
      language =>
        // Create a promise we can await
        new Promise((resolve, reject) => {
          // Read the directory for that language
          fs.readdir(language, (err, files) => {
            if (err) {
              // Failed, reject
              reject(err);
              return;
            }
            // Pass back all the files
            resolve({
              language: language,
              // For each notebook, read it into memory

              files: files.map(filename => {
                const notebookPath = path.join(language, filename);

                const content = JSON.parse(fs.readFileSync(notebookPath));

                return {
                  path: notebookPath,
                  metadata: content.metadata
                };
              })
            });
          });
        })
    )
  );

  return new Promise((resolve, reject) => {
    fs.writeFile("manifest.json", JSON.stringify(manifest, null, 2), err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

getExamples()
  .then(x => console.log("example notebooks manifest written"))
  .catch(err => process.exit(1));
