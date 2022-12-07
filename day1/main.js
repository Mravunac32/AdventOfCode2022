const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
    let currentCalories = 0;
    const allCalories = [];

    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('InputFile.txt'),
            crlfDelay: Infinity
        });

        rl.on('line', (calories) => {
            currentCalories += +calories;

            if (!calories) {
                allCalories.push(currentCalories);
                currentCalories = 0;
            }

        });
        await events.once(rl, 'close');
    } catch (err) {
        console.error(err);
    }

    allCalories.sort((a,b) => b - a);

    console.log(`Max calories:  ${allCalories[0]}, second max calories: ${allCalories[1]}, third max calories: ${allCalories[2]}`);
    console.log(`Total calories for first three Elves: ${allCalories[0] + allCalories[1] + allCalories[2]}`);
})();

