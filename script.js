const URL = "PASTE_YOUR_MODEL_LINK_HERE/";

let model;

async function loadModel(){

model = await tmImage.load(URL + "model.json", URL + "metadata.json");

}

loadModel();

let preview = document.getElementById("preview");

document.getElementById("imageUpload").addEventListener("change", function(event){

let file = event.target.files[0];

if(file){

preview.src = URL.createObjectURL(file);
preview.style.display="block";

}

});

async function detectWaste(){

if(!preview.src){

alert("Upload image first");
return;

}

const prediction = await model.predict(preview);

let highest = prediction[0];

for(let i=1;i<prediction.length;i++){

if(prediction[i].probability > highest.probability){

highest = prediction[i];

}

}

document.getElementById("result").innerText =
"Detected Waste: " + highest.className;

}
