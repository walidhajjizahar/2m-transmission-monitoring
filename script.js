const transmissions = [
    {
        id: 1,
        name: "Élections Casablanca",
        technology: "TVU / IP",
        bitrate: 8.4,
        latency: 42,
        quality: 96,
        status: "active"
    },

    {
        id: 2,
        name: "Élections Rabat",
        technology: "Satellite",
        bitrate: 7.9,
        latency: 51,
        quality: 94,
        status: "active"
    },

    {
        id: 3,
        name: "Élections Marrakech",
        technology: "Fibre / IP",
        bitrate: 9.1,
        latency: 38,
        quality: 98,
        status: "active"
    }
];
function displayTransmissions() {

    const container = document.getElementById(
        "transmission-container"
    );

    container.innerHTML = "";

    transmissions.forEach(transmission => {

        const card = document.createElement("div");

        card.className = "transmission-card";

        const restoreButton = transmission.status === "active"
            ? ""
            : `
                <button class="restore-button" onclick="restoreTransmission(${transmission.id})">
                    Rétablir la transmission
                </button>
            `;

        card.innerHTML = `
            <h3>${transmission.name}</h3>

            <div class="status ${transmission.status}">
                ● ${getStatusText(transmission.status)}
            </div>

            <div class="metric">
                Technologie :
                <strong>${transmission.technology}</strong>
            </div>

            <div class="metric">
                Débit :
                <strong>${transmission.bitrate} Mbps</strong>
            </div>

            <div class="metric">
                Latence :
                <strong>${transmission.latency} ms</strong>
            </div>

            <div class="metric">
                Qualité :
                <strong>${transmission.quality}%</strong>
            </div>

            <button onclick="simulateFailure(${transmission.id})">
                ${transmission.status === "active" ? "Simuler un incident" : "Aggraver l'incident"}
            </button>
            ${restoreButton}
        `;

        container.appendChild(card);
    });

    updateGlobalStatus();
}
function getStatusText(status) {

    if (status === "active") {
        return "ACTIVE";
    }

    if (status === "warning") {
        return "ALERTE";
    }

    return "HORS SERVICE";
}
displayTransmissions();
function updateGlobalStatus() {

    const active = transmissions.filter(
        t => t.status === "active"
    ).length;

    const warning = transmissions.filter(
        t => t.status === "warning"
    ).length;

    const offline = transmissions.filter(
        t => t.status === "offline"
    ).length;

    document.getElementById("active-count").textContent = active;

    document.getElementById("warning-count").textContent = warning;

    document.getElementById("offline-count").textContent = offline;
}
function simulateFailure(id) {

    const transmission = transmissions.find(
        t => t.id === id
    );

    if (!transmission) {
        return;
    }

    if (transmission.status === "active") {

        transmission.status = "warning";

        transmission.latency += 80;

        transmission.quality -= 20;

        addIncident(
            transmission.name,
            "Dégradation de la transmission",
            "WARNING"
        );
    }
    else if (transmission.status === "warning") {

        transmission.status = "offline";

        transmission.quality = 0;

        transmission.latency += 120;

        addIncident(
            transmission.name,
            "Transmission interrompue",
            "CRITICAL"
        );
    }
    else {
        addIncident(
            transmission.name,
            "Transmission déjà hors service",
            "CRITICAL"
        );
    }

    displayTransmissions();
}
function addIncident(
    transmissionName,
    event,
    level
) {

    const table = document.getElementById("incident-log");

    const row = document.createElement("tr");

    const time = new Date().toLocaleTimeString();

    row.innerHTML = `
        <td>${time}</td>
        <td>${transmissionName}</td>
        <td>${event}</td>
        <td>${level}</td>
    `;

    table.prepend(row);
}
function restoreTransmission(id) {

    const transmission = transmissions.find(
        t => t.id === id
    );

    if (!transmission) {
        return;
    }

    transmission.status = "active";

    transmission.latency = 40;

    transmission.quality = 95;

    addIncident(
        transmission.name,
        "Transmission rétablie",
        "INFO"
    );

    displayTransmissions();
}