const events = require('events');
const fs = require('fs');
const readline = require('readline');

const shapeValues = {
    'X': 1,
    'Y': 2,
    'Z': 3
};

const resultValues = {
    'win': 6,
    'draw' : 3,
    'loss': 0
};

const riggedValues = {
    'X': 'loss',
    'Y': 'draw',
    'Z': 'win'
}

const conditions = {
    'X-A': 'draw',
    'X-B': 'loss',
    'X-C': 'win',
    'Y-A': 'win',
    'Y-B': 'draw',
    'Y-C': 'loss',
    'Z-A': 'loss',
    'Z-B': 'win',
    'Z-C': 'draw'
};

// Note win and lose is inverted for each letter, because we are picking a shape in terms on how we play not the opponent
const reversedConditions = {
    A: {
      'draw': 'X',
      'loss': 'Z',
      'win': 'Y',
    },
    B: {
        'draw': 'Y',
        'loss': 'X',
        'win': 'Z',
    },
    C: {
        'draw': 'Z',
        'loss': 'Y',
        'win': 'X',
    }
};

(async function processLineByLine() {

    let normalScore = 0;
    let riggedScore = 0;

    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('InputFile.txt'),
            crlfDelay: Infinity
        });

        rl.on('line', (result) => {
            result = result
                .split('')
                .filter((el) => el !== ' ')
                .reverse()
                .join('-');

            const pickedShape = result.split('-')[0];
            const oppShape = result.split('-')[1];

            normalScore += resultValues[conditions[result]] + shapeValues[pickedShape];

            riggedScore += resultValues[riggedValues[pickedShape]] + shapeValues[reversedConditions[oppShape][riggedValues[pickedShape]]]

        });
        await events.once(rl, 'close');
    } catch (err) {
        console.error(err);
    }

    console.log(`Part 1 score: ${normalScore}`);
    console.log(`Part 2 score: ${riggedScore}`);
})();

