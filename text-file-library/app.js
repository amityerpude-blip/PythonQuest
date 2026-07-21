/*==================================================
        Python Quest
        Text File Library Controller
==================================================*/

const sections = [
    "comicSection",
    "animationSection",
    "notesSection",
    "codingSection",
    "quizSection",
    "rewardSection"
];

const tabs = document.querySelectorAll(".tab");

let currentSection = 0;

/*=========================================
            INITIALIZE
=========================================*/

window.addEventListener("DOMContentLoaded", () => {

    loadProgress();

    initializeTabs();

    initializeButtons();

    updatePlayerStats();

    showSection(currentSection);

});

/*=========================================
            TAB CLICK
=========================================*/

function initializeTabs(){

    tabs.forEach((tab,index)=>{

        tab.addEventListener("click",()=>{

            currentSection=index;

            showSection(currentSection);

            saveProgress();

        });

    });

}

/*=========================================
        PREVIOUS / NEXT
=========================================*/

function initializeButtons(){

    document.getElementById("nextBtn")
    .addEventListener("click",nextSection);

    document.getElementById("previousBtn")
    .addEventListener("click",previousSection);

}

function nextSection(){

    if(currentSection<sections.length-1){

        currentSection++;

        showSection(currentSection);

        saveProgress();

    }

}

function previousSection(){

    if(currentSection>0){

        currentSection--;

        showSection(currentSection);

        saveProgress();

    }

}

/*=========================================
            SHOW SECTION
=========================================*/

function showSection(index){

    document
    .querySelectorAll(".lessonContent")
    .forEach(section=>{

        section.classList.remove("active");

    });

    tabs.forEach(tab=>{

        tab.classList.remove("active");

    });

    document
    .getElementById(sections[index])
    .classList.add("active");

    tabs[index].classList.add("active");

    updateProgress();

    updateButtons();

}

/*=========================================
        UPDATE BUTTONS
=========================================*/

function updateButtons(){

    document.getElementById("previousBtn").disabled =
    currentSection===0;

    document.getElementById("nextBtn").disabled =
    currentSection===sections.length-1;

}

/*=========================================
            PROGRESS BAR
=========================================*/

function updateProgress(){

    const percent =
    ((currentSection+1)/sections.length)*100;

    document.getElementById("lessonProgressBar")
    .style.width = percent + "%";

}

/*=========================================
        SAVE PROGRESS
=========================================*/

function saveProgress(){

    localStorage.setItem(

        "TextFileLessonProgress",

        currentSection

    );

}

/*=========================================
        LOAD PROGRESS
=========================================*/

function loadProgress(){

    const saved =
    localStorage.getItem("TextFileLessonProgress");

    if(saved!==null){

        currentSection=parseInt(saved);

    }

}

/*=========================================
        PLAYER STATS
=========================================*/

function updatePlayerStats(){

    const player = JSON.parse(

        localStorage.getItem("pythonQuestPlayer")

    );

    if(!player) return;

    document.getElementById("xp").textContent =
    player.xp;

    document.getElementById("coins").textContent =
    player.coins;

    document.getElementById("badges").textContent =
    player.badges;

    document.getElementById("playerLevel").textContent =
    player.level;

}

/*=========================================
        REWARD
=========================================*/

document.getElementById("claimReward")
.addEventListener("click",claimReward);

function claimReward(){

    let player = JSON.parse(

        localStorage.getItem("pythonQuestPlayer")

    );

    if(!player){

        alert("Player data not found.");

        return;

    }

    player.xp += 300;

    player.coins += 150;

    player.badges += 1;

    if(!player.completedWorlds.includes("text-file-library")){

        player.completedWorlds.push("text-file-library");

    }

    localStorage.setItem(

        "pythonQuestPlayer",

        JSON.stringify(player)

    );

    updatePlayerStats();

    alert(
`🎉 Congratulations!

You completed
Text File Library

⭐ +300 XP
🪙 +150 Coins
🏆 New Badge Earned`
    );

}

/*=========================================
        RUN PYTHON
=========================================*/

document.getElementById("runCode")
.addEventListener("click",()=>{

    const output =
    document.getElementById("output");

    output.textContent =
`Pyodide integration coming next...

Your Python code:

-----------------------

` +
document.getElementById("pythonCode").value;

});

/*=========================================
        QUIZ
=========================================*/

document.getElementById("submitQuiz")
.addEventListener("click",()=>{

    alert(

"Quiz Engine will be added in the next step."

    );

});

/*=========================================
        COMIC
=========================================*/

document.getElementById("startComic")
.addEventListener("click",()=>{

    if(typeof loadFlipbook==="function"){

        loadFlipbook();

    }else{

        alert("Flipbook Loaded");

    }

});

/*=========================================
        VIDEO COMPLETE
=========================================*/

const video =
document.getElementById("lessonVideo");

if(video){

    video.addEventListener("ended",()=>{

        alert(

"🎬 Animation Completed!"

        );

    });

}

/*=========================================
            DEBUG
=========================================*/

console.log("📜 Text File Library Ready");
