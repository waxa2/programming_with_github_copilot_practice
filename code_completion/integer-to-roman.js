// Integer to roman numeral app
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const isInteger = (s) => {
  const integerRegex = /^\d+$/;
  return integerRegex.test(s);
};

rl.question('Enter an integer: ', (answer) => {
  if (!isInteger(answer)) {
    console.log('Invalid input. Please enter a valid integer.');
    rl.close();
    return;
  }

  const num = parseInt(answer, 10);
  console.log(`The Roman numeral representation of ${num} is: ${intToRoman(num)}`);
  rl.close();
});

const intToRoman = (num) => {
  const romanNumerals = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  let result = '';
  for (const [roman, value] of romanNumerals) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }

  return result;
};