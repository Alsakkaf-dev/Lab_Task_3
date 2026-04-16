// Convert the string into a JavaScript Object
const studentObj = JSON.parse(jsonString);

// Print specific properties to the console
console.log("Name from JSON:", studentObj.name);
console.log("First Subject:", studentObj.subjects[0]);

// A JSON string representing a student
const jsonString = `{
    "name": "Ahmad Hafiz",
    "age": 22,
    "isEnrolled": true,
    "gpa": 3.8
    "subjects": ["Math", "Physics", "Programming"],
    "address": {
        "city": "Johor Bahru",
        "country": "Malaysia"
}`;

// A standard JavaScript object
const myData = { 
    name: "Siti", 
    age: 21 
};

// Convert the object into a JSON string
const resultString = JSON.stringify(myData);

console.log("The stringified version:", resultString);

// Pretty-print version (makes it easier to read in the console)
console.log(JSON.stringify(myData, null, 2));