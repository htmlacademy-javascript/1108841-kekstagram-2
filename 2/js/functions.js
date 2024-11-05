const checkStringLength = (string = '', numberCharacters = 1) =>
  string.length <= numberCharacters;

checkStringLength();

const checkPalindrome = (palindrome = '') => {
  palindrome = palindrome.toUpperCase().replaceAll(' ', '');
  let reversePalindrome = '';
  for (let i = palindrome.length - 1; i >= 0; i--) {
    reversePalindrome += palindrome[i];
  }
  return reversePalindrome === palindrome;
};

checkPalindrome();

const getDigits = (string = '') => {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const dig = string[i];
    if (!isNaN(parseInt(dig, 10))) {
      result += dig;
    }
  }
  const finalResult = parseInt(result, 10);
  return Number.isNaN(finalResult) ? NaN : finalResult;
};

getDigits();
