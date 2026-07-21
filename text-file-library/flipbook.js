const comicPages = [

"comics/t1.png",
"comics/t2.png",
"comics/t3.png",
"comics/t4.png",
"comics/t5.png",
"comics/t6.png",
"comics/t7.png",
"comics/t8.png",
"comics/t9.png",
"comics/t10.png",
"comics/t11.png",
"comics/t12.png",
"comics/t13.png",
"comics/t14.png",
"comics/t15.png"

];

let currentPage = 0;

function loadFlipbook(){

    const flipbook = document.getElementById("flipbook");

    flipbook.innerHTML = `

        <img
            src="${comicPages[currentPage]}"
            id="comicImage"
            style="
                width:100%;
                max-height:700px;
                object-fit:contain;
                border-radius:15px;
            "
        >

        <h3 style="margin-top:15px;text-align:center;">
            Page ${currentPage+1} / ${comicPages.length}
        </h3>

    `;

}

function nextComic(){

    if(currentPage < comicPages.length-1){

        currentPage++;

        loadFlipbook();

    }

}

function previousComic(){

    if(currentPage > 0){

        currentPage--;

        loadFlipbook();

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    loadFlipbook();

    document
        .getElementById("nextComic")
        .onclick = nextComic;

    document
        .getElementById("previousComic")
        .onclick = previousComic;

});
