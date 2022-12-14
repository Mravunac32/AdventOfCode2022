const events = require('events');
const fs = require('fs');
const readline = require('readline');

const smallLetters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
const capitalLetters = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));

const alphabet = [...smallLetters, ...capitalLetters];

(async function processLineByLine() {

    let totalValue = 0;
    let totalValueGrouped = 0;

    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('InputFile.txt'),
            crlfDelay: Infinity
        });

        let index = 0;
        let group = [];

        rl.on('line', (result) => {

            const length = result.length;

            const firstComp = result.substr(0, (length / 2) );
            const secondComp = result.substr(length / 2 , length);

            const sameValues = new Set();

            for (let i = 0;  i < firstComp.length; i++ ) {
                for (let j =0; j < secondComp.length; j++) {
                    if (firstComp[i] === secondComp[j]) {
                        sameValues.add(firstComp[i]);
                    }
                }
            }

            group.push(result);
            index++;

            if (index === 3) {
                const sameValuesGrouped = new Set();

                const firstBag = group[0];
                const secondBag = group[1];
                const thirdBag = group[2];

                for (let i = 0;  i < firstBag.length; i++ ) {
                    for (let j =0; j < secondBag.length; j++) {
                        for (let l = 0; l < thirdBag.length; l++) {
                            if (firstBag[i] === secondBag[j] && secondBag[j] === thirdBag[l]) {
                                sameValuesGrouped.add(firstBag[i]);
                            }
                        }
                    }
                }

                totalValueGrouped += alphabet.findIndex(letter => sameValues.has(letter)) + 1;

                index = 0;
                group = [];
            }

            totalValue += alphabet.findIndex(letter => sameValues.has(letter)) + 1;
        });
        await events.once(rl, 'close');
    } catch (err) {
        console.error(err);
    }

    console.log(`Total value of priorities: ${totalValue}`);
    console.log(`Total value of priorities in groups: ${totalValueGrouped}`);

})();
