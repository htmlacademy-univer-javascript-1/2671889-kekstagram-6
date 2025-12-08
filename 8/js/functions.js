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


const timeToMinutes = (timeStr) =>{
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};


const isMeetingInWorkTime = (startWorkTime, endWorkTime, startMeetingTime, durationMeetingMinutes)=>
  timeToMinutes(startMeetingTime) >= timeToMinutes(startWorkTime) &&
  timeToMinutes(startMeetingTime) + durationMeetingMinutes <= timeToMinutes(endWorkTime);


isMeetingInWorkTime('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkTime('8:0', '10:0', '8:0', 120);     // true
isMeetingInWorkTime('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkTime('14:00', '17:30', '08:0', 90);  // false
isMeetingInWorkTime('8:00', '17:30', '08:00', 900); // false


export {checkStringLength, checkPalindrome, getNumbersFromString};
