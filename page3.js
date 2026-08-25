const cake = document.getElementById("cake");
const cutButton = document.getElementById("cutButton");
const hint = document.getElementById("hint");
const nextButton = document.getElementById("nextButton");

let cakeReady = false;
let cutting = false;


/* ================================
   CAKE SELESAI JATUH
================================ */

setTimeout(() => {

    cakeReady = true;

    hint.textContent =
        "Make a wish... then cut the cake ♡";

}, 3500);


/* ================================
   CUT THE CAKE
================================ */

cutButton.addEventListener("click", () => {

    if (!cakeReady || cutting) return;

    cutting = true;


    /* Hilangkan tombol */

    cutButton.style.opacity = "0";
    cutButton.style.pointerEvents = "none";

    hint.textContent = "";


    /* =================================
       LANGSUNG POTONG
    ================================= */

    cake.classList.add("cutting");


    /* =================================
       TOMBOL NEXT
       MUNCUL SETELAH ANIMASI
    ================================= */

    setTimeout(() => {

        nextButton.classList.add("show");

    }, 1800);

});


/* ================================
   NEXT PAGE
================================ */

nextButton.addEventListener("click", () => {
    window.location.href = "lastpage.html";
});