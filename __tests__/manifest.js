const examples = require("..");

it("has titles for every notebook and each title is 6 characters or more", () => {
  examples.manifest.forEach(collection => {
    collection.files.forEach(fileInfo => {
      expect(fileInfo.metadata.title).toMatch(/.{6,}/);
    });
  });
});
