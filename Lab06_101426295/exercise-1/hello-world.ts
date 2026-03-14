let firstName: string = "Denrick";
let lastName: string = "Viera";

const greet = (first: string, last: string): string => {
    return `Hello ${first} ${last}`;
};

console.log(greet(firstName, lastName));