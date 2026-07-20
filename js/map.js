/*====================================================
        Python Quest Adventure Map
        Version 1.0
=====================================================*/

// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    initializePlayer();

    loadAdventureMap();

});

//-----------------------------------------
// Load Adventure Map
//-----------------------------------------

function loadAdventureMap(){

    const player = getPlayer();

    const worlds = document.querySelectorAll(".world");

    worlds.forEach(world => {

        const worldName = world.querySelector("h2").innerText;

        const button = world.querySelector("button");

        const key = worldName.toLowerCase().replace(/\s+/g,"-");

        if(player.unlockedWorlds.includes(key)){

            world.classList.remove("locked");

            world.classList.add("unlocked");

            button.disabled = false;

            button.innerText = "Enter";

        }
        else{

            world.classList.remove("unlocked");

            world.classList.add("locked");

            button.disabled = true;

            button.innerText = "Locked";

        }

    });

}

//-----------------------------------------
// Unlock Next World
//-----------------------------------------

function unlockNextWorld(currentWorld,nextWorld){

    unlockWorld(nextWorld);

    addXP(100);

    addCoins(50);

    unlockAchievement("Completed " + currentWorld);

    alert("🎉 Congratulations!\n\nYou unlocked " + nextWorld);

    loadAdventureMap();

}

//-----------------------------------------
// World Completed
//-----------------------------------------

function completeWorld(world){

    switch(world){

        case "python-village":

            unlockNextWorld(

                "Python Village",

                "condition-forest"

            );

            break;

        case "condition-forest":

            unlockNextWorld(

                "Condition Forest",

                "loop-mountain"

            );

            break;

        case "loop-mountain":

            unlockNextWorld(

                "Loop Mountain",

                "function-temple"

            );

            break;

        case "function-temple":

            unlockNextWorld(

                "Function Temple",

                "text-file-library"

            );

            break;

        case "text-file-library":

            unlockNextWorld(

                "Text File Library",

                "csv-kingdom"

            );

            break;

        case "csv-kingdom":

            unlockNextWorld(

                "CSV Kingdom",

                "pandas-city"

            );

            break;

        case "pandas-city":

            unlockNextWorld(

                "Pandas City",

                "sql-dragon-cave"

            );

            break;

        case "sql-dragon-cave":

            addXP(500);

            addCoins(500);

            unlockAchievement("Python Master");

            alert("🏆 Congratulations!\nYou completed Python Quest!");

            break;

    }

}

//-----------------------------------------
// Enter World
//-----------------------------------------

document.addEventListener("click",function(e){

    if(e.target.tagName==="BUTTON"){

        if(e.target.disabled) return;

        const worldCard = e.target.closest(".world");

        const world = worldCard.querySelector("h2").innerText
        .toLowerCase()
        .replace(/\s+/g,"-");

        console.log("Entering:",world);

        // Future Integration
        // location.href = world + ".html";

        alert("🚀 Entering " + world);

    }

});

//-----------------------------------------
// Player Information
//-----------------------------------------

function showPlayerStatus(){

    const player = getPlayer();

    console.log(player);

}

showPlayerStatus();
