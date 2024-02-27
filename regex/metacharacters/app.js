/*
Using the provided array, create a second array that only includes the numbers with the 801 area code. (The area code is the first 3 numbers.)
*/

let phoneNums = [
  "801-766-9754",
  "801-545-5454",
  "435-666-1212",
  "801-796-8010",
  "435-555-9801",
  "801-009-0909",
  "435-222-8013",
  "801-777-6655",
  "801-777-665-",
  "801-77A-6655",
  "801-778-665",
];

const newArr = phoneNums.filter((e) => e.match(/801-/));
// console.log(newArr);
const newArray = phoneNums.filter((e) =>
  // /801-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/.test(e)
  /801-\d\d\d-\d\d\d\d/.test(e)
);
console.log(newArray);

const arr = [];
for (let i = 0; i < phoneNums.length; i++) {
  if (/801-/.test(phoneNums[i])) arr.push(phoneNums[i]);
}
// console.log(arr);
