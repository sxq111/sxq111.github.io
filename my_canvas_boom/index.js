
  function getRgb(r,g,b)
  {
    return "rgb("+ r+","+g+","+b+")";
  }

function main_boom()
{
    var id="boom";
  var dropList=[];
  var canvasEl = document.getElementById('canvas');
  var ctx = canvasEl.getContext('2d');
  var mousePos = [0, 0];
  var backgroundColor = '#000';
  var gravity=0.5;
 canvasEl.width=canvasEl.clientWidth;
 canvasEl.height=canvasEl.clientHeight;

 window.onresize=function () 
 {
    canvasEl.width=canvasEl.clientWidth;
    canvasEl.height=canvasEl.clientHeight;
 }
 
 window.onmousemove=function (e) {
   //鼠标移动事件
   mousePos[0]=e.clientX;
   mousePos[1]=e.clientY;
 }
 window.onmousedown=function (e) {
   //鼠标点击事件
   var maxi=3*Math.floor(Math.random()*10+10);
   for(var i=0;i<maxi;i++)
   {
    dropList.push(createDrop(e.clientX,e.clientY));
   }
 }
 function createDrop(x,y)
  {
    var mydrop={
      die:false,
      posx:x,
      posy:y,
      vx:(Math.random()-0.5)*8*2,
      vy:(Math.random()*(-6)-3)*2,
      radius:Math.random()*2+1,
      color:255
    };
   return mydrop;
  }
  
update();
  function update() 
  {     
      if(globalid!=id)
  {
      //alert("return ray");
      return;
  }
    
    if(dropList.length>0)
    {
       dropList.forEach(function (e) {
         e.posx=e.posx+e.vx;
         e.vy=e.vy+gravity;
         e.posy=e.posy+e.vy;
         //e.radius=e.radius+1;
         e.color=e.color-6;
         if(e.posy>canvasEl.clientHeight)
         {
           e.die=true;
         }
       });
    }
    for(var i=dropList.length-1;i>=0;i--)
    {
      if(dropList[i].die){
        dropList.splice(i,1);
      }
    }
    
    
     render();
     window.requestAnimationFrame(update);
  }
  function  render() 
  {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.lineWidth=2;
    
    dropList.forEach(function (e) {
      ctx.strokeStyle = getRgb(e.color,e.color,e.color);
           ctx.beginPath();
           ctx.arc(e.posx,e.posy,e.radius,Math.random()*2*Math.PI,2*Math.PI);
           ctx.stroke();
       });
    
   
  }
  
  
}


