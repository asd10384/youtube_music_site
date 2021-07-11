
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
 * PLAYLIST 에 플레이리스트 주소 , FILE 에는 생성될 파일 이름을 적습니다.
 * 
 * node yt_cp.js 를 입력해 시작합니다.
 * 
 * 예시로 automake.html 파일을 제작했습니다.
*/

const FILE1 = 'K-POP-Mix/MIX-A/Q-1';
const FILE2 = 'K-POP-Mix/MIX-A/Q-2';



const fs = require('fs');

var file1_list = [],
    file2_list = [];
fs.readFileSync(`${FILE1}.html`, {encoding:'utf-8'}).replace(/\<a class\=\"name\"\>.*\<\/a\> \-/gi, (txt) => {
    file1_list.push(txt.replace(/\<a class\=\"name\"\>|\<\/a\> \-/gi,''));
});
fs.readFileSync(`${FILE2}.html`, {encoding:'utf-8'}).replace(/\<a class\=\"name\"\>.*\<\/a\> \-/gi, (txt) => {
    file2_list.push(txt.replace(/\<a class\=\"name\"\>|\<\/a\> \-/gi,''));
});

var text;
console.log(`\n비교 시작!\n`);
for (i in file1_list) {
    text = file1_list[i];
    if (file2_list.includes(text)) {
        console.log(`"${text}" 중복! 1번파일: ${Number(i)+1}번 , 2번파일: ${Number(file2_list.indexOf(text))+1}`);
    }
}
console.log(`\n비교 끝!\n`);

