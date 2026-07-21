/*=====================================================
    Python Quest Storage Manager
    Version : 1.0
=====================================================*/

const STORAGE_KEY = "pythonQuestPlayer";

/*=========================================
    Default Player Data
=========================================*/

const DEFAULT_PLAYER = {

    profile: {

        name: "Dino",

        avatar: "🦖",

        level: 1,

        xp: 0,

        coins: 100,

        lives: 5

    },

    progress: {

        comics: [],

        animations: [],

        quizzes: [],

        coding: []

    },

    unlockedWorlds: [
    "python-village",
    "condition-forest",
    "loop-mountain",
    "function-temple",
    "text-file-library"
]

    achievements: [

        "Welcome Adventurer"

    ],

    settings: {

        theme: "dark",

        sound: true,

        music: true

    }

};

/*=========================================
    Initialize Storage
=========================================*/

function initializePlayer(){

    if(!localStorage.getItem(STORAGE_KEY)){

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(DEFAULT_PLAYER)

        );

    }

}

/*=========================================
    Get Player
=========================================*/

function getPlayer(){

    initializePlayer();

    return JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    );

}

/*=========================================
    Save Player
=========================================*/

function savePlayer(player){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(player)

    );

}

/*=========================================
    XP
=========================================*/

function addXP(points){

    let player = getPlayer();

    player.profile.xp += points;

    player.profile.level =

        Math.floor(player.profile.xp/500)+1;

    savePlayer(player);

}

/*=========================================
    Coins
=========================================*/

function addCoins(coins){

    let player=getPlayer();

    player.profile.coins += coins;

    savePlayer(player);

}

/*=========================================
    Lives
=========================================*/

function loseLife(){

    let player=getPlayer();

    if(player.profile.lives>0){

        player.profile.lives--;

    }

    savePlayer(player);

}

function gainLife(){

    let player=getPlayer();

    player.profile.lives++;

    savePlayer(player);

}

/*=========================================
    Unlock World
=========================================*/

function unlockWorld(world){

    let player=getPlayer();

    if(!player.unlockedWorlds.includes(world)){

        player.unlockedWorlds.push(world);

    }

    savePlayer(player);

}

/*=========================================
    Achievements
=========================================*/

function unlockAchievement(title){

    let player=getPlayer();

    if(!player.achievements.includes(title)){

        player.achievements.push(title);

    }

    savePlayer(player);

}

/*=========================================
    Comic Progress
=========================================*/

function completeComic(id){

    let player=getPlayer();

    if(!player.progress.comics.includes(id)){

        player.progress.comics.push(id);

    }

    savePlayer(player);

}

/*=========================================
    Animation Progress
=========================================*/

function completeAnimation(id){

    let player=getPlayer();

    if(!player.progress.animations.includes(id)){

        player.progress.animations.push(id);

    }

    savePlayer(player);

}

/*=========================================
    Quiz Progress
=========================================*/

function completeQuiz(id){

    let player=getPlayer();

    if(!player.progress.quizzes.includes(id)){

        player.progress.quizzes.push(id);

    }

    savePlayer(player);

}

/*=========================================
    Coding Progress
=========================================*/

function completeCoding(id){

    let player=getPlayer();

    if(!player.progress.coding.includes(id)){

        player.progress.coding.push(id);

    }

    savePlayer(player);

}

/*=========================================
    Reset Game
=========================================*/

function resetGame(){

    localStorage.removeItem(STORAGE_KEY);

    initializePlayer();

}

/*=========================================
    Auto Initialize
=========================================*/

initializePlayer();

console.log("🐉 Python Quest Storage Loaded");
