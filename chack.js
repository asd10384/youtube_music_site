
const request = require("request");
const cheerio = require("cheerio");
const http = require('http');
const { readdirSync } = require('fs');
const { join } = require('path');
const { hostname } = require("os");


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
            text += `<div id="text">${v}-${n}</div>
            <div id="iframe">
                <iframe width="640" height="480" src="http://www.youtube.com/embed/${yturl}" frameborder="0" allowfullscreen></iframe>
            </div>`;
        });
        var app = http.createServer(async function (req, res) {
            res.writeHead(200);
            res.end(`<!DOCTYPE html><html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>음악들임베드</title>
            </head>
        
            <body>
                <style>
                    body {
                        padding:10px;
                        background-color:rgb(80, 80, 80);
                        align-items: center;
                        color: white;
                    }
                    
                    iframe[src*="http://www.youtube.com/embed/"] {
                        display:block;
                        margin:0px auto 10px;
                        border:2px solid white;
                    }
                </style>
                <div>
                    ${text}
                </div>
            </body>
        </html>`);
        });
        app.listen(25565);
        console.log(`http://localhost:25565`);
        
    }
});
