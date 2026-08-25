document.addEventListener("DOMContentLoaded", () => {

    const book = document.getElementById("book");
    const bookContainer = document.querySelector(".book-container");

    const nextButton = document.getElementById("nextBookPage");
    const prevButton = document.getElementById("prevPage");
    const currentPage = document.getElementById("currentPage");
    const flipHint = document.getElementById("flipHint");
    const nextPage = document.getElementById("nextPage");

    const papers = document.querySelectorAll(".paper");

    const memoryTitle = document.getElementById("memoryTitle");
    const memoryText = document.getElementById("memoryText");


    /* =========================
       STATE
    ========================= */

    let opened = false;
    let page = 0;

    const totalPages = 10;


    /* =========================
       MEMORY
    ========================= */

    const memories = {

        1: {
            title: "A little moment",
            text: "You're beautiful in every moment ♡"
        },

        2: {
            title: "Coffee & you",
            text: "One little moment worth remembering."
        },

        3: {
            title: "That smile",
            text: "A smile I could never get tired of seeing ♡"
        },

        4: {
            title: "More to come",
            text: "And there is still so much more to come..."
        },

        5: {
            title: "Halfway there",
            text: "Halfway through our little story. ♡"
        },

        6: {
            title: "One moment",
            text: "A moment I never want to forget."
        },

        7: {
            title: "One more",
            text: "One more page, one more smile. ♡"
        },

        8: {
            title: "Something special",
            text: "You make ordinary moments feel special."
        },

        9: {
            title: "Another memory",
            text: "Another little memory worth keeping."
        },

        10: {
            title: "Until then",
            text: "I hope there will always be more moments like this. ♡"
        }

    };


    /* =========================
       MEMORY UPDATE
    ========================= */

    function updateMemory() {

        if (page === 0) {

            memoryTitle.textContent = "♡";

            memoryText.innerHTML =
                "Open the book<br>to begin.";

            return;
        }

        const memory = memories[page];

        if (!memory) return;

        memoryTitle.textContent = memory.title;
        memoryText.textContent = memory.text;
    }


    /* =========================
       PAGE UPDATE
    ========================= */

    function updatePages() {

        papers.forEach((paper) => {

            const match =
                paper.className.match(/paper-(\d+)/);

            if (!match) return;

            const number = parseInt(match[1]);

            if (number <= page) {
                paper.classList.add("flipped");
            } else {
                paper.classList.remove("flipped");
            }

        });
    }


    /* =========================
       BOOK SHAPE
    ========================= */

    function updateBookShape() {

        /*
            PAGE 0 - CLOSED
            PAGE 1-9 - LANDSCAPE
            PAGE 10 - FINAL COVER
        */

        if (!opened) {

            bookContainer.classList.remove("book-is-open");
            bookContainer.classList.add("book-is-closed");

            book.classList.remove("finished");

            return;
        }


        if (page >= totalPages) {

            /* HALAMAN 11:
               buku kembali portrait */

            bookContainer.classList.remove("book-is-open");
            bookContainer.classList.add("book-is-closed");

            book.classList.add("finished");

        } else {

            /* HALAMAN 1-9:
               buku landscape */

            bookContainer.classList.remove("book-is-closed");
            bookContainer.classList.add("book-is-open");

            book.classList.remove("finished");
        }
    }


    /* =========================
       UI
    ========================= */

    function updateUI() {

        currentPage.textContent = page;

        prevButton.disabled =
            !opened || page === 0;

        nextButton.disabled =
            !opened || page === totalPages;

        if (!opened) {

            flipHint.textContent =
                "click the book to open it ♡";

        } else if (page >= totalPages) {

            flipHint.textContent =
                "the little book is closed ♡";

        } else {

            flipHint.textContent =
                "click the pages to turn them ♡";
        }

        updateMemory();
        updatePages();
        updateBookShape();
    }


    /* =========================
       OPEN
    ========================= */

    function openBook() {

        if (opened) return;

        opened = true;
        page = 0;

        book.classList.add("open");

        updateUI();
    }


    /* =========================
       CLOSE
    ========================= */

    function closeBook() {

        if (!opened) return;

        opened = false;
        page = 0;

        papers.forEach((paper) => {
            paper.classList.remove("flipped");
        });

        book.classList.remove("open");
        book.classList.remove("finished");

        updateUI();
    }


    /* =========================
       NEXT
    ========================= */

    function nextBookPage() {

        if (!opened) {

            openBook();
            return;
        }

        if (page >= totalPages) return;

        page++;

        updateUI();
    }


    /* =========================
       PREVIOUS
    ========================= */

    function previousBookPage() {

        if (!opened) return;

        /*
           DARI HALAMAN 10
           balik ke halaman 9
        */

        if (page === 0) {

            closeBook();
            return;
        }

        page--;

        updateUI();
    }


    /* =========================
       BUTTONS
    ========================= */

    nextButton.addEventListener("click", (event) => {

        event.stopPropagation();

        nextBookPage();
    });


    prevButton.addEventListener("click", (event) => {

        event.stopPropagation();

        previousBookPage();
    });


    /* =========================
       BOOK CLICK
    ========================= */

    book.addEventListener("click", (event) => {

        if (!opened) {

            openBook();
            return;
        }


        /*
           Kalau sudah halaman 10,
           klik tidak membalik lagi.
        */

        if (page >= totalPages) return;


        const rect =
            book.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const half =
            rect.width / 2;


        if (x > half) {

            nextBookPage();

        } else {

            previousBookPage();
        }

    });


    /* =========================
       KEYBOARD
    ========================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {
            nextBookPage();
        }

        if (event.key === "ArrowLeft") {
            previousBookPage();
        }

    });


    /* =========================
       MOBILE SWIPE
    ========================= */

    let startX = 0;

    book.addEventListener(
        "touchstart",
        (event) => {

            startX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    book.addEventListener(
        "touchend",
        (event) => {

            const endX =
                event.changedTouches[0].screenX;

            const distance =
                startX - endX;


            if (Math.abs(distance) < 40) {

                if (!opened) {
                    openBook();
                }

                return;
            }


            if (distance > 40) {

                nextBookPage();

            } else if (distance < -40) {

                previousBookPage();

            }

        },
        { passive: true }
    );


    /* =========================
       NEXT HTML PAGE
    ========================= */

    nextPage.addEventListener("click", () => {

        window.location.href =
            "page3.html";

    });


    /* =========================
       INITIAL
    ========================= */

    updateUI();

});