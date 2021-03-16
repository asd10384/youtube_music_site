var { readdir } = require('fs');

readdir(`./`, function (err, filelist) {
    if (!err) {
        console.log(filelist);
    }
});
