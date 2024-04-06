const busTimingsByLocation = {
    karkala: [
        { name: "Vishal", departure: "06:00", reaching: "08:00" },
        { name: "Samgam", departure: "06:30", reaching: "08:30" },
        { name: "Master", departure: "07:00", reaching: "09:00" },
        { name: "Padmabika", departure: "07:30", reaching: "09:30" },
        { name: "Sunil", departure: "08:00", reaching: "10:00" },
        { name: "Reshma", departure: "08:30", reaching: "10:30" },
        { name: "Varun", departure: "09:00", reaching: "11:00" },
        { name: "Bharath", departure: "09:30", reaching: "11:30" },
        { name: "Gloria", departure: "10:00", reaching: "12:00" },
        { name: "Jolly", departure: "10:30", reaching: "12:30" }
    ],
    mangalore: [
        { name: "Vishal", departure: "06:00", reaching: "08:00" },
        { name: "Samgam", departure: "06:30", reaching: "08:30" },
        { name: "Master", departure: "07:00", reaching: "09:00" },
        { name: "Padmabika", departure: "07:30", reaching: "09:30" },
        { name: "Sunil", departure: "08:00", reaching: "10:00" },
        { name: "Reshma", departure: "08:30", reaching: "10:30" },
        { name: "Varun", departure: "09:00", reaching: "11:00" },
        { name: "Bharath", departure: "09:30", reaching: "11:30" },
        { name: "Gloria", departure: "10:00", reaching: "12:00" },
        { name: "Jolly", departure: "10:30", reaching: "12:30" }
    ],
    moodbidri: [
        { name: "Reshma", departure: "06:00", reaching: "08:00" },
        { name: "Gloria", departure: "06:30", reaching: "08:30" },
        { name: "Bharath", departure: "07:00", reaching: "09:00" },
        { name: "Jolly", departure: "07:30", reaching: "09:30" },
        { name: "Varun", departure: "08:00", reaching: "10:00" },
        { name: "Padmabika", departure: "08:30", reaching: "10:30" },
        { name: "Master", departure: "09:00", reaching: "11:00" },
        { name: "Samgam", departure: "09:30", reaching: "11:30" },
        { name: "Sunil", departure: "10:00", reaching: "12:00" },
        { name: "Vishal", departure: "10:30", reaching: "12:30" }
    ],
    udupi: [
        { name: "Varun", departure: "06:00", reaching: "08:00" },
        { name: "Bharath", departure: "06:30", reaching: "08:30" },
        { name: "Reshma", departure: "07:00", reaching: "09:00" },
        { name: "Samgam", departure: "07:30", reaching: "09:30" },
        { name: "Sunil", departure: "08:00", reaching: "10:00" },
        { name: "Bharath", departure: "08:30", reaching: "10:30" },
        { name: "Jolly", departure: "09:00", reaching: "11:00" },
        { name: "Vishal", departure: "09:30", reaching: "11:30" },
        { name: "Padmabika", departure: "10:00", reaching: "12:00" },
        { name: "Gloria", departure: "10:30", reaching: "12:30" }
    ],
};

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = hours < 10 ? '0' + hours : hours; // Add leading zero for single digit hours
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero for single digit minutes
    seconds = seconds < 10 ? '0' + seconds : seconds; // Add leading zero for single digit seconds
    return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    currentTimeElement.textContent = getCurrentTime();
}

setInterval(updateTime, 1000);

function getSelectedDestinations() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    return { from, to };
}

function calculateBusTimings() {
    const { from, to } = getSelectedDestinations();
    return busTimingsByLocation[to];
}

function updatePage(event) {
    event.preventDefault();

    const currentTimeElement = document.getElementById('current-time');
    const busListElement = document.getElementById('bus-list');
    const currentTime = getCurrentTime();
    const busTimings = calculateBusTimings();

    currentTimeElement.textContent = `Current Time: ${currentTime}`;

    busListElement.innerHTML = '';
    busTimings.forEach((bus, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${bus.name}</td>
            <td>${bus.departure}</td>
            <td>${bus.reaching}</td>
            <td><button onclick="showDetails(${index})">Details</button></td>
        `;
        busListElement.appendChild(tr);
    });
}

function showDetails(index) {
    const { from, to } = getSelectedDestinations();
    let busDetailsPage;

    if (from === 'karkala' && to === 'mangalore') {
        busDetailsPage = `manglore${index + 1}.html`;
    } else if (from === 'karkala' && to === 'udupi') {
        busDetailsPage = `udupi${index + 1}.html`;
    } else if (from === 'karkala' && to === 'moodbidri') {
        busDetailsPage = `moodbidri${index + 1}.html`;
    } else {
        console.log('Details are only available for buses from Karkala to Mangalore, Udupi, or Moodbidri.');
        return;
    }

    if (index >= 0 && index < 10) {
        window.open(busDetailsPage, '_blank');
    } else {
        console.log('Details not available for this bus.');
    }
}



function initializePage() {
    const form = document.getElementById('destination-form');
    form.addEventListener('submit', updatePage);

    const mapButton = document.getElementById('preview-map');
    mapButton.addEventListener('click', previewRouteMap);
}

function previewRouteMap() {
    const { from, to } = getSelectedDestinations();
    let mapURL;

    if (from === 'karkala' && to === 'mangalore') {
        mapURL = 'mangloremap.html';
    } else if (from === 'karkala' && to === 'udupi') {
        mapURL = 'udupimap.html';
    } else if (from === 'karkala' && to === 'moodbidri') {
        mapURL = 'moodbidrimap.html';
    } else {
        console.log('No map URL defined for the selected destinations.');
        return;
    }

    const mapWindow = window.open(mapURL, '_blank');
    mapWindow.focus();
}

initializePage();
