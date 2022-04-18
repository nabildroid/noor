const fs = require("fs");

const template = fs.readFileSync("./build.html");

const { html, styles } = JSON.parse(fs.readFileSync("./data.html"));

const output = template
  .replace("<style></style>", `<style>${styles}</style>`)
  .replace("<content></content>", html);

fs.writeFile("public/index.html", output);
