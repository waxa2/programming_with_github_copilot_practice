// node.js application to check if a string is a palindrome
// racecar , taco cat

// function to check if a string is a palindrome
function isPalindrome(str) {
	// remove non-alphanumeric characters and convert to lowercase
	str = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
	//reverse the string
	let reversedStr = str.split('').reverse().join('');
	// compare the original string with the reversed string
	return str === reversedStr;
}

// test cases
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("taco cat")); // true
console.log(isPalindrome("hello")); // false
