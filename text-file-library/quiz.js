// =====================================================
// Python Quest
// Monster Hunt Quiz System
// =====================================================
alert("quiz.js loaded");
console.log("quiz.js loaded");
const monsterQuestions = [

{
    monster: "🐛 Bug Monster I",
    question: "Which function opens a file?",
    options: [
        "read()",
        "open()",
        "write()",
        "close()"
    ],
    answer: 1
},

{
    monster: "🐛 Bug Monster II",
    question: "Which mode is used for writing to a file?",
    options: [
        "r",
        "w",
        "a",
        "rb"
    ],
    answer: 1
},

{
    monster: "🐛 Bug Monster III",
    question: "Which function closes a file?",
    options: [
        "end()",
        "close()",
        "finish()",
        "stop()"
    ],
    answer: 1
},

{
    monster: "👹 Final Bug Monster",
    question: "Which mode appends data to an existing file?",
    options: [
        "r",
        "w",
        "a",
        "x"
    ],
    answer: 2
}

];

let currentMonster = 0;
let userAnswers = [];

// =====================================================
// LOAD CURRENT MONSTER
// =====================================================

function loadMonster(){

    const q = monsterQuestions[currentMonster];

    document.getElementById("monsterTitle").textContent =
        q.monster;

    document.getElementById("questionText").textContent =
        q.question;

    document.getElementById("monsterNumber").textContent =
        `Monster ${currentMonster + 1} of ${monsterQuestions.length}`;

    document.getElementById("monsterProgress").style.width =
        ((currentMonster + 1) / monsterQuestions.length * 100) + "%";

    let html = "";

    q.options.forEach((option,index)=>{

        html += `
        <label class="option">
            <input
                type="radio"
                name="monster"
                value="${index}"
                ${userAnswers[currentMonster]===index ? "checked" : ""}
            >

            <span>${option}</span>

        </label>
        `;

    });

    document.getElementById("optionsContainer").innerHTML = html;

    document.getElementById("prevBtn").disabled =
        currentMonster === 0;

    if(currentMonster === monsterQuestions.length-1){

        document.getElementById("nextBtn").style.display =
            "none";

        document.getElementById("finishBtn").style.display =
            "inline-block";

    }else{

        document.getElementById("nextBtn").style.display =
            "inline-block";

        document.getElementById("finishBtn").style.display =
            "none";

    }

}
// =====================================================
// SAVE ANSWER
// =====================================================

function saveAnswer(){

    const selected =
        document.querySelector('input[name="monster"]:checked');

    if(selected){

        userAnswers[currentMonster] =
            Number(selected.value);

    }

}

// =====================================================
// NEXT MONSTER
// =====================================================

function nextMonster(){

    saveAnswer();

    if(currentMonster < monsterQuestions.length - 1){

        currentMonster++;

        loadMonster();

    }

}

// =====================================================
// PREVIOUS MONSTER
// =====================================================

function previousMonster(){

    saveAnswer();

    if(currentMonster > 0){

        currentMonster--;

        loadMonster();

    }

}

// =====================================================
// FINISH HUNT
// =====================================================

function finishHunt(){

    saveAnswer();

    let score = 0;

    monsterQuestions.forEach((q,index)=>{

        if(userAnswers[index] === q.answer){

            score++;

        }

    });

    // Player Data

    let player = JSON.parse(
        localStorage.getItem("pythonQuestPlayer")
    );

    if(!player){

        player = {

            xp:0,
            coins:0,
            badges:0,
            level:1

        };

    }

    // Rewards

    player.xp += score * 50;

    player.coins += score * 20;

    if(score === monsterQuestions.length){

        player.badges++;

    }

    if(player.xp >= player.level * 500){

        player.level++;

    }

    localStorage.setItem(
        "pythonQuestPlayer",
        JSON.stringify(player)
    );

    if(typeof updatePlayerStats === "function"){

        updatePlayerStats();

    }

    alert(

`🏆 Monster Hunt Complete!

⭐ Score : ${score}/${monsterQuestions.length}

Rewards Earned

⭐ ${score*50} XP
🪙 ${score*20} Coins
${score===monsterQuestions.length ? "🏅 New Badge Earned!" : ""}`

    );

}

// =====================================================
// START MONSTER HUNT
// =====================================================

document.addEventListener("DOMContentLoaded",function(){

    loadMonster();

});

console.log("🐉 Monster Hunt Loaded Successfully");
