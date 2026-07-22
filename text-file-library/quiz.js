/* =========================================================
   TEXT FILE HANDLING ADVENTURE
   quiz.js - Part 1

   Python Quest Quiz System
   ========================================================= */


/* =========================================================
   QUIZ QUESTION DATABASE
   ========================================================= */


const textFileQuestions = [


{
    question:
    "Which function is used to open a file in Python?",

    options:[
        "read()",
        "open()",
        "file()",
        "start()"
    ],

    answer:1
},



{
    question:
    "Which mode is used to write data into a file?",

    options:[
        "r",
        "w",
        "a",
        "x"
    ],

    answer:1
},



{
    question:
    "Which function reads the complete file content?",

    options:[
        "write()",
        "read()",
        "close()",
        "append()"
    ],

    answer:1
},



{
    question:
    "Which symbol is used for newline character?",

    options:[
        "/n",
        "\\n",
        "newline",
        "enter"
    ],

    answer:1
},



{
    question:
    "Why do we use close() function?",

    options:[
        "To delete file",
        "To save memory and close connection",
        "To rename file",
        "To create folder"
    ],

    answer:1
},



{
    question:
    "Which mode adds new content at the end of a file?",

    options:[
        "r",
        "w",
        "a",
        "rb"
    ],

    answer:2
},



{
    question:
    "What happens if we open a file in write mode that already exists?",

    options:[
        "It deletes Python",
        "It overwrites the file",
        "It becomes read only",
        "Nothing happens"
    ],

    answer:1
},



{
    question:
    "Which keyword is used to handle file automatically?",

    options:[
        "using",
        "with",
        "open",
        "auto"
    ],

    answer:1
}


];



/* =========================================================
   QUIZ VARIABLES
   ========================================================= */


let currentQuestion = 0;

let quizScore = 0;

let selectedAnswer = null;



/* =========================================================
   LOAD QUIZ
   ========================================================= */


function loadQuiz(){


    const questionBox =
    document.getElementById(
        "quizQuestion"
    );


    const optionsBox =
    document.getElementById(
        "quizOptions"
    );



    if(!questionBox ||
       !optionsBox){

        console.log(
        "Quiz HTML elements missing"
        );

        return;

    }



    let q =
    textFileQuestions[currentQuestion];



    questionBox.innerHTML =

    `Q${currentQuestion+1}. ${q.question}`;



    optionsBox.innerHTML="";



    q.options.forEach(

    (option,index)=>{


        let button =
        document.createElement(
            "button"
        );


        button.className =
        "quiz-option";


        button.innerHTML =
        option;



        button.onclick = ()=>{

            selectAnswer(
                index,
                button
            );

        };


        optionsBox.appendChild(
            button
        );


    });


}



/* =========================================================
   SELECT ANSWER
   ========================================================= */


function selectAnswer(
    answer,
    button
){


    selectedAnswer =
    answer;



    document
    .querySelectorAll(
        ".quiz-option"
    )
    .forEach(btn=>{


        btn.style.border =
        "none";


    });



    button.style.border =

    "3px solid #ffd43b";



}
/* =========================================================
   TEXT FILE HANDLING ADVENTURE
   quiz.js - Part 2

   Answer Checking + Rewards
   ========================================================= */


/* =========================================================
   CHECK ANSWER
   ========================================================= */


function submitAnswer(){


    if(selectedAnswer === null){


        alert(
        "🧙 Choose an answer first!"
        );


        return;

    }



    let question =

    textFileQuestions[currentQuestion];



    let options =

    document.querySelectorAll(
        ".quiz-option"
    );



    if(
    selectedAnswer === question.answer
    ){


        options[selectedAnswer]
        .classList.add(
            "correct"
        );


        quizScore++;



        showQuizMessage(
        "✨ Correct! Magic Power Increased"
        );



    }

    else{


        options[selectedAnswer]
        .classList.add(
            "wrong"
        );


        options[question.answer]
        .classList.add(
            "correct"
        );


        showQuizMessage(

        "❌ Not correct. Learn and try again!"

        );


    }



}



/* =========================================================
   NEXT QUESTION
   ========================================================= */


function nextQuestion(){


    selectedAnswer = null;



    currentQuestion++;



    if(
    currentQuestion <
    textFileQuestions.length
    ){


        loadQuiz();


    }

    else{


        finishQuiz();


    }


}



/* =========================================================
   QUIZ MESSAGE
   ========================================================= */


function showQuizMessage(message){


    const box =

    document.getElementById(
        "quizMessage"
    );



    if(box){


        box.innerHTML =
        message;



    }



}



/* =========================================================
   FINISH QUIZ
   ========================================================= */


function finishQuiz(){


    const questionBox =

    document.getElementById(
        "quizQuestion"
    );


    const optionsBox =

    document.getElementById(
        "quizOptions"
    );



    let percentage =

    Math.round(

    (quizScore /
    textFileQuestions.length)
    *100

    );



    if(questionBox){


        questionBox.innerHTML =

        `
        🎉 Quiz Completed!<br><br>

        Your Score:
        ${quizScore}/${textFileQuestions.length}

        <br>

        Accuracy:
        ${percentage}%

        `;


    }



    if(optionsBox){


        optionsBox.innerHTML =

        `
        <button 
        class="magic-button"
        onclick="restartQuiz()">

        🔄 Play Again

        </button>

        `;


    }



    /*
       Send reward to app.js
    */


    if(
    typeof quizCompleted === "function"
    ){


        quizCompleted(
            quizScore
        );


    }



}



/* =========================================================
   RESTART QUIZ
   ========================================================= */


function restartQuiz(){


    currentQuestion = 0;


    quizScore = 0;


    selectedAnswer = null;


    loadQuiz();



}



/* =========================================================
   AUTO LOAD QUIZ
   ========================================================= */


document.addEventListener(

"DOMContentLoaded",

()=>{


    loadQuiz();


});


