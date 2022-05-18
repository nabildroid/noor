const fs = require("fs");

const template = fs.readFileSync("./build.html", "utf-8");
const templateContact = fs.readFileSync("./contact.html", "utf-8");

const { html, style } = JSON.parse(fs.readFileSync("./data.html"));

const output = template
  .replace("<style></style>", `<style>${style}</style>`)
  .replace("<content></content>", html)
  .replace("<contact></contact>", templateContact);

fs.writeFileSync("./public/index.html", output);
