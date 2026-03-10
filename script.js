let preview = document.getElementById("preview");

document.getElementById("imageUpload").addEventListener("change",function(e){

let file = e.target.files[0];

if(file){

preview.src = URL.createObjectURL(file);
preview.style.display="block";

}

});


function detectWaste(){

document.getElementById("result").innerText="Detecting...";

}
