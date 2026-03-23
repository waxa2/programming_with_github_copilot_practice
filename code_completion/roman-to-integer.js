/**
 * create a node.js app that gets a roman numeral via user input
 * and outputs the integer value
 *
 */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const isRomanNumeral = (s) => {
return s.match(/^[IVXLCDM]+$/) !== null;
};

rl.question('Enter a Roman numeral: ', (answer) => {

	if (answer == 'help') {
		console.log('Roman numerals are a number system that originated in ancient Rome. They use combinations of letters from the Latin alphabet to represent values. The basic symbols are: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). To convert a Roman numeral to an integer, you can use the following rules: If a smaller numeral is placed before a larger numeral, it is subtracted from the larger numeral. If a smaller numeral is placed after a larger numeral, it is added to the larger numeral. For example, IV is 4 (5 - 1) and VI is 6 (5 + 1).');
		rl.close();
		return;
	}
	if (!isRomanNumeral(answer)) {
		console.log('Invalid Roman numeral. Please try again.');
		rl.close();
		return;
	}

	console.log(`The integer value of ${answer} is: ${romanToInt(answer)}`);
	rl.close();
});


function romanToInt(s) {
  let romanToInt= {
	'I': 1,
	'V': 5,
	'X': 10,
	'L': 50,
	'C': 100,
	'D': 500,
	'M': 1000
  };