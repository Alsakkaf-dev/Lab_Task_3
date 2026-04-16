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