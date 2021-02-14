
/*
    npm i
    node chack.js
*/

const request = require("request");
const cheerio = require("cheerio");
const { writeFileSync } = require('fs');

var url = `http://ytms.netlify.app`;
request(url, async function (err, res, html) {
    if (!err) {
        var $ = cheerio.load(html);
        var text = '';
        var chack = /(?:http:\/\/|https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?/gi;
        $('body div.music div').each(function () {
            var n = $(this).children('a.name').text().trim();
            var v = $(this).children('a.vocal').text().trim();
            var l = $(this).children('a.link').text().trim();
            var yturl = l.replace(chack, '').replace(/(?:&(.+))/gi, '');
            text += `<div id="m"><div id="text">${v}-${n}</div><div id="iframe"><iframe width="480" height="320" src="http://www.youtube.com/embed/${yturl}" frameborder="0" allowfullscreen></iframe></div>\n`;
        });
        writeFileSync('./html.txt', text, async function (err) {
            if (!err) {
                return console.log('good');
            }
            return console.log('bad!');
        });
    }
});
