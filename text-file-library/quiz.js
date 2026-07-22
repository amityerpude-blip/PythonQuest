const monsterQuestions=[

{

monster:"🐛 Bug Monster I",

question:"Which function opens a file?",

options:["read()","open()","write()","close()"],

answer:1

},

{

monster:"🐛 Bug Monster II",

question:"Which mode is used for writing?",

options:["r","w","a","rb"],

answer:1

},

{

monster:"🐛 Bug Monster III",

question:"Which function closes a file?",

options:["end()","close()","finish()","stop()"],

answer:1

},

{

monster:"👹 Final Bug Monster",

question:"Which mode appends data?",

options:["r","w","a","x"],

answer:2

}

];

let currentMonster=0;

let userAnswers=[];

loadMonster();

function loadMonster(){

let q=monsterQuestions[currentMonster];

document.getElementById("monsterTitle").innerHTML=q.monster;

document.getElementById("questionText").innerHTML=q.question;

document.getElementById("monsterNumber").innerHTML=

`Monster ${currentMonster+1} of ${monsterQuestions.length}`;

document.getElementById("monsterProgress").style.width=

((currentMonster+1)/monsterQuestions.length*100)+"%";

let html="";

q.options.forEach((opt,index)=>{

html+=`

<label class="option">

<input type="radio"

name="monster"

value="${index}"

${userAnswers[currentMonster]==index?"checked":""}>

${opt}

</label>

`;

});

document.getElementById("optionsContainer").innerHTML=html;

document.getElementById("prevBtn").disabled=currentMonster==0;

if(currentMonster==monsterQuestions.length-1){

document.getElementById("nextBtn").style.display="none";

document.getElementById("finishBtn").style.display="inline-block";

}else{

document.getElementById("nextBtn").style.display="inline-block";

document.getElementById("finishBtn").style.display="none";

}

}

function saveAnswer(){

let selected=document.querySelector('input[name="monster"]:checked');

if(selected){

userAnswers[currentMonster]=parseInt(selected.value);

}

}

function nextMonster(){

saveAnswer();

currentMonster++;

loadMonster();

}

function previousMonster(){

saveAnswer();

currentMonster--;

loadMonster();

}

function finishHunt(){

saveAnswer();

let score=0;

monsterQuestions.forEach((q,i)=>{

if(userAnswers[i]==q.answer) score++;

});

alert(

`🎉 Monster Hunt Complete!\n\nScore : ${score}/${monsterQuestions.length}`

);

}
/*====================================================
            CREATE QUIZ
====================================================*/

let quizContainer;

function loadQuiz(){

if(!quizContainer) return;

quizContainer.innerHTML="";

quizQuestions.forEach((q,index)=>{

let html="";

html+=`<div class="quizCard">`;

html+=`<h3>${q.question}</h3>`;

if(q.type==="mcq"){

q.options.forEach((opt,i)=>{

html+=`

<label>

<input

type="radio"

name="q${index}"

value="${i}"

>

${opt}

</label>

`;

});

}

else if(q.type==="tf"){

html+=`

<label>

<input

type="radio"

name="q${index}"

value="true"

>

True

</label>

<label>

<input

type="radio"

name="q${index}"

value="false"

>

False

</label>

`;

}

else{

html+=`

<input

type="text"

id="q${index}"

placeholder="Type your answer"

>

`;

}

html+="</div>";

quizContainer.innerHTML+=html;

});

}

document.addEventListener("DOMContentLoaded", function(){

    quizContainer = document.getElementById("quizContainer");

    loadQuiz();

});


/*====================================================
            SUBMIT QUIZ
====================================================*/

const submitBtn = document.getElementById("submitQuiz");

if(submitBtn){

    submitBtn.addEventListener("click", submitQuiz);

}
function submitQuiz(){

let score=0;

quizQuestions.forEach((q,index)=>{

if(q.type==="mcq"){

const ans=document.querySelector(

`input[name="q${index}"]:checked`

);

if(ans){

if(Number(ans.value)===q.answer){

score++;

}

}

}

else if(q.type==="tf"){

const ans=document.querySelector(

`input[name="q${index}"]:checked`

);

if(ans){

const value=ans.value==="true";

if(value===q.answer){

score++;

}

}

}

else{

const value=document
.getElementById(`q${index}`)
.value
.trim()
.toLowerCase();

if(value===q.answer.toLowerCase()){

score++;

}

}

});

showResult(score);

}

/*====================================================
            RESULT
====================================================*/

function showResult(score){

const percent=
Math.round(score/quizQuestions.length*100);

document.getElementById("quizScore").innerHTML=`

<h2>

🎉 Score : ${score} / ${quizQuestions.length}

</h2>

<h3>

Accuracy : ${percent}%

</h3>

`;

if(percent>=70){

rewardPlayer();

}

}

/*====================================================
            PLAYER REWARD
====================================================*/

function rewardPlayer(){

let player=JSON.parse(

localStorage.getItem("pythonQuestPlayer")

);

if(!player){

player={

xp:0,

coins:0,

badges:0,

level:1

};

}

player.xp+=150;

player.coins+=50;

player.badges+=1;

if(player.xp>=500){

player.level++;

}

localStorage.setItem(

"pythonQuestPlayer",

JSON.stringify(player)

);

if(typeof updatePlayerStats==="function"){

updatePlayerStats();

}

alert(

"🏆 Congratulations!\n\n"+

"+150 XP\n"+

"+50 Coins\n"+

"+1 Badge"

);
window.loadQuiz = loadQuiz;
}

console.log("Quiz Loaded Successfully");
