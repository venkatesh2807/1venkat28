const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Function to generate random arrays of different sizes
function generateRandomArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100)); // Random elements between 0-99
    }
    return array;
}

// Function to perform linear search and return time taken and whether the element was found
function linearSearch(arr, element) {
    const start = process.hrtime(); // Start the timer
    let found = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            found = true;
            break;
        }
    }
    const end = process.hrtime(start); // End the timer
    const timeTaken = end[0] * 1e9 + end[1]; // Convert to nanoseconds
    return { timeTaken, found }; // Return time in nanoseconds and if element was found
}

// Endpoint to handle random array generation, search time, and search result
app.get('/search', (req, res) => {
    const { sizes, element } = req.query; // Get sizes and search element from query params
    const sizeArray = sizes.split(',').map(Number); // Convert the sizes to an array of numbers
    const searchElement = parseInt(element); // Convert search element to integer

    const times = sizeArray.map(size => {
        const array = generateRandomArray(size);
        const { timeTaken, found } = linearSearch(array, searchElement);
        return { size, timeTaken, found };
    });

    res.json({ searchElement, times });
});

// Only use this when running locally, Vercel automatically runs it as a Serverless Function.
// app.listen(3000, () => console.log("Server ready on port 3000."));

// Export the app for Vercel
module.exports = app;
