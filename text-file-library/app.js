/*==================================================
        Python Quest
        Text File Library Controller
==================================================*/

const LESSON = {

    id: "text-file-library",

    totalSteps: 6,

    currentStep: 1

};

/*=========================================
        Initialize Lesson
=========================================*/

window.addEventListener("DOMContentLoaded", () => {

    loadLesson();

    updateProgress();

    checkComicCompletion();

});

/*=========================================
        Load Lesson Progress
=========================================*/

function loadLesson() {

    const saved = localStorage.getItem("lesson-" + LESSON.id);

    if (saved) {

        LESSON.currentStep = parseInt(saved);

    }

}

/*=========================================
        Save Lesson Progress
=========================================*/

function saveLesson() {

    localStorage.setItem(

        "lesson-" + LESSON.id,

        LESSON.currentStep

    );

}

/*=========================================
        Progress Bar
=========================================*/

function updateProgress() {

    const bar = document.getElementById("lessonProgress");

    if (!bar) return;

    const percent =

        (LESSON.currentStep / LESSON.totalSteps) * 100;

    bar.style.width = percent + "%";

}

/*=========================================
        Complete Comic
=========================================*/

function completeComic() {

    LESSON.currentStep = 2;

    saveLesson();

    updateProgress();

    unlockSection("animation");

}

/*=========================================
        Complete Animation
=========================================*/

function completeAnimation() {

    LESSON.currentStep = 3;

    saveLesson();

    updateProgress();

    unlockSection("notes");

}

/*=========================================
        Complete Notes
=========================================*/

function completeNotes() {

    LESSON.currentStep = 4;

    saveLesson();

    updateProgress();

    unlockSection("coding");

}

/*=========================================
        Complete Coding
=========================================*/

function completeCoding() {

    LESSON.currentStep = 5;

    saveLesson();

    updateProgress();

    unlockSection("quiz");

}

/*=========================================
        Complete Quiz
=========================================*/

function completeQuiz(score) {

    if(score<80){

        alert(

        "Score at least 80% to unlock rewards."

        );

        return;

    }

    LESSON.currentStep = 6;

    saveLesson();

    updateProgress();

    unlockSection("reward");

    finishLesson();

}

/*=========================================
        Finish Lesson
=========================================*/

function finishLesson() {

    addXP(300);

    addCoins(150);

    addBadge();

    completeWorld("text-file-library");

    unlockWorld("csv-kingdom");

    showReward();

}

/*=========================================
        Reward
=========================================*/

function showReward() {

    alert(

`🏆 Congratulations!

You completed

Text File Library

⭐ +300 XP

🪙 +150 Coins

🥇 Badge Earned

🦁 CSV Kingdom Unlocked!`

    );

}

/*=========================================
        Unlock Section
=========================================*/

function unlockSection(name) {

    const buttons =

        document.querySelectorAll(".lesson-menu button");

    switch(name){

        case "animation":

            buttons[1].disabled=false;

            break;

        case "notes":

            buttons[2].disabled=false;

            break;

        case "coding":

            buttons[3].disabled=false;

            break;

        case "quiz":

            buttons[4].disabled=false;

            break;

        case "reward":

            buttons[5].disabled=false;

            break;

    }

}

/*=========================================
        Comic Check
=========================================*/

function checkComicCompletion(){

    if(localStorage.getItem("TextFileComicCompleted")){

        unlockSection("animation");

    }

}

/*=========================================
        Navigation
=========================================*/

function gotoAnimation(){

    window.location.href="animation.html";

}

function gotoNotes(){

    window.location.href="notes.html";

}

function gotoCoding(){

    window.location.href="coding.html";

}

function gotoQuiz(){

    window.location.href="quiz.html";

}

function gotoReward(){

    window.location.href="reward.html";

}

/*=========================================
        Reset Lesson
=========================================*/

function resetLesson(){

    if(confirm("Restart this lesson?")){

        localStorage.removeItem(

            "lesson-" + LESSON.id

        );

        localStorage.removeItem(

            "TextFileComicCompleted"

        );

        location.reload();

    }

}

console.log("📜 Text File Library Loaded");
