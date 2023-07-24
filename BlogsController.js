const { readFile, readdir } = require("fs/promises");

const readAllMarkdown = async () => {
  let directory = "./markdowns";
  try {
    const files = await readdir(directory);
    const mdText = await Promise.all(
      files.map(async (file) => {
        const data = await readFile(`./markdowns/${file}`, {
          encoding: "utf8",
        });
        return {
          title: data.split(/[\n\n]+/)[0].slice(2),
          content: data,
        };
      })
    );
    return mdText;
  } catch (err) {
    console.log(err);
    return;
  }
};

const readOneMarkdown = async (filename) => {
  try {
    const data = await readFile(`./markdowns/${filename}`, {
      encoding: "utf8",
    });
    return { title: data.split("#")[1].trim(), content: data };
  } catch (err) {
    console.log(err);
    return { content: "No blogs posted on the date." };
  }
};

module.exports = {
  readAllMarkdown,
  readOneMarkdown,
};
