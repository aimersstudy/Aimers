let timer = document.getElementById("timer");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let xpText = document.getElementById("xp");
let levelText = document.getElementById("level");
let goalText = document.getElementById("goal");
let streakText = document.getElementById("streak");

let historyTable = document.getElementById("historyTable");
let subject = document.getElementById("subject");

let seconds = 0;
let interval = null;

let xp = Number(localStorage.getItem("xp")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;

xpText.innerHTML = xp + " XP";
streakText.innerHTML = streak + " Days";

updateLevel();

function updateTimer(){

seconds++;

let h = String(Math.floor(seconds/3600)).padStart(2,"0");
let m = String(Math.floor((seconds%3600)/60)).padStart(2,"0");
let s = String(seconds%60).padStart(2,"0");

timer.innerHTML = h+":"+m+":"+s;

goalText.innerHTML=(seconds/3600).toFixed(2)+" / 8 Hours";

}

startBtn.onclick=function(){

if(interval==null){

interval=setInterval(updateTimer,1000);

}

}

pauseBtn.onclick=function(){

clearInterval(interval);

interval=null;

}

resetBtn.onclick=function(){

clearInterval(interval);

interval=null;

seconds=0;

timer.innerHTML="00:00:00";

goalText.innerHTML="0 / 8 Hours";

}

stopBtn.onclick=function(){

clearInterval(interval);

interval=null;

let hours=(seconds/3600);

let earned=Math.floor(hours*100);

xp+=earned;

localStorage.setItem("xp",xp);

xpText.innerHTML=xp+" XP";

updateLevel();

saveSession();

alert("Great Job!\nYou earned "+earned+" XP 🚀");

seconds=0;

timer.innerHTML="00:00:00";

goalText.innerHTML="0 / 8 Hours";

}

function updateLevel(){

if(xp<500){

levelText.innerHTML="Beginner";

}

else if(xp<1500){

levelText.innerHTML="Learner";

}

else if(xp<3000){

levelText.innerHTML="Warrior";

}

else if(xp<6000){

levelText.innerHTML="Topper";

}

else{

levelText.innerHTML="Legend";

}

}



const quotes=[

"Discipline beats motivation.",

"Come on Buddy, Let's Study!",

"Every hour counts.",

"JEE won't crack itself.",

"Stay consistent.",

"Dream. Study. Achieve.",

"Future IITian Loading..."

];

setInterval(function(){

document.getElementById("quote").innerHTML=quotes[Math.floor(Math.random()*quotes.length)];

},5000);
// ---------- AIMERS SAVE SYSTEM ----------

let sessions = JSON.parse(localStorage.getItem("aimersSessions")) || [];

function saveSession(){

let today = new Date();

let data = {

date: today.toLocaleDateString(),

subject: subject.value,

time: timer.innerHTML,

xp: Math.floor((seconds/3600)*100)

};

sessions.push(data);

localStorage.setItem("aimersSessions",JSON.stringify(sessions));

loadSessions();

}

function loadSessions(){

historyTable.innerHTML="";

sessions.forEach(item=>{

let row=historyTable.insertRow();

row.insertCell(0).innerHTML=item.date;

row.insertCell(1).innerHTML=item.subject;

row.insertCell(2).innerHTML=item.time;

row.insertCell(3).innerHTML=item.xp;

});

}

loadSessions();
// ---------- AIMERS ACHIEVEMENTS ----------

let achievements = [
"🥉 First Study Session",
"🥈 10 Hours Completed",
"🥇 50 Hours Completed",
"👑 100 Hours Completed"
];

function checkAchievements(){

if(xp>=100){
console.log(achievements[0]);
}

if(xp>=1000){
console.log(achievements[1]);
}

if(xp>=5000){
console.log(achievements[2]);
}

if(xp>=10000){
console.log(achievements[3]);
}

}

checkAchievements();
function updateProgress(){

let percent=Math.min((seconds/28800)*100,100);

let bar=document.getElementById("progressBar");

let text=document.getElementById("goalPercent");

if(bar&&text){
bar.style.width=percent+"%";
text.innerHTML=Math.floor(percent)+"% Completed";
}

}

setInterval(updateProgress,1000);
// ---------- DAILY TASKS ----------

let taskList=document.getElementById("taskList");

function addTask(){

let input=document.getElementById("taskInput");

if(input.value=="") return;

let li=document.createElement("li");

li.innerHTML=input.value;

li.onclick=function(){

li.classList.toggle("done");

saveTasks();

}

taskList.appendChild(li);

input.value="";

saveTasks();

}

function saveTasks(){

localStorage.setItem("tasks",taskList.innerHTML);

}

function loadTasks(){

taskList.innerHTML=localStorage.getItem("tasks")||"";

Array.from(taskList.children).forEach(li=>{

li.onclick=function(){

li.classList.toggle("done");

saveTasks();

}

});

}

loadTasks();
// ---------- DAILY NOTES ----------

let notes=document.getElementById("notes");

if(notes){
notes.value=localStorage.getItem("aimersNotes") || "";
}

function saveNotes(){

localStorage.setItem(
"aimersNotes",
notes.value
);

document.getElementById("noteStatus").innerHTML=
"✅ Notes Saved";

setTimeout(()=>{

document.getElementById("noteStatus").innerHTML="";

},2000);

}
// ---------- STUDY ANALYTICS ----------


function updateAnalytics(){

let totalSeconds=seconds;

let hours=(totalSeconds/3600).toFixed(2);


let total=document.getElementById("totalHours");

let xpBox=document.getElementById("totalXP");


if(total){

total.innerHTML=hours+" Hours";

}


if(xpBox){

xpBox.innerHTML=xp+" XP";

}


let subjects={};


sessions.forEach(item=>{

if(subjects[item.subject]){

subjects[item.subject]++;

}

else{

subjects[item.subject]=1;

}

});


let best="-";

let max=0;


for(let s in subjects){

if(subjects[s]>max){

max=subjects[s];

best=s;

}

}


let bestBox=document.getElementById("bestSubject");

if(bestBox){

bestBox.innerHTML=best;

}


createChart(subjects);

}



function createChart(data){


let canvas=document.getElementById("studyChart");


if(!canvas) return;


new Chart(canvas,{

type:"bar",

data:{

labels:Object.keys(data),

datasets:[{

label:"Study Sessions",

data:Object.values(data)

}]

},

options:{

responsive:true

}

});


}


setTimeout(updateAnalytics,1000);
// ---------- FOCUS MODE ----------

let focusInterval;

function startFocus(){

let minutes=document.getElementById("focusTime").value;

if(!minutes) return;


let time=minutes*60;


document.getElementById("focusMessage").innerHTML=
"🔥 Focus mode activated. You can do it!";


clearInterval(focusInterval);


focusInterval=setInterval(()=>{


let min=Math.floor(time/60);

let sec=time%60;


document.getElementById("focusTimer").innerHTML=

String(min).padStart(2,"0")+":"+
String(sec).padStart(2,"0");


time--;


if(time<0){

clearInterval(focusInterval);

document.getElementById("focusMessage").innerHTML=
"🎉 Session Complete! Great work!";

}

},1000);

}
// ---------- PROFILE & THEME ----------


function saveProfile(){

let name=document.getElementById("studentName").value;

localStorage.setItem("aimersName",name);

document.getElementById("displayName").innerHTML=
"Welcome "+name+" 🚀";

}



function loadProfile(){

let name=localStorage.getItem("aimersName");

if(name){

document.getElementById("displayName").innerHTML=
"Welcome "+name+" 🚀";

}

}


function toggleTheme(){

document.body.classList.toggle("light");

localStorage.setItem(
"theme",
document.body.classList.contains("light")
);

}


function loadTheme(){

if(localStorage.getItem("theme")=="true"){

document.body.classList.add("light");

}

}


loadProfile();

loadTheme();