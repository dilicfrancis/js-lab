/*
Validate phone numbers entered into the text field. As the number is entered, check to see if it matches these formats: (nnn)-nnn-nnnn, nnn.nnn.nnnn, nnn-nnn-nnnn, nnnnnnnnnn, (nnn)nnn-nnnn. If the number matches, change the text color from red to green.

Use several different phone numbers to test.

HINT: You can use the keyup event to respond to entered text. There is a CSS Class for red and green.
*/

// Separate regex

// (function () {
//   const textField = document.getElementById("phone");

//   textField.addEventListener("keyup", function () {
//     if (/\(\d{3}\)\d{3}-\d{4}/.test(textField.value))
//       textField.className = "green";
//     else if (/\d{3}\.\d{3}\.\d{4}/.test(textField.value))
//       textField.className = "green";
//     else if (/\d{3}-\d{3}-\d{4}/.test(textField.value))
//       textField.className = "green";
//     else if (/\d{10}/.test(textField.value)) textField.className = "green";
//     else if (/\(\d{3}\)-\d{3}-\d{4}/.test(textField.value))
//       textField.className = "green";
//     else textField.className = "red";
//   });
// })();

// Combined regex

(function () {
  const textField = document.getElementById("phone");

  textField.addEventListener("keyup", function () {
    if (/\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/.test(textField.value))
      textField.className = "green";
    else textField.className = "red";
  });
})();
