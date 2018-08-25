const fs = require("fs");
// console.log(__dirname)
const path = require("path");

const languages = ["r", "python", "node.js"];

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
              files: files.map(filename =>
                path.join(__dirname, language, filename)
              )
            });
          });
        })
    )
  );
  return manifest;
}

module.exports = {
  getExamples
};
