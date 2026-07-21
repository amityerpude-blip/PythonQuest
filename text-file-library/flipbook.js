/*=====================================================
    Python Quest
    Comic Flipbook Engine
======================================================*/

const TOTAL_PAGES = 20;

let currentPage = 1;
let zoomLevel = 1;

const comicImage = document.getElementById("comicImage");
const pageNumber = document.getElementById("pageNumber");
const totalPages = document.getElementById("totalPages");

const progressBar = document.getElementById("lessonProgress");

const finishButton = document.getElementById("finishComic");

totalPages.innerText = TOTAL_PAGES;

/*=========================================
            INITIALIZE
=========================================*/

window.onload = function(){

    loadBookmark();

    updateComic();

};

/*=========================================
            UPDATE PAGE
=========================================*/

function updateComic(){

    comicImage.src = "comics/page"+currentPage+".jpg";

    pageNumber.innerText = currentPage;

    let progress = (currentPage/TOTAL_PAGES)*100;

    progressBar.style.width = progress+"%";

    if(currentPage===TOTAL_PAGES){

        finishButton.disabled=false;

        finishButton.innerHTML="🎉 Continue to Animation";

    }

    saveBookmark();

}

/*=========================================
            NEXT PAGE
=========================================*/

document
.getElementById("nextPage")
.addEventListener("click",()=>{

    if(currentPage<TOTAL_PAGES){

        currentPage++;

        updateComic();

    }

});

/*=========================================
            PREVIOUS PAGE
=========================================*/

document
.getElementById("prevPage")
.addEventListener("click",()=>{

    if(currentPage>1){

        currentPage--;

        updateComic();

    }

});

/*=========================================
            KEYBOARD SUPPORT
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        if(currentPage<TOTAL_PAGES){

            currentPage++;

            updateComic();

        }

    }

    if(e.key==="ArrowLeft"){

        if(currentPage>1){

            currentPage--;

            updateComic();

        }

    }

});

/*=========================================
            MOBILE SWIPE
=========================================*/

let touchStartX=0;
let touchEndX=0;

comicImage.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].screenX;

});

comicImage.addEventListener("touchend",(e)=>{

    touchEndX=e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe(){

    if(touchEndX<touchStartX-50){

        if(currentPage<TOTAL_PAGES){

            currentPage++;

            updateComic();

        }

    }

    if(touchEndX>touchStartX+50){

        if(currentPage>1){

            currentPage--;

            updateComic();

        }

    }

}

/*=========================================
            ZOOM
=========================================*/

document
.getElementById("zoomBtn")
.addEventListener("click",()=>{

    if(zoomLevel===1){

        zoomLevel=1.8;

    }else{

        zoomLevel=1;

    }

    comicImage.style.transform="scale("+zoomLevel+")";

    comicImage.style.transition=".4s";

});

/*=========================================
            FULL SCREEN
=========================================*/

document
.getElementById("fullscreenBtn")
.addEventListener("click",()=>{

    if(comicImage.requestFullscreen){

        comicImage.requestFullscreen();

    }

});

/*=========================================
            BOOKMARK
=========================================*/

function saveBookmark(){

    localStorage.setItem(

        "textFileBookmark",

        currentPage

    );

}

function loadBookmark(){

    let page=localStorage.getItem(

        "textFileBookmark"

    );

    if(page){

        currentPage=parseInt(page);

    }

}

/*=========================================
        BOOKMARK BUTTON
=========================================*/

document
.getElementById("bookmarkBtn")
.addEventListener("click",()=>{

    saveBookmark();

    alert("📖 Bookmark Saved!");

});

/*=========================================
        FINISH COMIC
=========================================*/

finishButton.addEventListener("click",()=>{

    if(currentPage!==TOTAL_PAGES){

        alert("Please finish reading the comic first.");

        return;

    }

    completeComic("text-file-library");

    addXP(100);

    addCoins(50);

    unlockAchievement("Comic Reader");

    localStorage.setItem(

        "TextFileComicCompleted",

        "true"

    );

    alert(

`🎉 Great Job!

Comic Completed!

⭐ +100 XP
🪙 +50 Coins

Animation Unlocked.`

    );

    location.href="animation.html";

});

/*=========================================
            PRELOAD IMAGES
=========================================*/

for(let i=1;i<=TOTAL_PAGES;i++){

    const img=new Image();

    img.src="comics/page"+i+".jpg";

}
