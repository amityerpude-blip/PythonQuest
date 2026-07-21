/*==========================================
        Python Quest Dashboard
        Version 2.0
==========================================*/

// ---------- Load Player Data ----------
let player = JSON.parse(localStorage.getItem("pythonQuestPlayer"));

if (!player) {

    player = {

        name: "Dino Explorer",

        level: 1,

        xp: 0,

        coins: 0,

        badges: 0,

        completedWorlds: [],

        unlockedWorlds: [

            "python-village",
            "condition-forest",
            "loop-mountain",
            "text-file-library",
            "csv-kingdom",
            "pandas-city",
            "sql-dragon",
            "ai-temple"

        ],

        streak: 1

    };

    savePlayer();

}

// ---------- Save ----------
function savePlayer() {

    localStorage.setItem(

        "pythonQuestPlayer",

        JSON.stringify(player)

    );

}

// ---------- Update Dashboard ----------
function updateDashboard() {

    document.getElementById("xp").innerText = player.xp;

    document.getElementById("coins").innerText = player.coins;

    document.getElementById("badges").innerText = player.badges;

    document.getElementById("playerLevel").innerText = player.level;

    calculateProgress();

}

updateDashboard();

// ---------- Progress ----------
function calculateProgress() {

    const totalWorlds = 8;

    const completed = player.completedWorlds.length;

    const percent = (completed / totalWorlds) * 100;

    document.getElementById("overallProgress").style.width =

        percent + "%";

}

// ---------- XP ----------
function addXP(value) {

    player.xp += value;

    checkLevel();

    savePlayer();

    updateDashboard();

}

// ---------- Coins ----------
function addCoins(value) {

    player.coins += value;

    savePlayer();

    updateDashboard();

}

// ---------- Badges ----------
function addBadge() {

    player.badges++;

    savePlayer();

    updateDashboard();

}

// ---------- Level System ----------
function checkLevel() {

    const required = player.level * 500;

    if (player.xp >= required) {

        player.level++;

        alert(
            "🎉 Level Up!\n\nYou reached Level " +
            player.level
        );

    }

}

// ---------- Complete World ----------
function completeWorld(worldID) {

    if (!player.completedWorlds.includes(worldID)) {

        player.completedWorlds.push(worldID);

    }

    addXP(200);

    addCoins(100);

    addBadge();

    savePlayer();

    updateDashboard();

}

// ---------- Open World ----------
function openWorld(folder) {

    window.location.href = folder + "/index.html";

}

// ---------- Developer Helpers ----------
function resetGame() {

    if (confirm("Reset all progress?")) {

        localStorage.removeItem("pythonQuestPlayer");

        location.reload();

    }

}

function developerReward() {

    addXP(500);

    addCoins(500);

}

console.log("✅ Python Quest Dashboard Loaded");
