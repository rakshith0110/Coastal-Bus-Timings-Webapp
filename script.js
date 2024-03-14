
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

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getSelectedDestinations() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    return { from, to };
}

function calculateBusTimings() {
    const { from, to } = getSelectedDestinations();
    const busTimings = busTimingsByLocation[from];

    const filteredBusTimings = busTimings.filter(timing => timing !== busTimingsByLocation[to]);

    filteredBusTimings.sort();

    return filteredBusTimings.slice(0, 6);
}

function updatePage(event) {
    event.preventDefault(); 

    const currentTimeElement = document.getElementById('current-time');
    const busListElement = document.getElementById('bus-list');
    const currentTime = getCurrentTime();
    const busTimings = calculateBusTimings();

    currentTimeElement.textContent = `Current Time: ${currentTime}`;

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

document.getElementById('destination-form').addEventListener('submit', updatePage);

updatePage({ preventDefault: () => {} });
setInterval(updatePage, 60000); 
