window.onload=main;
var globalid;
function main() {

    var b1=document.getElementById("b1");
    var b2=document.getElementById("b2");
    var b3=document.getElementById("b3");
    var b4=document.getElementById("b4");
    var b5=document.getElementById("b5");
    b1.onclick=function (){
        if(globalid!="rain")
        {
            globalid = "rain";
            main_rain();
        }else {
            alert("this demo is running !");
        }
    };
    b2.onclick=function (){
        if(globalid!="star")
        {
            alert("this demo needs few seconds to load");
            globalid = "star";
            main_star();
        }else {
            alert("this demo is running !");
        }
    };
    b3.onclick=function (){
        if(globalid!="ray")
        {
            alert("click to speed up");
            globalid = "ray";
            main_ray();
        }else {
            alert("this demo is running !");
        }
    };
    b4.onclick=function (){
        if(globalid!="boom") {
            alert("click to boom");
            globalid = "boom";
            main_boom();
        }else {
            alert("this demo is running !");
        }
    };
    b5.onclick=function () {
        alert("This Demo Needs to open another window");
        globalid = "drawingBoard";
       window.open("canvas_blockdraw/index.html");
    };
}