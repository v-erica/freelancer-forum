/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === State ====
// data that might change or update during the lifetime of the application

function generateFreelancer(nameArr, occArr, price) {
  // making a function where you can plug in multiple arrays with data

  const randomName = Math.floor(Math.random() * nameArr.length);
  // Math.random() generates a random number (between 0 and 1)
  // multiply by array length
  // convert decimal to integer with Math.floor()
  // use to plug in for given index / name from the array
  const randomOcc = Math.floor(Math.random() * occArr.length);
  // generates a random occupation from the array
  const randomPrice =
    Math.floor(Math.random() * (price.max - price.min + 1)) + price.min;
  // this one's a little different since this is a range, not an array.
  // It generates a random index number from the length of the what-would-be array
  // then we add the min because it has to be in range

  const freelancer = {
    name: nameArr[randomName],
    occupation: occArr[randomOcc],
    rate: randomPrice,
  };

  return freelancer;

  // This part creates a single object with randomized data from the original arrays
}

let freelancersArr = Array.from({ length: NUM_FREELANCERS }, () =>
  generateFreelancer(NAMES, OCCUPATIONS, PRICE_RANGE)
);

// We're creating an array freelancersArr (with NUM_FREELANCERS items) by using the Array.from() method

// Array.from({ length: NUM_FREELANCERS},... basically means create an empty array shell of a specific size
// [undefined, undefined, undefined,...]

// () => generateFreelancer() is a concise way of saying "run the generateFreelancer function for every empty item"

function getRateAvg(arr) {
  if (arr.length === 0) return 0;
  // if the plugged in array is empty, return 0

  let rateSum = 0;
  // declare variable to start with outside of the loop

  for (const item of arr) {
    // "for every item in the given array"
    rateSum += item.rate;
    // "add the rate to the running total stored in rateSum"
  }

  return rateSum / arr.length;
  // return the running total divided by the number of items in the array (aka the average)
}

let avgRate = getRateAvg(freelancersArr);

// === Components ===
// where we return HTML nodes using javascript functions

// TODO: Write a component function to represent a single freelancer.

function createRow(freelancer) {
  const $tr = document.createElement("tr");
  // this creates HTML element <tr></tr>, and we're storing it under $tr
  $tr.innerHTML = `
    <td>${freelancer.name}</td>
    <td>${freelancer.occupation}</td>
    <td>$${freelancer.rate}</td>
  `;
  // we're adding <td> elements within the <tr> tags

  return $tr;
}

// TODO: 6. Write a component function to represent an array of freelancers.
// It's basically asking us to represent the list of freelancers in HTML

function appendRows() {
  const $tbody = document.createElement("tbody");
  const $trows = freelancersArr.map(createRow);
  $tbody.replaceChildren(...$trows);
  return $tbody;
}

// creating the base table here and adding in all of the rows at once.

// TODO: 7. Write a component function to represent the average rate of all freelancers.
// In the example, the average rate is centered text above the table

function avgText(rate) {
  const $p = document.createElement("p");
  $p.textContent = `The average rate is $${rate.toFixed(2)}.`;
  return $p;
}

// TODO: 8. Write and call a render function that will mount the application onto the document.

// start with figuring out where the target is in the HTML ->

function render() {
  const $div = document.querySelector("#app");

  // what's going inside the div tags?
  $div.innerHTML = `
      <h1>Freelancer Forum</h1>
      <AvgPlaceholder></AvgPlaceholder>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Occupation</th>
            <th>Rate</th>
          </tr>
        </thead>
      <tbody id="tbodyReplace"></tbody>
      </table>
      `;
  // innerHTML shouldn't be used to run js functions
  // innerHTML creates the structure. Js functions return nodes.
  // create element anchors that we'll replace with .replaceWith(function())
  $div.querySelector("AvgPlaceholder").replaceWith(avgText(avgRate));
  $div.querySelector("#tbodyReplace").replaceWith(appendRows());
}

render();

// === Thoughts ===

// we should probably create a table to insert this into
// (but I think we can do that under render since we only need to do it once)

// so lets figure out how to populate a row of data into a table
// results?

// here's the HTML we'll need in backticks to create the base of the table to insert the rows into

// `
// <table id="user-table">
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>Age</th>
//       <th>Email</th>
//     </tr>
//   </thead>
//   <tbody>
//     <!-- rows will go here -->
//   </tbody>
// </table>
// `

// and here are the steps:
// 1. Select the the table body we're going to create later

// const tableBody = document.querySelector("#user-table tbody");

// 2. Create a new table row

// const row = document.createElement("tr");

// 3. Create cells from object values

// const nameCell = document.createElement("td");
// nameCell.textContent = user.name;

// const ageCell = document.createElement("td");
// ageCell.textContent = user.age;

// const emailCell = document.createElement("td");
// emailCell.textContent = user.email;

// 4. Append cells to the row

// row.appendChild(nameCell);
// row.appendChild(ageCell);
// row.appendChild(emailCell);

// 5. Append row to the table body
// tableBody.appendChild(row);
