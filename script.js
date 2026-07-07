let startbtn=document.querySelector("#startbtn");
let mainbox1=document.querySelector(".mainbox1");
let mainbox2=document.querySelector(".mainbox2");
let mainbox3=document.querySelector(".mainbox3");
let input=document.querySelector("#input");
const url="https://api.openweathermap.org/data/2.5/weather?";
const apikey="88a45c1013ba00c7f04cbedfa22561b9";
 
function getstart(){
startbtn.addEventListener("click",function(){
    mainbox1.classList.add("hide");
    mainbox2.classList.remove("hide");

});
}
  getstart()

  input.addEventListener("input",function(dets){
  console.log(dets.target.value)
  })