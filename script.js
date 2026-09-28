/* =========================================
   SPIDER CLOCK
========================================= */

const minuteLeg = document.querySelector(".leg-1");
const hourLeg = document.querySelector(".leg-5");
const secondLeg = document.querySelector(".leg-7");

const clock = document.querySelector(".clock");


/* =========================================
   MISE À JOUR DE L'HEURE
========================================= */

function updateClock() {

    const now = new Date();

    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;


    /* -----------------------------------------
       AIGUILLE DES SECONDES

       360° / 60 = 6°
       ----------------------------------------- */

    const secondAngle =
        seconds * 6 +
        milliseconds * 0.006;


    /* -----------------------------------------
       AIGUILLE DES MINUTES

       6° par minute
       + mouvement progressif des secondes
       ----------------------------------------- */

    const minuteAngle =
        minutes * 6 +
        seconds * 0.1;


    /* -----------------------------------------
       AIGUILLE DES HEURES

       30° par heure
       + déplacement progressif selon les minutes
       ----------------------------------------- */

    const hourAngle =
        hours * 30 +
        minutes * 0.5;


    /* -----------------------------------------
       APPLICATION DES ROTATIONS
       ----------------------------------------- */

    minuteLeg.style.transform =
        `rotate(${minuteAngle - 90}deg)`;

    hourLeg.style.transform =
        `rotate(${hourAngle - 90}deg)`;

    secondLeg.style.transform =
        `rotate(${secondAngle - 90}deg)`;
}


/* =========================================
   ANIMATION FLUIDE
========================================= */

function animateClock() {

    updateClock();

    requestAnimationFrame(animateClock);
}


/* =========================================
   LANCEMENT
========================================= */

animateClock();


/* =========================================
   INTERACTION AU SURVOL
========================================= */

clock.addEventListener("mouseenter", () => {

    document.querySelectorAll(".number").forEach(number => {

        number.style.color =
            "rgba(255,255,255,0.55)";

    });

});


clock.addEventListener("mouseleave", () => {

    document.querySelectorAll(".number").forEach(number => {

        number.style.color =
            "rgba(255,255,255,0.27)";

    });

});
