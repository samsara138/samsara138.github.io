function ListToAscii() {
  const input = GetElementInsideContainer("ListToAscii", "ListInput");
  const output = GetElementInsideContainer("ListToAscii", "AsciiOutput");

  var inputValue = input.value;
  if (inputValue.startsWith("[")) {
    inputValue = inputValue.slice(1);
  }
  if (inputValue.endsWith("]")) {
    inputValue = inputValue.slice(0, -1);
  }

  // Split the input by space or comma, depending on which is found
  var delimiter = inputValue.includes(",") ? "," : " ";
  var arr = inputValue.split(delimiter);

  // Remove empty elements and trim spaces from remaining elements
  arr = arr.filter(function (element) {
    // Remove leading and trailing spaces using trim
    var trimmedElement = element.trim();
    // Keep non-empty elements
    return trimmedElement !== "";
  });

  // Convert each element to its relevant ASCII character
  var asciiArr = arr.map(function (element) {
    // Try to parse the element as an integer
    var intValue = parseInt(element, 10);
    // Check if parsing was successful and within the valid ASCII range (0-127)
    if (!isNaN(intValue) && intValue >= 0 && intValue <= 127) {
      // Convert the integer to the corresponding ASCII character
      return String.fromCharCode(intValue);
    } else {
      // If parsing failed or the value is out of range, leave it unchanged
      return element;
    }
  });

  output.innerHTML = asciiArr.join("");
}

function GeneratePassword() {
  const output = GetElementInsideContainer("PwdGenerator", "PasswordOutput");
  const passwordLength = GetElementInsideContainer("PwdGenerator", "PasswordLength");
  const uppercaseCheckbox = GetElementInsideContainer("PwdGenerator", 'uppercaseCheckbox');
  const lowercaseCheckbox = GetElementInsideContainer("PwdGenerator", 'lowercaseCheckbox');
  const numbersCheckbox = GetElementInsideContainer("PwdGenerator", 'numbersCheckbox');
  const symbolsCheckbox = GetElementInsideContainer("PwdGenerator", 'symbolsCheckbox');

  const numberChars = '0123456789';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let validChars = '';
  let generatedPassword = '';

  if (numbersCheckbox.checked) {
    validChars += numberChars;
    const randomIndex = Math.floor(Math.random() * numberChars.length);
    generatedPassword += numberChars.charAt(randomIndex);
  }
  if (lowercaseCheckbox.checked) {
    validChars += lowercaseChars;
    const randomIndex = Math.floor(Math.random() * lowercaseChars.length);
    generatedPassword += lowercaseChars.charAt(randomIndex);
  }
  if (uppercaseCheckbox.checked) {
    validChars += uppercaseChars;
    const randomIndex = Math.floor(Math.random() * uppercaseChars.length);
    generatedPassword += uppercaseChars.charAt(randomIndex);
  }
  if (symbolsCheckbox.checked) {
    validChars += symbolChars;
    const randomIndex = Math.floor(Math.random() * symbolChars.length);
    generatedPassword += symbolChars.charAt(randomIndex);
  }

  while (generatedPassword.length < passwordLength.value) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    generatedPassword += validChars.charAt(randomIndex);
  }

  generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

  output.innerHTML = generatedPassword;
}


function GetElementInsideContainer(containerID, childID) {
  var elm = {};
  var elms = document.getElementById(containerID).getElementsByTagName("*");
  for (var i = 0; i < elms.length; i++) {
    if (elms[i].id === childID) {
      elm = elms[i];
      break;
    }
  }
  return elm;
}
