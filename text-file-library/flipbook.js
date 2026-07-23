/*====================================================
        PYTHON QUEST - FLIPBOOK
====================================================*/

const totalPages = 25;   // Total comic pages
let currentPage = 1;

/*====================================================
        LOAD COMIC PAGE
====================================================*/

function loadFlipbook() {

    const flipbook = document.getElementById("flipbook");

    if (!flipbook) {
        console.error("❌ Flipbook container not found!");
        return;
    }

    const imagePath = `comics/t${currentPage}.png`;

    console.log("Loading:", imagePath);

    flipbook.innerHTML = `
        <div class="comicViewer">

            <img
                id="comicImage"
                src="${imagePath}"
                alt="Comic Page ${currentPage}"
                style="
                    width:100%;
                    max-width:900px;
                    display:block;
                    margin:auto;
                    border-radius:15px;
                    box-shadow:0 0 20px rgba(0,0,0,.4);
                "
            >

            <h3 style="
                text-align:center;
                margin-top:15px;
                color:#FFD54F;
            ">
                Page ${currentPage} / ${totalPages}
            </h3>

        </div>
    `;

    const img = document.getElementById("comicImage");

    img.onload = function () {
        console.log("✅ Image Loaded:", imagePath);
    };

    img.onerror = function () {

        console.error("❌ Cannot load:", imagePath);

        flipbook.innerHTML = `
            <div style="
                text-align:center;
                padding:60px;
                color:white;
            ">
                <h2>Image Not Found</h2>

                <p>${imagePath}</p>

                <p>Check the comics folder.</p>
            </div>
        `;

    };

}

/*====================================================
        NEXT PAGE
====================================================*/

function nextComic() {

    if (currentPage < totalPages) {

        currentPage++;

        loadFlipbook();

    }

}

/*====================================================
        PREVIOUS PAGE
====================================================*/

function previousComic() {

    if (currentPage > 1) {

        currentPage--;

        loadFlipbook();

    }

}

/*====================================================
        INITIALIZE
====================================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("📖 Flipbook Initialized");

    loadFlipbook();

    const next = document.getElementById("nextComic");
    const previous = document.getElementById("previousComic");

    if (next) {
        next.addEventListener("click", nextComic);
    }

    if (previous) {
        previous.addEventListener("click", previousComic);
    }

    document.addEventListener("keydown", function (e) {

        if (e.key === "ArrowRight") nextComic();

        if (e.key === "ArrowLeft") previousComic();

    });

});
