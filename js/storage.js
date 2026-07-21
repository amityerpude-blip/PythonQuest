/*==========================================
        Python Quest Storage Engine
        Version 2.0
==========================================*/

const STORAGE_KEY = "pythonQuestPlayer";

/*==========================================
        DEFAULT PLAYER
==========================================*/

const DEFAULT_PLAYER = {

    name: "Dino Explorer",

    level: 1,

    xp: 0,

    coins: 0,

    badges: 0,

    streak: 1,

    lastLogin: "",

    completedWorlds: [],

    achievements: [],

    unlockedWorlds: [

        "python-village",
        "condition-forest",
        "loop-mountain",
        "text-file-library",
        "csv-kingdom",
        "pandas-city",
        "sql-dragon",
        "ai-temple"

    ]

};

/*==========================================
        LOAD PLAYER
==========================================*/

function loadPlayer(){

    let player = JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    );

    if(player==null){

        player = structuredClone(DEFAULT_PLAYER);

        savePlayer(player);

    }

    return player;

}

/*==========================================
        SAVE PLAYER
==========================================*/

function savePlayer(player){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(player)

    );

}

/*==========================================
        GLOBAL PLAYER
==========================================*/

let player = loadPlayer();

/*==========================================
        XP
==========================================*/

function addXP(amount){

    player.xp += amount;

    checkLevelUp();

    savePlayer(player);

}

/*==========================================
        COINS
==========================================*/

function addCoins(amount){

    player.coins += amount;

    savePlayer(player);

}

/*==========================================
        BADGES
==========================================*/

function addBadge(){

    player.badges++;

    savePlayer(player);

}

/*==========================================
        LEVEL SYSTEM
==========================================*/

function checkLevelUp(){

    let required = player.level * 500;

    while(player.xp >= required){

        player.level++;

        required = player.level * 500;

        showPopup(

            "🎉 Level Up!\nLevel " + player.level

        );

    }

}

/*==========================================
        COMPLETE WORLD
==========================================*/

function completeWorld(world){

    if(

        !player.completedWorlds.includes(world)

    ){

        player.completedWorlds.push(world);

    }

    savePlayer(player);

}

/*==========================================
        UNLOCK WORLD
==========================================*/

function unlockWorld(world){

    if(

        !player.unlockedWorlds.includes(world)

    ){

        player.unlockedWorlds.push(world);

    }

    savePlayer(player);

}

/*==========================================
        ACHIEVEMENTS
==========================================*/

function unlockAchievement(name){

    if(

        !player.achievements.includes(name)

    ){

        player.achievements.push(name);

        showPopup(

            "🏆 Achievement Unlocked\n\n" + name

        );

    }

    savePlayer(player);

}

/*==========================================
        STREAK
==========================================*/

function updateStreak(){

    const today =

        new Date().toDateString();

    if(player.lastLogin!==today){

        player.streak++;

        player.lastLogin=today;

        savePlayer(player);

    }

}

/*==========================================
        RESET GAME
==========================================*/

function resetGame(){

    if(

        confirm(

            "Reset Python Quest Progress?"

        )

    ){

        localStorage.removeItem(

            STORAGE_KEY

        );

        location.reload();

    }

}

/*==========================================
        POPUP
==========================================*/

function showPopup(message){

    alert(message);

}

/*==========================================
        PLAYER SUMMARY
==========================================*/

function getPlayer(){

    return player;

}

/*==========================================
        DEBUG
==========================================*/

console.log(

"Python Quest Storage Loaded"

);

console.log(player);
