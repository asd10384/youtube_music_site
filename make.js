const fs = require("fs");

const output = "출력.html";

const get = fs.readFileSync("메모장2.txt","utf8").split("\r\n");

let t = [];
for (let i of get) {
  let l = i.replace(/ +/g," ").split("#@#");
  if (l.length > 2) {
    t.push(`      <div><a class="name">${l[0]}</a> - <a class="vocal">${l[1]}</a> : <a class="link">${l[2]}</a></div>`);
  } else if (l.length != 0) {
    console.log(`오류발생 : ${i}`);
  }
}

fs.writeFileSync(output, t.join("\n"), "utf8");