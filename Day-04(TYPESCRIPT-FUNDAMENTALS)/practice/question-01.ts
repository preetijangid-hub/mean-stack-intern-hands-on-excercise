let firstName: string = "Preeti";
let lastName: string = "Jangid";

function getFullName(first: string, last: string): string {
  return `${first} ${last}`;
}

console.log(getFullName(firstName, lastName));