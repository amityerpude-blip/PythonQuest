const quizQuestions = [

{
type:"mcq",
question:"Which function is used to open a file in Python?",
options:["read()","open()","write()","file()"],
answer:1
},

{
type:"mcq",
question:"Which mode creates a new text file for writing?",
options:["r","w","a","x"],
answer:1
},

{
type:"mcq",
question:"Which function reads the complete file?",
options:["read()","readline()","write()","append()"],
answer:0
},

{
type:"mcq",
question:"Which mode appends data to the end of a file?",
options:["r","w","a","x"],
answer:2
},

{
type:"tf",
question:"The 'r' mode creates a new file.",
answer:false
},

{
type:"tf",
question:"Always close a file after using it.",
answer:true
},

{
type:"arrange",
question:"Arrange the statements to write 'Hello' into demo.txt",

correct:[
'file=open("demo.txt","w")',
'file.write("Hello")',
'file.close()'
]
},

{
type:"arrange",
question:"Arrange the statements to read a file.",

correct:[
'file=open("demo.txt","r")',
'print(file.read())',
'file.close()'
]
},

{
type:"output",
question:`What will be the output?

file=open("demo.txt","w")
file.write("Python")
file.close()

file=open("demo.txt","r")
print(file.read())
`,
answer:"Python"
},

{
type:"output",
question:`What mode is used below?

open("student.txt","a")
`,
answer:"a"
}

];
