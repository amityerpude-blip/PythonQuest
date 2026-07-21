/*=========================================================
            PYTHON QUEST
        TEXT FILE LIBRARY CONTROLLER
=========================================================*/

const sections=[

"storySection",
"comicSection",
"animationSection",
"notesSection",
"codingSection",
"quizSection",
"rewardSection"

];

let currentSection = 0;

/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadSavedSection();

    initializeTabs();

    initializeButtons();

    initializeVideo();

    initializeCoding();

    initializeQuiz();

    initializeReward();

    updatePlayerStats();

    initializeComic();

    showSection(currentSection);

});


/*=========================================================
                TABS
=========================================================*/

function initializeTabs(){

    const tabs = document.querySelectorAll(".tab");

    tabs.forEach((tab,index)=>{

        tab.addEventListener("click",()=>{

            currentSection=index;

            showSection(currentSection);

        });

    });

}


/*=========================================================
            SHOW CURRENT SECTION
=========================================================*/

function showSection(index){

    document.querySelectorAll(".lessonContent")

    .forEach(section=>{

        section.classList.remove("active");

    });

    document.querySelectorAll(".tab")

    .forEach(tab=>{

        tab.classList.remove("active");

    });

    document

    .getElementById(sections[index])

    .classList.add("active");
            if(sections[index] === "comicSection"){

    if(typeof loadFlipbook === "function"){

        loadFlipbook();

    }

}

    document

    .querySelectorAll(".tab")[index]

    .classList.add("active");

    updateProgress();

    saveCurrentSection();

}


/*=========================================================
            PREVIOUS
=========================================================*/

function previousSection(){

    if(currentSection>0){

        currentSection--;

        showSection(currentSection);

    }

}


/*=========================================================
            NEXT
=========================================================*/

function nextSection(){

    if(currentSection<sections.length-1){

        currentSection++;

        showSection(currentSection);

    }

}


/*=========================================================
            BUTTONS
=========================================================*/

function initializeButtons(){

    const previous=document.getElementById("previousBtn");

    const next=document.getElementById("nextBtn");

    if(previous){

        previous.onclick=previousSection;

    }

    if(next){

        next.onclick=nextSection;

    }

}


/*=========================================================
            PROGRESS BAR
=========================================================*/

function updateProgress(){

    const bar=document.getElementById("lessonProgressBar");

    if(!bar) return;

    const percent=((currentSection+1)/sections.length)*100;

    bar.style.width=percent+"%";

}


/*=========================================================
            SAVE CURRENT TAB
=========================================================*/

function saveCurrentSection(){

    localStorage.setItem(

        "TextFileLibraryTab",

        currentSection

    );

}


/*=========================================================
            LOAD LAST TAB
=========================================================*/

function loadSavedSection(){

    const saved=

    localStorage.getItem("TextFileLibraryTab");

    if(saved!==null){

        currentSection=parseInt(saved);

    }

}


/*=========================================================
            PLAYER STATS
=========================================================*/

function updatePlayerStats(){

    const player=JSON.parse(

        localStorage.getItem("pythonQuestPlayer")

    );

    if(!player) return;

    if(document.getElementById("xp"))

        document.getElementById("xp").textContent=player.xp;

    if(document.getElementById("coins"))

        document.getElementById("coins").textContent=player.coins;

    if(document.getElementById("badges"))

        document.getElementById("badges").textContent=player.badges;

    if(document.getElementById("playerLevel"))

        document.getElementById("playerLevel").textContent=player.level;

}


/*=========================================================
            VIDEO
=========================================================*/

function initializeVideo(){

    const video=document.getElementById("lessonVideo");

    if(!video) return;

    video.onended=function(){

        alert("🎬 Animation Completed!");

    };

}


/*=========================================================
            COMIC
=========================================================*/

function initializeComic(){

    const comicBtn=document.getElementById("startComic");

    if(!comicBtn) return;

    comicBtn.onclick=function(){

        if(typeof loadFlipbook==="function"){

            loadFlipbook();

        }

    };

}

/*=========================================================
            CODING
=========================================================*/

function initializeCoding(){

    const run=document.getElementById("runCode");

    if(!run) return;

    run.onclick=function(){

        const code=document.getElementById("pythonCode").value;

        document.getElementById("output").textContent=

"Python Execution Engine\n\n"+

"(Pyodide will be integrated next)\n\n"+

code;

    };

}


/*=========================================================
            QUIZ
=========================================================*/

function initializeQuiz(){

    // Load questions if quiz.js is available

    if(typeof loadQuiz === "function"){

        loadQuiz();

    }

}


/*=========================================================
            REWARD
=========================================================*/

function initializeReward(){

    const reward=document.getElementById("claimReward");

    if(!reward) return;

    reward.onclick=function(){

        let player=JSON.parse(

        localStorage.getItem("pythonQuestPlayer")

        );

        if(!player){

            alert("Player not found.");

            return;

        }

        player.xp+=300;

        player.coins+=150;

        player.badges++;

        localStorage.setItem(

        "pythonQuestPlayer",

        JSON.stringify(player)

        );

        updatePlayerStats();

        alert(

"🏆 Reward Claimed!\n\n+300 XP\n+150 Coins\n+1 Badge"

        );

    };

}


/*=========================================================
                DEBUG
=========================================================*/

console.log(

"📜 Text File Library Ready"

);
