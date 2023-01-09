const fs = require("fs");

const f = fs.readFileSync("123", "utf8");
const l = f.split("\r\n");
let t = "";
for (let i of l) {
  let j = i.split(/ +/g);
  let n = j.slice(1).join(" ");
  t += `      <div><a class="name">${n}</a><a class="alia">['']</a> - <a class="vocal">-</a> : <a class="link">https://youtu.be/${j[0]}</a></div>\n`;
}
fs.writeFileSync("1234", t, "utf8");