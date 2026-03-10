function detectWaste(){

const input = document.getElementById("imageUpload");

console.log(input);
console.log(input.files);

if(input.files.length === 0){
document.getElementById("result").innerHTML="Please upload image";
return;
}

document.getElementById("result").innerHTML="Image detected";
}
