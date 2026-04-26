// A JSON string representing a student
const jsonString = `{
    "name": "Mohammed Alsakkaf",
    "age": 23,
    "isEnrolled": true,
    "gpa": 3.8,
    "subjects": ["Software Engineering", "Databases", "Networking"],
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
// PART 4: jQuery (Interaction & Search)
// ==========================================

let searchCache = []; // Global cache for search performance

/**
 * Perform server synchronization for the card grid
 */
async function loadUsers() {
    const status = $("#status");
    const grid = $("#userGrid");

    status.text("Synchronizing...").css("color", "#666");
    grid.empty();

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Synchronization failure");
        const users = await response.json();
        
        status.text(`System check: ${users.length} records active.`);
        users.forEach(user => {
            grid.append(`
                <div class="card">
                    <h3>${user.name}</h3>
                    <p>📧 ${user.email}</p>
                    <p>📍 ${user.address.city}</p>
                </div>
            `);
        });
    } catch (err) {
        status.text("Error: " + err.message).css("color", "red");
    }
}

/**
 * jQuery Shorthand Request Logic
 */
function loadUserWithJQuery() {
    const url = "https://jsonplaceholder.typicode.com/users/3";
    $.get(url, function(data) {
        $("#result").html(`<strong>Target Identifer:</strong> ${data.name}`);
    });
}

// Ensure DOM elements are available before binding events
$(document).ready(function () {
    // UI Stylings
    $(".main-title").css("border-bottom", "3px solid #2E75B6");
    $("#status").text("Operations ready. Search system initialized.");

    // Primary UI Event Handlers
    $("#jqLoadBtn").on("click", loadUserWithJQuery);
    
    $("#toggleBtn").on("click", function () {
        $("#userGrid").slideToggle(400);
        $(this).text($(this).text().includes("Hide") ? "Show Grid" : "Hide Grid");
    });

    // 4.8 Search Implementation
    // Pre-load data for live search to ensure speed
    $.get("https://jsonplaceholder.typicode.com/users", function(users) {
        searchCache = users;
    });

    $("#searchBox").on("keyup", function() {
        const query = $(this).val().toLowerCase();
        const results = $("#searchResults");
        results.empty();

        if (query === "") return;

        const matches = searchCache.filter(u => u.name.toLowerCase().includes(query));
        
        if (matches.length > 0) {
            $("#searchStatus").text(`Index matches found: ${matches.length}`);
            matches.forEach(u => results.append(`<div class="card"><h3>${u.name}</h3><p>${u.email}</p></div>`));
        } else {
            $("#searchStatus").text("Query returned zero matches.");
        }
    });
});

// ==========================================
// PART 5: Final Project (Integrated System)
// Using REST Countries API with JSON + Fetch + jQuery
// ==========================================

/**
 * Executes a full-stack search for national data
 * @param {string} name - The country query
 */
async function searchCountry(name) {
    $("#error").text("");
    $("#card").hide();

    try {
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Regional entity not identified.");

        const data = await response.json();
        const country = data[0];

        // Component update using jQuery
        $("#flag").attr("src", country.flags.png);
        $("#countryName").text(country.name.common);
        
        // Dynamic construction of info table
        const population = country.population.toLocaleString();
        const region = country.region;
        const capital = country.capital ? country.capital[0] : "N/A";

        $("#info").html(`
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Population:</strong> ${population}</p>
        `);

        $("#card").fadeIn(600);

    } catch (err) {
        $("#error").text("Identification failed: " + err.message);
    }
}

/**
 * Bind Search Trigger in main scope
 */
$(document).ready(function() {
    $("#searchBtn").on("click", function() {
        const query = $("#countryInput").val().trim();
        if (query) searchCountry(query);
    });

    // Support for Enter key functionality
    $("#countryInput").keypress(function(e) {
        if (e.which == 13) $("#searchBtn").click();
    });
});

// ==========================================
// ADDITIONAL CHALLENGES (Exercise 3 & 4)
// ==========================================

// Challenge 3A: Load first 5 posts
$("#loadPostsBtn").on("click", async function() {
    const resArea = $("#challengeResult");
    resArea.html("Loading posts...");
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();
        const firstFive = posts.slice(0, 5); // Get only the first 5

        resArea.empty();
        firstFive.forEach(post => {
            resArea.append(`<p style="border-bottom:1px solid #ccc; padding:5px;"><strong>Title:</strong> ${post.title}<br><em>${post.body}</em></p>`);
        });
    } catch (err) {
        resArea.text("Error loading posts.");
    }
});

// Challenge 3B: Specific User by ID
$("#specificUserBtn").on("click", async function() {
    const id = $("#userIdInput").val();
    const resArea = $("#challengeResult");
    
    if(!id || id < 1 || id > 10) {
        resArea.text("Please enter a valid ID (1-10)");
        return;
    }

    resArea.html("Fetching user...");
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error();
        const user = await response.json();
        resArea.html(`Target Found: ${user.name} from ${user.address.city}`);
    } catch (err) {
        resArea.text("User not found.");
    }
});

// Challenge 4A: Clear Button Logic
$("#clearSearchBtn").on("click", function() {
    $("#searchBox").val("");         // Empty input
    $("#searchResults").empty();     // Clear results
    $("#searchStatus").text("");     // Reset status
});