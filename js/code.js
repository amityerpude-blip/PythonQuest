/*====================================================
        Python Quest Coding Lab
        Version 1.0
====================================================*/

let pyodide = null;
let pyodideReady = false;

const editor = document.getElementById("editor");
const output = document.getElementById("output");

const defaultCode =
`print("Welcome to Python Quest!")

name = "Dino"

print("Hello", name)
`;

/*=========================================
    Initialize Pyodide
=========================================*/

async function loadPython(){

    output.textContent = "⏳ Loading Python Engine...\nPlease wait.";

    pyodide = await loadPyodide();

    pyodideReady = true;

    output.textContent =
        "✅ Python Engine Loaded Successfully!\n\nClick Run Code.";

}

loadPython();

/*=========================================
    Run Python Code
=========================================*/

async function runCode(){

    if(!pyodideReady){

        output.textContent =
        "Python Engine is still loading...";

        return;

    }

    const code = editor.value;

    let consoleOutput = "";

    pyodide.setStdout({

        batched:(text)=>{

            consoleOutput += text + "\n";

        }

    });

    try{

        await pyodide.runPythonAsync(code);

        output.textContent = consoleOutput;

        rewardPlayer();

        localStorage.setItem(
            "pythonQuestLastCode",
            code
        );

    }

    catch(error){

        output.textContent =
        "❌ Python Error\n\n" + error;

    }

}

/*=========================================
    Reset Code
=========================================*/

function resetCode(){

    editor.value = defaultCode;

    output.textContent = "Editor Reset.";

}

/*=========================================
    Clear Code
=========================================*/

function clearCode(){

    editor.value = "";

    output.textContent = "";

}

/*=========================================
    Reward Player
=========================================*/

function rewardPlayer(){

    if(typeof addXP==="function"){

        addXP(50);

    }

    if(typeof addCoins==="function"){

        addCoins(20);

    }

}

/*=========================================
    Load Previous Code
=========================================*/

function loadSavedCode(){

    const saved = localStorage.getItem(
        "pythonQuestLastCode"
    );

    if(saved){

        editor.value = saved;

    }

    else{

        editor.value = defaultCode;

    }

}

/*=========================================
    Button Events
=========================================*/

document
.getElementById("runBtn")
.addEventListener("click",runCode);

document
.getElementById("resetBtn")
.addEventListener("click",resetCode);

document
.getElementById("clearBtn")
.addEventListener("click",clearCode);

/*=========================================
    Keyboard Shortcut
=========================================*/

editor.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key==="Enter"){

        e.preventDefault();

        runCode();

    }

});

/*=========================================
    Start
=========================================*/

loadSavedCode();
