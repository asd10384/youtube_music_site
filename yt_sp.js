
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
 * node yt_sp.js 를 입력해 시작합니다.
*/

const FILE1 = 'SAVE';
const FILE2 = '출력2';



const fs = require('fs');

var file1_list = [];
var text = '';

fs.readFileSync(`${FILE1}`, {encoding:'utf-8'}).replace(/\<a class\=\"name\"\>.*\<\/a\>/gi, (txt) => {
    file1_list.push(txt);
});
console.log(`\n잠시뒤 "${FILE1}"을 셔플 합니다.\n`);
fs.writeFileSync(`./${FILE2}.html`, `${FILE1}\n`, {encoding:'utf-8'});
setTimeout(() => {
    var rl = [];
    var cy = 0;
    for (i=0; i<file1_list.length; i++) {
        var r = Math.floor(Math.random() * file1_list.length);
        if (rl.includes(r)) {
            i--;
            cy++;
            continue;
        } else {
            rl.push(r);
            cy = 0;
            console.log(`원본번호: ${Number(i)+1} -> 바뀐번호: ${Number(r)+1}`);
            makefile(file1_list[r]);
        }
    }
    console.log(`셔플 끝`);
}, 2500);

function makefile(text = '') {
    fs.appendFileSync(`./${FILE2}.html`, `\n${text}`, {encoding:'utf-8'});
}
