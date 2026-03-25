const player = localStorage.getItem("playerName");

if(player){
document.getElementById("playerName").innerHTML = player;
}
let score = 0;
let detectedAlready = false;

const facts = [
"Plastic can take up to 400 years to decompose.",
"Recycling one aluminum can saves energy for 3 hours of TV.",
"Paper recycling helps reduce deforestation.",
"Glass can be recycled infinitely without losing quality."
];

document.getElementById("imageUpload").addEventListener("change", function(e){

const file = e.target.files[0];

detectedAlready = false;
document.getElementById("result").innerHTML = "";

// image preview
if(file){
document.getElementById("preview").src = URL.createObjectURL(file);
document.getElementById("preview").style.border = "4px solid #22c55e";
}

});

function detectWaste(){

const input = document.getElementById("imageUpload");

if(input.files.length === 0){
document.getElementById("result").innerHTML="Please upload an image";
return;
}

if(detectedAlready){
document.getElementById("result").innerHTML="Upload a new image to score again";
return;
}

const fileName = input.files[0].name.toLowerCase();

let detected = "";

if(fileName.includes("plastic")){
detected = "Plastic → Blue Recycling Bin";
}

else if(fileName.includes("banana") || fileName.includes("food")){
detected = "Organic → Green Bin";
}

else if(fileName.includes("paper")){
detected = "Paper → White Bin";
}

else{
detected = "Metal → Yellow Bin";
}

score += 10;

document.getElementById("score").innerHTML = score;

// random fact
let fact = facts[Math.floor(Math.random()*facts.length)];

document.getElementById("result").innerHTML =
"Detected Waste: " + detected +
"<br>♻ Tip: Clean recyclable items before disposal." +
"<br>🌍 Fact: " + fact;

// champion message
if(score >= 50){
document.getElementById("result").innerHTML +=
"<br>🏆 Recycling Champion! Keep helping the planet.";
}

detectedAlready = true;

}

function resetGame(){

score = 0;
detectedAlready = false;

document.getElementById("score").innerHTML = score;
document.getElementById("result").innerHTML = "";
  updateLeaderboard();

}
function updateLeaderboard(){

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

const player = localStorage.getItem("playerName");

leaderboard.push({
name: player,
score: score
});

leaderboard.sort((a,b)=>b.score-a.score);

leaderboard = leaderboard.slice(0,5);

localStorage.setItem("leaderboard", JSON.stringify(leaderboard));


}

function displayLeaderboard(){

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

const list = document.getElementById("leaderboard");

if(!list) return;

list.innerHTML="";

leaderboard.forEach(player=>{

const li=document.createElement("li");

li.innerHTML=player.name+" — "+player.score;

list.appendChild(li);

});

}
let fillLevel = 0;

function updateBin() {
  fillLevel += Math.floor(Math.random() * 20);

  if (fillLevel >= 100) {
    document.getElementById("bin").innerText = "🚨 Bin Full!";
  } else {
    document.getElementById("bin").innerText = "Bin Level: " + fillLevel + "%";
  }
}

function showWasteInfo(type) {
  if (type === "plastic") {
    document.getElementById("alert").innerText = "⚠️ Put in Plastic Bin";
    document.getElementById("recycle").innerText = "Reuse as bottle planter";
  } else if (type === "organic") {
    document.getElementById("alert").innerText = "✅ Correct Bin";
    document.getElementById("recycle").innerText = "Convert to compost";
  } else {
    document.getElementById("alert").innerText = "⚠️ Check Metal Waste";
    document.getElementById("recycle").innerText = "Recycle at scrap center";
  }
}
