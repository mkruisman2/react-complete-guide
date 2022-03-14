import { isYieldExpression } from "typescript";

//primitives: numbers, strings, booleans
let age: number = 24;
age = 34;

let userName: string;
userName = "Marit";

let isInstructor: boolean;
isInstructor = false;

//more complex types: arrays & objects

let hobbies: string[]; //Array of strings
hobbies = ["dancing", "boxing"];

let person: {
  name: string;
  age: number;
};

person = {
  name: "Marit",
  age: 34,
};

let people: {
  name: string;
  age: number;
}[];

people = [
  { age: 34, name: "Marit" },
  { age: 40, name: "Max" },
];

//Union Types: allowing multiple types inside a variable
let course: string | number = "React - The Complete Guide";
course = 12341;

// Type Aliases
type Animal = {
  name: string;
  numberOfLegs: number;
};

let animal: Animal;
animal = {
  name: "Rocco",
  numberOfLegs: 4,
};

let animals: Animal[];
animals = [
  { name: "Boris", numberOfLegs: 4 },
  { name: "Pietje", numberOfLegs: 2 },
];

// Functions and types
function add(a: number, b: number) {
  return a + b;
}

function printOutput(value: any) {
  console.log(value);
}

//Generics
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArrayOne = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArrayOne, -1);
const stringArray = insertAtBeginning(["b", "c", "d"], "a");

// Without Generics. Typescript won't know what type of array it will return and won't check whether array and value will have the same type.
function insertAtTheBeginning(array: any[], value: any) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArrayTwo = [1, 2, 3];

const updatedArrayTwo = insertAtTheBeginning(demoArrayTwo, -1);
updatedArrayTwo[0].split(""); // Typescript does not know that this is an array of numbers and won't warn you that you cannot split a number!!
const stringArrayTwo = insertAtTheBeginning(["b", "c", "d"], 2); // Typescript will allow you to add a number value to the array of strings here.