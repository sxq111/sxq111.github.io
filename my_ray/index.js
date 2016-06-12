
  function getRgb(r,g,b)
  {
    return "rgb("+ r+","+g+","+b+")";
  }

function main_ray()
{
 
 var id="ray";
  var starlist=[];

  var canvasEl = document.getElementById('canvas');
  var ctx = canvasEl.getContext('2d');
  var mousePos = [0, 0];
  var backgroundColor = '#000';
  var gravity=0.5;
 canvasEl.width=canvasEl.clientWidth;
 canvasEl.height=canvasEl.clientHeight;
 var Z_max=(canvasEl.width+canvasEl.height)/2;
 var centerX=canvasEl.width/2;
 var centerY=canvasEl.height/2;
 var dist=Z_max;
 var movx;
 var movy;
 var drawmode=true;
 var speed=13;
function addstar()
{
   star={
     globalX:Math.random()*2*canvasEl.width-canvasEl.width,
     globalY:Math.random()*2*canvasEl.height-canvasEl.height,
     globalZ:Z_max,
     posx:undefined,
     posy:undefined,
     posxpre:undefined,
     posypre:undefined,
     die:false
   };
   starlist.push(star);
}

 window.onresize=function () 
 {
    canvasEl.width=canvasEl.clientWidth;
    canvasEl.height=canvasEl.clientHeight;
    centerX=canvasEl.width/2;
    centerY=canvasEl.height/2;
    Z_max=(canvasEl.width+canvasEl.height)/2;
    starlist=[];


 }
 
 window.onmousemove=function (e) {
   //鼠标移动事件
   mousePos[0]=e.clientX;
   mousePos[1]=e.clientY;
   movx=e.clientX-centerX;
   movy=e.clientY-centerY;
 }
 window.onmousedown=function (e) {
   //鼠标点击事件
   drawmode=false;
   speed=26;
 }
 window.onmouseup=function(e)
 {
   drawmode=true;
   speed=13;
 }

  
 update();
  function update() 
  {
      if(globalid!=id)
  {
      //alert("return ray");
      return;
  }

    for(var i=0;i<15;i++)
    {
        addstar();
    }
    starlist.forEach(function(e){
      e.globalZ-=speed;
      e.posxpre=e.posx;
      e.posypre=e.posy;
      e.posx=centerX+(e.globalX/e.globalZ)*Z_max/1.5;  
      e.posy=centerY+(e.globalY/e.globalZ)*Z_max/1.5;  
      e.globalX+=movx/30;
      e.globalY+=movy/30;
      //alert(e.posx+"--"+e.posy);
      if(e.globalZ<0)
      {
        e.die=true;
      }
    });
    for(var i=starlist.length-1;i>=0;i--)
    {
      if(starlist[i].die)
      {
        starlist.splice(i,1);
        //alert("d");
      }
    }
     render();
     window.requestAnimationFrame(update);
  }
  function  render() 
  {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    starlist.forEach(function(e){
      if(drawmode){
        ctx.beginPath();
        var radius=6*(Z_max-e.globalZ)/Z_max  ;
        ctx.fillStyle="#FFF";
        ctx.arc(e.posx,e.posy,radius,0,2*Math.PI);
        ctx.fill();
      }else
      {
        ctx.beginPath();
        var lwidth=6*(Z_max-e.globalZ)/Z_max  ;
        ctx.lineWidth=lwidth;
        ctx.strokeStyle="#FFF";
        if(e.posxpre && e.posy){
        ctx.moveTo(e.posxpre,e.posypre);
        ctx.lineTo(e.posx,e.posy);
        }
        ctx.stroke();
      }


    });
  
  }
  
  
}


