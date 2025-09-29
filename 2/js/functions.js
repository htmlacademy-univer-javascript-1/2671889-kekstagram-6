const checkStringLength = (string, length) => string.length <= length;


const checkPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  for (let i = 1; i <= normalizedString.length / 2; i++) {
    if (normalizedString[i - 1] !== normalizedString[normalizedString.length - i]) {
      return false;
    }
  }
  return true;
};


const getNumbersFromString = (string) => {
  string = string.toString();
  let result = 0;
  let numbersFounded = 0;
  for (let i = string.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i] * Math.pow(10, numbersFounded);
      numbersFounded += 1;
    }
  }
  if (numbersFounded === 0) {
    return NaN;
  }
  return result;
};
