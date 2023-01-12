const ytpl = require("ytpl");
const fs = require('fs');
const { agent } = require("./config");

const playListUrl = "https://www.youtube.com/playlist?list=sss";


const playListId = playListUrl.match(/list=.*/g, '')[0].replace(/list=|\&.*/g,'');

ytpl(playListId, {
  gl: "KR",
  requestOptions: {
    agent
  },
  limit: 100000
}).then((val) => {
  let t = `      <div>${val.title} 총 ${val.items.length}곡<div>\n      <div>${val.url}<div>\n`;
  for (let i=0; i<val.items.length; i++) {
    let item = val.items[i];
    t += `\n      <div><a class="name">${item.title}</a> - <a class="vocal">${item.author.name}</a> : <a class="link">https://youtu.be/${item.id}</a></div>`;
  }
  fs.writeFileSync("ytplOutput.html", t, "utf8");
});