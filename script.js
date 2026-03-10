const URL = "https://teachablemachine.withgoogle.com/models/pFSaUVG0q/";

let model;

async function loadModel(){
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("Model Loaded");
}

loadModel();

async function detectWaste(){

const input = document.getElementById("imageUpload");

if(input.files.length === 0){
document.getElementById("result").innerHTML="Please upload image";
return;
}

const file = input.files[0];

const img = new Image();
img.src = window.URL.createObjectURL(file);

img.onload = async function(){

const prediction = await model.predict(img);

let highest = prediction[0];

for(let i=1;i<prediction.length;i++){
if(prediction[i].probability > highest.probability){
highest = prediction[i];
}
}

document.getElementById("result").innerHTML =
"Detected Waste: " + highest.className;

};

}

