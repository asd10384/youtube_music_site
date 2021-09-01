
/**
 * 기본설정
 * npm install 을 터미널에 입력해 기본 모듈을 다운로드 받습니다.
 * vscode 아래에 터미널이 없다면 위쪽 터미널 탭에서 새터미널을 실행하거나
 * 단축키 (Ctrl + Shift + `) 를 사용해 터미널을 열수 있습니다.
 * 
 * 오류
 * npm install 을 했을때 설치가 안되고 오류가 난다면
 * https://nodejs.org/dist/v14.17.3/node-v14.17.3-x64.msi
 * 위의 주소를 사용해 node.js 를 다운로드 받고
 * npm install 을 터미널에 입력합니다.
 * 
 * 사용법
 * node yt_ko.js 를 입력해 시작합니다.
 * 
 * 예시로 autoko.html 파일을 제작했습니다.
*/

const 출력파일 = 'autoko';





const fs = require('fs');
const ytdl = require('ytdl-core');

var file1_list = fs.readdirSync('./'),
  file2_list = [],
  file3_list = [],
  allfile = [];
for (file1 of file1_list) {
  if (file1 == '.git' || file1 == 'image' || file1 == 'node_modules' || file1 == '그림퀴즈') continue;
  if (fs.lstatSync(`./${file1}`).isDirectory()) {
    file2_list = fs.readdirSync(`./${file1}/`);
    if (file2_list) {
      for (file2 of file2_list) {
        if (fs.lstatSync(`./${file1}/${file2}`).isDirectory()) {
          file3_list = fs.readdirSync(`./${file1}/${file2}/`);
          for (i in file3_list) {
            if (file3_list[i].match(/.*\.html/)) {
              file3_list[i] = `${file1}/${file2}/${file3_list[i]}`;
            } else {
              file3_list.splice(i, 1);
            }
          }
          allfile = allfile.concat(file3_list);
        }
      }
    }
  }
}

file1_list = [];
fs.writeFileSync(`./${출력파일}.txt`, '', {encoding:'utf-8'});
console.log(`\n잠시뒤 총 ${allfile.length}개의 파일을 확인합니다.\n`);
setTimeout(async () => {
  for (f in allfile) {
    var FILE1 = allfile[f];
    console.log(`${FILE1} 확인시작 ${Number(f)+1}/${allfile.length}`);
    file1_list = [];
    fs.readFileSync(`${FILE1}`, {encoding:'utf-8'}).replace(/\<a class\=\"link\"\>.*\<\/a\>/gi, async (txt) => {
      file1_list.push(txt.replace(/\<a class\=\"link\"\>|\<\/a\>/gi,''));
    });
    for (i in file1_list) {
      try {
        var val = await ytdl.getInfo(file1_list[i]);
        console.log(`${FILE1} : ${file1_list[i]} 확인중`);
        if (!val.videoDetails.availableCountries.includes('KR')) {
          makefile(`한국에서안됨 : "${FILE1}"파일: ${Number(i)+1}번 - ${file1_list[i]}`);
        }
      } catch(err) {
        makefile(`영상재생오류 : "${FILE1}"파일: ${Number(i)+1}번 - ${file1_list[i]}`);
      }
    }
    console.log(`${FILE1} 확인완료`);
  }
  console.log(`${FILE1} 끝`);
}, 3500);


function makefile(text = '') {
  console.log(text);
  fs.appendFileSync(`./${출력파일}.txt`, `${text}\n`, {encoding:'utf-8'});
}
