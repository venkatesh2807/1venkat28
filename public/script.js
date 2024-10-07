document.getElementById('inputForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get user inputs for array sizes and search element
    const size1 = document.getElementById('size1').value;
    const size2 = document.getElementById('size2').value;
    const size3 = document.getElementById('size3').value;
    const size4 = document.getElementById('size4').value;
    const searchElement = document.getElementById('searchElement').value;

    // Make API request to backend with the sizes and search element
    fetch(`/search?sizes=${size1},${size2},${size3},${size4}&element=${searchElement}`)
        .then(response => response.json())
        .then(data => {
            const { times, searchElement } = data;

            // Extract sizes, times, and search results
            const sizes = times.map(item => item.size);
            const timeTaken = times.map(item => item.timeTaken);
            const found = times.map(item => item.found);

            // Display the result of the search for each array size
            let resultMessage = '';
            times.forEach((item, index) => {
                const status = item.found ? 'found' : 'not found';
                resultMessage += `In array of size ${item.size}, element ${searchElement} was ${status}. (${item.timeTaken} ms) <br>`;
            });
            
            document.getElementById('result').innerHTML = resultMessage;

            // Plot the chart as a line graph
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',  // Change from 'bar' to 'line'
                data: {
                    labels: sizes,
                    datasets: [{
                        label: 'Time Taken (nanoseconds)',
                        data: timeTaken,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                        tension: 0.1 // Add some tension to make the line smoother
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});
