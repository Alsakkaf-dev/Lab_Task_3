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





// ==========================================
// PART 2: AJAX (Asynchronous JavaScript and XML)
// ==========================================

// Step 1: Create the XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Step 2: Configure it
// We are using a free testing API: JSONPlaceholder
xhr.open("GET", "https://jsonplaceholder.typicode.com/users/1", true);

// Step 3: Define what happens when we receive the response
xhr.onload = function () {
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
xhr.onerror = function () {
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
loadBtn.addEventListener('click', function () {
    resultArea.textContent = "Fetching data...";
    // We will put the request logic : 
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "https://jsonplaceholder.typicode.com/users/1", true);

    xhr2.onload = function () {
        if (xhr2.status === 200) {
            const userData = JSON.parse(xhr2.responseText);

            // Display the specific data from the PDF: Name and Email
            resultArea.innerHTML = `
                User: ${userData.name} <br> 
                Email: ${userData.email}
            `;
        } else {
            resultArea.textContent = "Error loading data.";
        }
    };

    xhr2.send();
});





// ==========================================
// PART 3: Fetch API (Modern HTTP Requests)
// ==========================================

// 3.4 Modern Approach using async/await
async function getSingleUser() {
    try {
        console.log("Fetch: Starting request...");

        // Fetch returns a Promise. 'await' waits until it is done.
        const response = await fetch("https://jsonplaceholder.typicode.com/users/2");

        // Always check if the response was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // We must 'await' the conversion to JSON as well
        const data = await response.json();

        console.log("Fetch Success! User 2:", data.name);
    } catch (error) {
        console.log("Fetch Error:", error.message);
    }
}

// Call the function
getSingleUser();

// Example using .then() chains (Alternative Style)
fetch("https://jsonplaceholder.typicode.com/users/3")
    .then(res => res.json())
    .then(data => console.log("Fetch (Then style) Success! User 3:", data.name))
    .catch(err => console.log("Fetch (Then style) Error:", err));


// ==========================================
// PART 4: jQuery
// Section 4.1: Fast, small, feature-rich JS library.
// Motto: "Write Less, Do More."
// ==========================================
/**
 * UI Manipulation using jQuery
 * Simplified DOM access and modification
 */
/**
 * asynchronous fetch operation for the user directory
 * integrates Fetch API with DOM injection
 */
async function loadUsers() {
    const status = $("#status");
    const grid = $("#userGrid");

    status.text("Synchronizing data with server...");
    grid.empty(); // Clear existing entries

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Data retrieval failed");

        const users = await response.json();
        status.text(`Load successful: ${users.length} records processed.`);

        // Dynamic construction of user card components
        users.forEach(user => {
            const cardMarkup = `
                <div class="card">
                    <h3>${user.name}</h3>
                    <p>📧 Email: ${user.email}</p>
                    <p>📍 Location: ${user.address.city}</p>
                </div>
            `;
            grid.append(cardMarkup);
        });
    } catch (err) {
        status.text("Critical error during data fetch: " + err.message);
    }
}
$(document).ready(function () {
    // Applying global header styles via jQuery selectors
    $(".main-title").css({
        "padding-bottom": "10px",
        "border-bottom": "2px solid #2E75B6"
    });

    // Update operational status indicator
    $("#status").text("Application systems initialized. Ready to fetch data.");
    // Interactive event handler for grid visibility
    $("#toggleBtn").on("click", function () {
        // Toggle user cards with transition animation
        $("#userGrid").slideToggle(400);

        // Provide contextual feedback on button text
        $(this).text($(this).text().includes("Hide") ? "Show Viewport" : "Hide Viewport");
    });
});


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