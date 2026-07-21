/*=========================================
        PYTHON QUEST FLIPBOOK
=========================================*/

const totalPages = 25;   // Change this to your total number of comic pages

let currentPage = 1;

function loadFlipbook(){

    const flipbook = document.getElementById("flipbook");

    flipbook.innerHTML = `
        <img
            src="comics/t${currentPage}.png"
            alt="Comic Page ${currentPage}"
            style="
                width:100%;
                max-height:700px;
                object-fit:contain;
                border-radius:15px;
            "
        >

        <h3 style="margin-top:15px;text-align:center;">
            Page ${currentPage} / ${totalPages}
        </h3>
    `;

}

function nextComic(){

    if(currentPage < totalPages){

        currentPage++;

        loadFlipbook();

    }

}

function previousComic(){

    if(currentPage > 1){

        currentPage--;

        loadFlipbook();

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    loadFlipbook();

    document.getElementById("nextComic").addEventListener("click",nextComic);

    document.getElementById("previousComic").addEventListener("click",previousComic);

});
