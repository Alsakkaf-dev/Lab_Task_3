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

// --- Exercise 1 ---

// 1. Creating the JavaScript Object (about myself)
const aboutMe = {
    "fullName": "Mohammed_Alsakkaf",
    "age": 23,
    "hobbies": ["Coding", "Gaming", "Reading"],
    "address": {
        "city": "Johor Bahro",
        "country": "Malaysia"
    }
};

// 2. Verifying by converting it to string
const myJson = JSON.stringify(aboutMe);
console.log("Exercise 1 JSON:", myJson);

// 3. Verifying by parsing it back
console.log("Verified Object:", JSON.parse(myJson));

// ==========================================
// PART 2: AJAX (Asynchronous JavaScript and XML)
// ==========================================

