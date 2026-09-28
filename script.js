const legs = document.querySelectorAll(".leg");

function updateClock() {

    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    // Angles de l'horloge

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = hours * 30 + minutes * 0.5;

    // Trois pattes servent d'aiguilles

    legs[0].style.transform =
        `rotate(${minuteAngle - 90}deg)`;

    legs[4].style.transform =
        `rotate(${hourAngle - 90}deg)`;

    legs[6].style.transform =
        `rotate(${secondAngle - 90}deg)`;
}

updateClock();

setInterval(updateClock, 1000);
