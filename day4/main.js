const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {

    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('InputFile.txt'),
            crlfDelay: Infinity
        });

        rl.on('line', (result) => {

        });
        await events.once(rl, 'close');
    } catch (err) {
        console.error(err);
    }

})();
