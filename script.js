// script.js

// Define bus timings for each location (hour:minute)
const busTimingsByLocation = {
    karkala: [
        "06:00", "06:30", "07:00", "07:30", "08:00", "08:30"
    ],
    mangalore: [
        "06:15", "06:45", "07:15", "07:45", "08:15", "08:45"
    ],
    moodbidri: [
        "06:30", "07:00", "07:30", "08:00", "08:30", "09:00"
    ],
    udupi: [
        "07:00", "07:30", "08:00", "08:30", "09:00", "09:30"
    ]
};

// Function to get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Function to get selected "from" and "to" destinations
function getSelectedDestinations() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    return { from, to };
}

// Function to calculate bus timings based on the selected destinations
function calculateBusTimings() {
    const { from, to } = getSelectedDestinations();
    const busTimings = busTimingsByLocation[from];

    // Filter bus timings based on the selected destination
    const filteredBusTimings = busTimings.filter(timing => timing !== busTimingsByLocation[to]);

    // Sort bus timings in ascending order
    filteredBusTimings.sort();

    return filteredBusTimings.slice(0, 6); // Return only the first 6 bus timings
}

// Function to update the current time and bus timings on the webpage
function updatePage(event) {
    event.preventDefault(); // Prevent form submission

    const currentTimeElement = document.getElementById('current-time');
    const busListElement = document.getElementById('bus-list');
    const currentTime = getCurrentTime();
    const busTimings = calculateBusTimings();

    // Update current time
    currentTimeElement.textContent = `Current Time: ${currentTime}`;

    // Calculate and update bus timings
    busListElement.innerHTML = '';
    busTimings.forEach((timing, index) => {
        const tr = document.createElement('tr');
        const busName = `Bus ${index + 1}`;
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${busName}</td>
            <td>${timing}</td>
        `;
        busListElement.appendChild(tr);
    });
}

// Add event listener to the form for submitting destination selection
document.getElementById('destination-form').addEventListener('submit', updatePage);

// Update page initially and every minute
updatePage({ preventDefault: () => {} }); // Call updatePage with a dummy event object
setInterval(updatePage, 60000); // Update every minute
