/*====================================================
        Python Quest - Text File Quiz
====================================================*/

const quizQuestions = [

{
type:"mcq",
question:"1. Which function is used to open a file in Python?",
options:[
"read()",
"open()",
"write()",
"close()"
],
answer:1
},

{
type:"mcq",
question:"2. Which mode opens a file for writing?",
options:[
"r",
"w",
"a",
"x"
],
answer:1
},

{
type:"mcq",
question:"3. Which method reads the entire file?",
options:[
"read()",
"write()",
"append()",
"input()"
],
answer:0
},

{
type:"mcq",
question:"4. Which mode appends data at the end of a file?",
options:[
"r",
"w",
"a",
"x"
],
answer:2
},

{
type:"tf",
question:"5. The 'r' mode creates a new file.",
answer:false
},

{
type:"tf",
question:"6. Files should be closed after use.",
answer:true
},

{
type:"output",
question:`7. What will be printed?

file=open("demo.txt","w")
file.write("Python")
file.close()

file=open("demo.txt","r")
print(file.read())`,
answer:"Python"
},

{
type:"output",
question:`8. Which mode is used?

open("student.txt","a")`,
answer:"a"
},

{
type:"output",
question:`9. Which method writes data into a file?`,
answer:"write"
},

{
type:"output",
question:`10. Which function closes a file?`,
answer:"close"
}

];

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
