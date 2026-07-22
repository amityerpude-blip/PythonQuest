/* =========================================================
   TEXT FILE HANDLING ADVENTURE
   Python Quest - Magical World of Coding
   app.js - Part 1

   Comic Flipbook Controller
   ========================================================= */


/* =========================================================
   GLOBAL SETTINGS
   ========================================================= */


const comicConfig = {

    folder: "assets/comic/",

    prefix: "t",

    extension: ".png",

    totalPages: 12

};


let currentPage = 1;



/* =========================================================
   PAGE LOAD
   ========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadComicPage(currentPage);

        createMagicParticles();

        console.log(
            "📜 Text File Adventure Loaded"
        );

    }
);



/* =========================================================
   COMIC FLIPBOOK
   ========================================================= */


function loadComicPage(page){


    const comicImage =
        document.getElementById(
            "comicImage"
        );


    const pageNumber =
        document.getElementById(
            "pageNumber"
        );



    if(!comicImage){

        console.log(
            "Comic image element missing"
        );

        return;

    }



    if(page < 1){

        page = 1;

    }



    if(page > comicConfig.totalPages){

        page = comicConfig.totalPages;

    }



    currentPage = page;



    comicImage.src =

    comicConfig.folder +

    comicConfig.prefix +

    currentPage +

    comicConfig.extension;



    comicImage.alt =

    "Text File Adventure Page "
    + currentPage;



    if(pageNumber){

        pageNumber.innerHTML =

        `📖 Magic Page ${currentPage} / ${comicConfig.totalPages}`;

    }



}



/* =========================================================
   NEXT COMIC PAGE
   ========================================================= */


function nextComic(){


    if(currentPage <
       comicConfig.totalPages){


        currentPage++;


        loadComicPage(currentPage);


        playMagicSound();


    }


}



/* =========================================================
   PREVIOUS COMIC PAGE
   ========================================================= */


function previousComic(){


    if(currentPage > 1){


        currentPage--;


        loadComicPage(currentPage);


        playMagicSound();


    }


}



/* =========================================================
   GO TO SPECIFIC PAGE
   ========================================================= */


function openComicPage(page){


    loadComicPage(page);


}



/* =========================================================
   KEYBOARD CONTROL
   ========================================================= */


document.addEventListener(
"keydown",

(event)=>{


    if(event.key==="ArrowRight"){

        nextComic();

    }


    if(event.key==="ArrowLeft"){

        previousComic();

    }


});



/* =========================================================
   MAGIC SOUND EFFECT
   ========================================================= */


function playMagicSound(){


    const sound =
    document.getElementById(
        "magicSound"
    );


    if(sound){


        sound.currentTime = 0;


        sound.play()
        .catch(()=>{});


    }


}



/* =========================================================
   MAGIC PARTICLE EFFECT
   ========================================================= */


function createMagicParticles(){


    const container =
    document.querySelector(
        ".text-adventure"
    );


    if(!container)
        return;



    for(let i=0;i<20;i++){


        let star =
        document.createElement(
            "span"
        );


        star.className =
        "magic-star";


        star.style.left =
        Math.random()*100+"%";


        star.style.top =
        Math.random()*100+"%";


        star.style.animationDelay =
        Math.random()*5+"s";



        container.appendChild(star);


    }


}


/* =========================================================
   INITIAL MESSAGE
   ========================================================= */


function showWelcomeMessage(){


    console.log(
    "🦖 Dino entered the Text File Kingdom!"
    );


    console.log(
    "🦁 Master CSV is waiting with new challenges."
    );


}


showWelcomeMessage();
/* =========================================================
   TEXT FILE HANDLING ADVENTURE
   app.js - Part 2

   Pyodide Python Coding Chamber
   ========================================================= */


/* =========================================================
   PYODIDE INITIALIZATION
   ========================================================= */


let pyodide = null;



async function initializePython(){


    const output =
    document.getElementById(
        "output"
    );


    try{


        if(output){

            output.innerHTML =
            "🐍 Awakening Python Magic...";

        }



        pyodide =
        await loadPyodide();



        if(output){

            output.innerHTML =
            "✨ Python Magic Ready! Start Coding.";

        }



        console.log(
            "Python Engine Loaded"
        );


    }

    catch(error){


        console.error(error);


        if(output){

            output.innerHTML =
            "❌ Python Magic Failed To Load";

        }


    }


}



/* Start Pyodide when page opens */

document.addEventListener(
"DOMContentLoaded",
()=>{

    initializePython();

});



/* =========================================================
   RUN PYTHON CODE
   ========================================================= */


async function runPythonCode(){


    const codeBox =
    document.getElementById(
        "codeEditor"
    );


    const output =
    document.getElementById(
        "output"
    );



    if(!codeBox){


        console.log(
        "Code editor not found"
        );

        return;

    }



    const code =
    codeBox.value;



    if(!pyodide){


        output.innerHTML =
        "⌛ Python is still waking up...";


        return;

    }



    try{


        output.innerHTML =
        "⚡ Running Magic Code...";



        let result =
        await pyodide.runPythonAsync(
            code
        );



        if(result===undefined){

            result =
            "✅ Code executed successfully";

        }



        output.innerHTML =
        result;



        rewardXP(10);



        saveProgress();



    }



    catch(error){


        output.innerHTML =

        "❌ Magic Error:<br>" +

        error;



    }


}



/* =========================================================
   CAPTURE PRINT OUTPUT
   ========================================================= */


