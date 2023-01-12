const ytdl = require("ytdl-core");
const fs = require("fs");
const { agent } = require("./config");

// 거북선(19) https://www.youtube.com/watch?v=idvFw4wr1S8
// 실버판테온 https://www.youtube.com/watch?v=ZP51xXhGnvM

ytdl.getInfo(`https://www.youtube.com/watch?v=idvFw4wr1S8`, {
  lang: "KR",
  requestOptions: {
    agent,
    headers: {
      "cookie": ""
    }
  }
}).then((val) => {
  // fs.writeFileSync("mainout.js", "let t = " + JSON.stringify(val, undefined, 2), "utf8");
  console.log(val.videoDetails?.title);
});