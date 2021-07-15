
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
 * node yt_list.js 를 입력해 시작합니다.
 * 
 * 예시로 automake.html 파일을 제작했습니다.
 */

const PLAYLIST = 'https://youtube.com/playlist?list=PLuOLej6ED8uPVwK7mCg8kBtLgkZA_1bxJ';
const FILE = '추가';



const fs = require('fs');
const ytpl = require('ytpl');

const LISTID = PLAYLIST.match(/list=.*/g, '')[0].replace(/list=|\&.*/g,'');
var item;

ytpl(LISTID, {
    limit: 10000
}).catch(() => {
    return console.log('플레이리스트를 확인할수 없습니다.');
}).then((list) => {
    fs.writeFileSync(`./${FILE}.html`, `${list.url}\n${list.title} - ${list.estimatedItemCount}개\n`, {encoding:'utf-8'});
    console.log(`\n${list.title} - ${list.estimatedItemCount}개\n`);
    for (i in list.items) {
        item = list.items[i];
        fs.appendFileSync(`./${FILE}.html`, make(item.title, item.author.name, item.id), {encoding:'utf-8'});
        console.log(`${Number(i)+1}. ${item.title} - ${item.author.name}`);
    }
});

function make(name='', vocal='', link='') {
    return `\n            <div><a class="name">${name}</a> - <a class="vocal">${vocal}</a> : <a class="link">https://youtu.be/${link}</a></div><br />`;
}
