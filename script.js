const display=document.getElementById("display");

let memory=0;

let history=JSON.parse(localStorage.getItem("history"))||[];

renderHistory();

function append(value){
display.value+=value;
}

function clearDisplay(){
display.value="";
}

function deleteLast(){
display.value=display.value.slice(0,-1);
}

function calculate(){

try{

let expression=display.value.replace(/%/g,"/100");

let result=eval(expression);

saveHistory(expression,result);

display.value=result;

}
catch{
display.value="Error";
}

}

function sqrt(){
display.value=Math.sqrt(eval(display.value));
}

function square(){
display.value=Math.pow(eval(display.value),2);
}

function cube(){
display.value=Math.pow(eval(display.value),3);
}

function saveHistory(exp,res){

history.unshift(`${exp} = ${res}`);

localStorage.setItem(
"history",
JSON.stringify(history)
);

renderHistory();
}

function renderHistory(){

const list=document.getElementById("historyList");

if(!list) return;

list.innerHTML="";

history.forEach(item=>{

let li=document.createElement("li");

li.textContent=item;

list.appendChild(li);

});

}

function clearHistory(){

history=[];

localStorage.removeItem("history");

renderHistory();

}

function memoryAdd(){
memory+=Number(display.value)||0;
}

function memorySub(){
memory-=Number(display.value)||0;
}

function memoryRecall(){
display.value=memory;
}

function memoryClear(){
memory=0;
}

document.getElementById("themeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("light");

});

document.addEventListener("keydown",(e)=>{

const key=e.key;

if("0123456789+-*/.".includes(key))
append(key);

if(key==="Enter")
calculate();

if(key==="Backspace")
deleteLast();

});

document.getElementById("voiceBtn")
.addEventListener("click",()=>{

const SpeechRecognition=
window.SpeechRecognition||
window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Voice not supported");
return;
}

const recognition=
new SpeechRecognition();

recognition.start();

recognition.onresult=(event)=>{

display.value=
event.results[0][0].transcript;

};

});

function calculateAge(){

let dob=
new Date(
document.getElementById("dob").value
);

let age=
new Date().getFullYear()-
dob.getFullYear();

document.getElementById("ageResult")
.innerText=`Age: ${age} Years`;

}

function calculateBMI(){

let w=
parseFloat(
document.getElementById("weight").value
);

let h=
parseFloat(
document.getElementById("height").value
)/100;

let bmi=w/(h*h);

document.getElementById("bmiResult")
.innerText=
`BMI: ${bmi.toFixed(2)}`;

}

function calculateEMI(){

let P=
parseFloat(
document.getElementById("loan").value
);

let annualRate=
parseFloat(
document.getElementById("rate").value
);

let years=
parseFloat(
document.getElementById("years").value
);

let r=annualRate/12/100;

let n=years*12;

let emi=
(P*r*Math.pow(1+r,n))/
(Math.pow(1+r,n)-1);

document.getElementById("emiResult")
.innerText=
`EMI: ₹${emi.toFixed(2)}`;

}

function downloadTXT(){

let blob=new Blob(
[history.join("\n")],
{text:"text/plain"}
);

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="history.txt";

a.click();

}

function downloadPDF(){

const { jsPDF } = window.jspdf;

const doc=new jsPDF();

doc.text(history.join("\n"),10,10);

doc.save("history.pdf");

}

if("serviceWorker" in navigator){

navigator.serviceWorker.register(
"service-worker.js"
);

}