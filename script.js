async function detectWaste(){

const input = document.getElementById("imageUpload");
const file = input.files.length > 0 ? input.files[0] : null;

if(!file){
document.getElementById("result").innerHTML="Please upload an image";
return;
}

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
