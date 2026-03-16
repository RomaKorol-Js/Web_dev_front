let Basicfunk = () => {
  const a = 1;
  const b = 3;
  console.log(a, b);
  console.log(a + b);
  console.log(a - b);
  console.log(a * b);
  console.log(a / b);
};

Basicfunk();
console.log("---------------");

let Fullname = () => {
  const firstName = "Roma";
  const lastName = "Korol";
  const greating = "Hi";
  console.log(greating + ", " + firstName + " " + lastName + "!");
};
Fullname();
console.log("---------------");

let isAgeValid = (age) => {
  if (age > 18) {
    console.log("Access allowed");
  } else {
    console.log("Access rejected");
  }
};
isAgeValid(14);
isAgeValid(19);
console.log("---------------");

let numbersfromOneToTen = () => {
  for (let i = 1; i <= 10; i++) {
    console.log(i);
  }
};
numbersfromOneToTen();

console.log("---------------");

function square(number) {
  return number * number;
}
console.log(square(5));
console.log("---------------");
let fruitsCount = () => {
  let fruits = ["Orange", "Lime", "Pear"];
  fruits.push("apple");
  console.log(fruits);
};
fruitsCount();
