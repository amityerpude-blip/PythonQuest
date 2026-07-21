/*=========================================================
                PYTHON QUEST
              DASHBOARD CONTROLLER
        Adventure Hub Version 2.0
=========================================================*/

const TOTAL_WORLDS = 13;

/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadPlayer();

    updateOverallProgress();

    updateWorldStatus();

    initializeButtons();

    showDailyMission();

    updateContinueButton();

    console.log("🌍 Adventure Hub Loaded");

});


/*=========================================================
                LOAD PLAYER
=========================================================*/

function loadPlayer(){

    let player = JSON.parse(
        localStorage.getItem("pythonQuestPlayer")
    );

    if(!player){

        player = {

            xp:0,

            coins:0,

            badges:0,

            level:1,

            completedWorlds:[]

        };

        localStorage.setItem(

            "pythonQuestPlayer",

            JSON.stringify(player)

        );

    }

    updatePlayerStats(player);

}


/*=========================================================
                PLAYER STATS
=========================================================*/

function updatePlayerStats(player){

    setValue("xp",player.xp);

    setValue("coins",player.coins);

    setValue("badges",player.badges);

    setValue("playerLevel",player.level);

}


function setValue(id,value){

    const element=document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}


/*=========================================================
                PROGRESS BAR
=========================================================*/

function updateOverallProgress(){

    const player = JSON.parse(

        localStorage.getItem(

            "pythonQuestPlayer"

        )

    );

    if(!player) return;

    const completed =

    player.completedWorlds ?

    player.completedWorlds.length : 0;

    const percent =

    completed / TOTAL_WORLDS * 100;

    const bar1 =

    document.getElementById(

        "overallProgress"

    );

    const bar2 =

    document.getElementById(

        "journeyProgress"

    );

    if(bar1)

        bar1.style.width = percent + "%";

    if(bar2)

        bar2.style.width = percent + "%";

}


/*=========================================================
            WORLD STATUS
=========================================================*/

function updateWorldStatus(){

    const cards=document.querySelectorAll(".module");

    cards.forEach((card,index)=>{

        const button=card.querySelector("a");

        if(!button) return;

        if(index<=5){

            button.innerHTML="▶ Enter";

        }

        else{

            button.innerHTML="🔒 Coming Soon";

        }

    });

}


/*=========================================================
            BUTTONS
=========================================================*/

function initializeButtons(){

    document

    .querySelectorAll(".module a")

    .forEach(button=>{

        button.addEventListener("click",function(){

            localStorage.setItem(

                "lastWorld",

                this.getAttribute("href")

            );

        });

    });

}


/*=========================================================
            CONTINUE BUTTON
=========================================================*/

function continueAdventure(){

    const last=

    localStorage.getItem("lastWorld");

    if(last){

        window.location.href=last;

    }

    else{

        window.location.href=

        "text-file-library/index.html";

    }

}


function updateContinueButton(){

    const btn=document.getElementById("continueAdventure");

    if(!btn) return;

    btn.onclick=continueAdventure;

}


/*=========================================================
            DAILY MISSION
=========================================================*/
function showDailyMission(){

    const mission =

    document.getElementById(

        "dailyMission"

    );

    if(!mission) return;

    mission.innerHTML = `

<h2>📅 Daily Mission</h2>

<p>

Complete one Coding Challenge

</p>

<p>

Reward

</p>

<h3>

⭐100 XP

🪙50 Coins

</h3>

`;

}

/*=========================================================
            COMPLETE WORLD
=========================================================*/

function completeWorld(worldName){

    let player=JSON.parse(

        localStorage.getItem("pythonQuestPlayer")

    );

    if(!player.completedWorlds){

        player.completedWorlds=[];

    }

    if(

        !player.completedWorlds.includes(worldName)

    ){

        player.completedWorlds.push(worldName);

        player.xp+=200;

        player.coins+=100;

        player.badges++;

        player.level=Math.floor(player.xp/500)+1;

        localStorage.setItem(

            "pythonQuestPlayer",

            JSON.stringify(player)

        );

        loadPlayer();

        updateOverallProgress();

        alert(

`🏆 Congratulations!

World Completed

⭐ +200 XP

🪙 +100 Coins

🏅 +1 Badge`

        );

    }

}


/*=========================================================
            MUSIC
=========================================================*/

let musicOn=true;

function toggleMusic(){

    musicOn=!musicOn;

    alert(

        musicOn ?

        "🎵 Background Music ON"

        :

        "🔇 Background Music OFF"

    );

}


/*=========================================================
            SAVE
=========================================================*/

window.addEventListener(

    "beforeunload",

    ()=>{

        console.log(

            "Progress Saved"

        );

    }

);


/*=========================================================
                END
=========================================================*/

console.log("🚀 Python Quest Dashboard Ready");
