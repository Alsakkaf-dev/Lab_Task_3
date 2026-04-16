// A JSON string representing a student
const jsonString = `{
    "name": "Ahmad Hafiz",
    "age": 22,
    "isEnrolled": true,
    "gpa": 3.8,
    "subjects": ["Math", "Physics", "Programming"],
    "address": {
        "city": "Johor Bahru",
        "country": "Malaysia"
    }
}`;

// Convert the string into a JavaScript Object
const studentObj = JSON.parse(jsonString);

// Print specific properties to the console
console.log("Name from JSON:", studentObj.name);
console.log("First Subject:", studentObj.subjects[0]);


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

// Step 1: Create the XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Step 2: Configure it
// We are using a free testing API: JSONPlaceholder
xhr.open("GET", "https://jsonplaceholder.typicode.com/users/1", true);

// Step 3: Define what happens when we receive the response
xhr.onload = function() {
    if (xhr.status === 200) { 
        // 200 = OK
        const data = JSON.parse(xhr.responseText);
        console.log("AJAX Success! User Name:", data.name);
        console.log("User Email:", data.email);
    } else {
        console.log("Error! Status code:", xhr.status);
    }
};

// Step 4: Handle network errors (like no internet)
xhr.onerror = function() {
    console.log("Network error occurred!");
};

// Step 5: Send the request
xhr.send();

console.log("--- This line runs BEFORE the AJAX data arrives! ---");




// --- Exercise 2: Interactive Classic AJAX ---

// 1. Get references to the UI elements
const loadBtn = document.getElementById('loadBtn');
const resultArea = document.getElementById('result');

// 2. Add the Event Listener
loadBtn.addEventListener('click', function() {
    resultArea.textContent = "Fetching data...";
    // We will put the request logic here next
});