function setupPythonOutput(){


    if(!pyodide)
        return;



    pyodide.runPython(`

import sys

from io import StringIO


`);

}



/* =========================================================
   TEXT FILE CHALLENGE LOADER
   ========================================================= */


const challenges = {


    beginner:{


        title:
        "Create Your First Text File",


        code:

`file=open("magic.txt","w")
file.write("Hello Dino")
file.close()

print("File Created Successfully")`

    },



    reader:{


        title:
        "Read Dino's Message",


        code:

`file=open("magic.txt","r")

data=file.read()

file.close()

print(data)`

    },



    append:{


        title:
        "Add New Data",


        code:

`file=open("magic.txt","a")

file.write("\\nNew Adventure")

file.close()

print("Data Added")`

    }


};



function loadChallenge(name){


    const editor =
    document.getElementById(
        "codeEditor"
    );


    if(
    challenges[name]
    &&
    editor
    ){


        editor.value =
        challenges[name].code;


    }


}



/* =========================================================
   RESET CODE EDITOR
   ========================================================= */


function clearCode(){


    const editor =
    document.getElementById(
        "codeEditor"
    );


    if(editor){

        editor.value="";

    }


}
/* =========================================================
   TEXT FILE HANDLING ADVENTURE
   app.js - Part 3

   Progress + XP + Achievement System
   ========================================================= */


/* =========================================================
   PLAYER DATA
   ========================================================= */


let playerData = {


    xp:0,

    coins:0,

    completedTasks:[],

    badges:[]


};



/* =========================================================
   LOAD SAVED PROGRESS
   ========================================================= */


function loadProgress(){


    let saved =

    localStorage.getItem(
        "textFileAdventure"
    );



    if(saved){


        playerData =
        JSON.parse(saved);


        updatePlayerUI();


    }



}



/* =========================================================
   SAVE PROGRESS
   ========================================================= */


function saveProgress(){


    localStorage.setItem(

        "textFileAdventure",

        JSON.stringify(playerData)

    );


    console.log(
        "💾 Progress Saved"
    );


}



/* =========================================================
   ADD XP REWARD
   ========================================================= */


function rewardXP(amount){


    playerData.xp += amount;


    playerData.coins +=
    Math.floor(amount/2);



    showReward(

        `✨ +${amount} XP Earned`

    );


    checkAchievements();


    updatePlayerUI();


    saveProgress();


}



/* =========================================================
   PLAYER DISPLAY UPDATE
   ========================================================= */


function updatePlayerUI(){


    const xp =
    document.getElementById(
        "xpValue"
    );


    const coins =
    document.getElementById(
        "coinValue"
    );



    if(xp){

        xp.innerHTML =
        playerData.xp;

    }



    if(coins){

        coins.innerHTML =
        playerData.coins;

    }


}



/* =========================================================
   REWARD POPUP
   ========================================================= */


function showReward(message){


    const popup =
    document.getElementById(
        "rewardPopup"
    );



    if(!popup)
        return;



    popup.innerHTML =

    `<h2>${message}</h2>
     <p>Dino gained new coding power!</p>`;


    popup.style.display="block";



    setTimeout(()=>{


        popup.style.display="none";


    },2500);



}



/* =========================================================
   ACHIEVEMENT SYSTEM
   ========================================================= */


const achievements = {


    firstCode:{


        name:"🐣 First Spell",

        condition:
        ()=>playerData.xp>=10


    },


    fileMaster:{


        name:"📜 File Wizard",

        condition:
        ()=>playerData.xp>=50


    },


    textKing:{


        name:"👑 Text File Champion",

        condition:
        ()=>playerData.xp>=100


    }


};



function checkAchievements(){



    for(let key in achievements){


        let badge =
        achievements[key];



        if(

        badge.condition()

        &&

        !playerData.badges.includes(
            badge.name
        )

        ){


            playerData.badges.push(
                badge.name
            );



            showReward(

            "🏆 Badge Unlocked: "
            +
            badge.name

            );


        }


    }



}



/* =========================================================
   KINGDOM COMPLETION
   ========================================================= */


function completeTextKingdom(){



    if(
    !playerData.completedTasks.includes(
        "Text File Kingdom"
    )
    ){


        playerData.completedTasks.push(
            "Text File Kingdom"
        );


        rewardXP(50);



        showReward(

        "🏰 Text File Kingdom Completed!"

        );


    }



}



/* =========================================================
   CONNECT QUIZ COMPLETION
   ========================================================= */


function quizCompleted(score){



    let earnedXP =
    score * 5;



    rewardXP(
        earnedXP
    );



    console.log(

    "Quiz XP:",
    earnedXP

    );


}



/* =========================================================
   START ADVENTURE
   ========================================================= */


document.addEventListener(

"DOMContentLoaded",

()=>{


    loadProgress();


});
// ==========================================
// MAGIC TILE SECTION SWITCHING
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const tiles = document.querySelectorAll(".magicTile");
    const sections = document.querySelectorAll(".lessonContent");


    tiles.forEach(tile => {

        tile.addEventListener("click", () => {


            // Remove active from all tiles
            tiles.forEach(t => {
                t.classList.remove("active");
            });


            // Hide all sections
            sections.forEach(section => {
                section.classList.remove("active");
            });


            // Activate clicked tile
            tile.classList.add("active");


            // Show selected section
            const target =
            tile.getAttribute("data-section");


            const selected =
            document.getElementById(target);


            if(selected){

                selected.classList.add("active");

            }


        });

    });


});
