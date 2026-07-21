/*==================================================
        Python Quest
        Global App Engine v1.0
==================================================*/

const APP = {

    name: "Python Quest",

    version: "1.0",

    developerMode: true,

    musicEnabled: false,

    soundEnabled: true

};

/*=========================================
        Initialize App
=========================================*/

window.addEventListener("DOMContentLoaded", () => {

    console.log(APP.name + " Started");

    initializePlayer();

    updateNavbar();

    animateCards();

    setupButtons();

});

/*=========================================
        Player
=========================================*/

function initializePlayer() {

    if (!localStorage.getItem("pythonQuestPlayer")) {

        const player = {

            name: "Dino Explorer",

            level: 1,

            xp: 0,

            coins: 0,

            badges: 0,

            streak: 1,

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

            completedWorlds: []

        };

        localStorage.setItem(

            "pythonQuestPlayer",

            JSON.stringify(player)

        );

    }

}

/*=========================================
        Read Player
=========================================*/

function getPlayer() {

    return JSON.parse(

        localStorage.getItem(

            "pythonQuestPlayer"

        )

    );

}

/*=========================================
        Save Player
=========================================*/

function savePlayer(player) {

    localStorage.setItem(

        "pythonQuestPlayer",

        JSON.stringify(player)

    );

}

/*=========================================
        XP
=========================================*/

function addXP(amount) {

    let player = getPlayer();

    player.xp += amount;

    if (player.xp >= player.level * 500) {

        player.level++;

        showNotification(

            "🎉 Level Up! Level " + player.level

        );

    }

    savePlayer(player);

}

/*=========================================
        Coins
=========================================*/

function addCoins(amount) {

    let player = getPlayer();

    player.coins += amount;

    savePlayer(player);

}

/*=========================================
        Badge
=========================================*/

function addBadge() {

    let player = getPlayer();

    player.badges++;

    savePlayer(player);

}

/*=========================================
        Complete World
=========================================*/

function completeWorld(world) {

    let player = getPlayer();

    if (!player.completedWorlds.includes(world)) {

        player.completedWorlds.push(world);

    }

    savePlayer(player);

}

/*=========================================
        Unlock World
=========================================*/

function unlockWorld(world) {

    let player = getPlayer();

    if (!player.unlockedWorlds.includes(world)) {

        player.unlockedWorlds.push(world);

    }

    savePlayer(player);

}

/*=========================================
        Notification
=========================================*/

function showNotification(message) {

    const notice = document.createElement("div");

    notice.className = "notification";

    notice.innerHTML = message;

    document.body.appendChild(notice);

    setTimeout(() => {

        notice.remove();

    }, 3000);

}

/*=========================================
        Navbar
=========================================*/

function updateNavbar() {

    const path = location.pathname;

    document.querySelectorAll("nav a").forEach(link => {

        if (path.includes(link.getAttribute("href"))) {

            link.classList.add("active");

        }

    });

}

/*=========================================
        Button Animation
=========================================*/

function setupButtons() {

    document.querySelectorAll("button").forEach(btn => {

        btn.addEventListener("mouseenter", () => {

            btn.style.transform = "scale(1.05)";

        });

        btn.addEventListener("mouseleave", () => {

            btn.style.transform = "scale(1)";

        });

    });

}

/*=========================================
        Card Animation
=========================================*/

function animateCards() {

    const cards = document.querySelectorAll(

        ".module,.card,.achievement"

    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition = ".5s";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, index * 100);

    });

}

/*=========================================
        Music
=========================================*/

function toggleMusic(audioId) {

    const music = document.getElementById(audioId);

    if (!music) return;

    if (music.paused) {

        music.play();

        APP.musicEnabled = true;

    } else {

        music.pause();

        APP.musicEnabled = false;

    }

}

/*=========================================
        Developer Mode
=========================================*/

function developerReward() {

    if (!APP.developerMode) return;

    addXP(1000);

    addCoins(500);

    addBadge();

    showNotification(

        "🛠 Developer Reward Added"

    );

}

/*=========================================
        Reset Game
=========================================*/

function resetGame() {

    if (confirm("Reset Python Quest Progress?")) {

        localStorage.removeItem(

            "pythonQuestPlayer"

        );

        location.reload();

    }

}

/*=========================================
        Page Loader
=========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

});

/*=========================================
        Console
=========================================*/

console.log("================================");

console.log(" Python Quest Global Engine");

console.log(" Version : " + APP.version);

console.log("================================");
