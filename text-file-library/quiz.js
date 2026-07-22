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
/*
