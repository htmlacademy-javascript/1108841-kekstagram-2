const checkStringLength = (string, numberCharacters) =>
  string.length <= numberCharacters;

// checkStringLength('проверяемая строка', 20);

//---

const checkPalindrome = (palindrome) => {
  palindrome = palindrome.toUpperCase().replaceAll(' ', '');
  let reversePalindrome = '';
  for (let i = palindrome.length - 1; i >= 0; i--) {
    reversePalindrome += palindrome[i];
  }
  return reversePalindrome === palindrome;
};
//checkPalindrome('Лёша на полке клопа нашёл ');

//---
