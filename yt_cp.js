
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
 * node yt_cp.js 를 입력해 시작합니다.
 * 
 * 예시로 automake.html 파일을 제작했습니다.
*/

const FILE1 = 'K-POP-MIX/MIX-A/Q-1';
const FILE_SET = '파일비교결과';



const fs = require('fs');

var file1_list = fs.readdirSync('./'),
    file2_list = [],
    file3_list = [],
    remove = [],
    allfile = [];
for (file1 of file1_list) {
    if (file1 == '.git' || file1 == 'image' || file1 == 'node_modules') continue;
    if (fs.lstatSync(`./${file1}`).isDirectory()) {
        file2_list = fs.readdirSync(`./${file1}/`);
        if (file2_list) {
            for (file2 of file2_list) {
                if (fs.lstatSync(`./${file1}/${file2}`).isDirectory()) {
                    file3_list = fs.readdirSync(`./${file1}/${file2}/`);
                    remove = [];
                    for (i in file3_list) {
                        file3_list[i] = `${file1}/${file2}/${file3_list[i]}`;
                        if (file3_list[i] == `${FILE1}.html`) {
                            remove.push(i);
                        }
                    }
                    for (r of remove) {
                        file3_list.splice(r, 1);
                    }
                    allfile = allfile.concat(file3_list);
                }
            }
        }
    }
}

file1_list = [];
file2_list = [];
var text = '';
fs.readFileSync(`${FILE1}.html`, {encoding:'utf-8'}).replace(/\<a class\=\"name\"\>.*\<\/a\> \-/gi, (txt) => {
    file1_list.push(txt.replace(/\<a class\=\"name\"\>|\<\/a\> \-/gi,''));
});
fs.writeFileSync(`./${FILE_SET}.txt`, '', {encoding:'utf-8'});
makefile(`\n잠시뒤 "${FILE1}"과 총 ${allfile.length}개의 파일을 비교합니다.\n`);
setTimeout(() => {
    for (FILE2 of allfile) {
        file2_list = [];
        makefile(`${FILE2}파일과 비교 하는중`);
        fs.readFileSync(`${FILE2}`, {encoding:'utf-8'}).replace(/\<a class\=\"name\"\>.*\<\/a\> \-/gi, (txt) => {
            file2_list.push(txt.replace(/\<a class\=\"name\"\>|\<\/a\> \-/gi,''));
            for (i in file1_list) {
                text = file1_list[i];
                if (file2_list.includes(text)) {
                    makefile(`중복발견 => 제목: ${text} , 1번파일: ${Number(i)+1}번 , 2번파일: ${Number(file2_list.indexOf(text))+1}`);
                }
            }
        });
        makefile(`${FILE2}파일과 비교 끝`);
    }
    makefile(`\n비교 끝\n`);
}, 3500);


function makefile(text = '') {
    console.log(text);
    fs.appendFileSync(`./${FILE_SET}.txt`, `${text}\n`, {encoding:'utf-8'});
}
