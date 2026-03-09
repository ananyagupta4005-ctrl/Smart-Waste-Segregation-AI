const URL = "https://teachablemachine.withgoogle.com/models/pFSaUVG0q/";

let model;

async function loadModel() {
model = await tmImage.load(URL + "model.json", URL + "metadata.json");
}

loadModel();

async function detectWaste(){

const imageUpload = document.getElementById("imageUpload").files[0];

const img = document.createElement("img");
img.src = window.URL.createObjectURL(imageUpload);

const prediction = await model.predict(img);

let highest = prediction[0];

for(let i=1;i<prediction.length;i++){
if(prediction[i].probability > highest.probability){
highest = prediction[i];
}
}

document.getElementById("result").innerHTML =
"Detected Waste: " + highest.className;

}
