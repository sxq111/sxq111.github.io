var brush={
    color:"#888",
    size:1,
    setColor:setColor,
    setLineSize:setSize,
    setNormalBrush:setNormalBrush,
    setDotBrush:setDotBrush,
    setLineBrush:setLineBrush,
    setRectBrush:setRectBrush,
    setRoundBrush:setRoundBrush
};

function setSize(size)
{
    brush.size=size;
}
function setColor(col)
{
    brush.color=col;
}
function setNormalBrush(canvas){
    var context=canvas.getContext("2d");
    context.lineCap="round";
   // context.lineWidth=brush.size;
    canvas.onmousedown=function(e)
    {
         context.lineWidth=brush.size;
         context.beginPath();
         console.log(brush.color);
        context.moveTo(e.offsetX,e.offsetY);
        e.target.onmousemove=function(e2)
        {
            console.log("move");
            context.lineTo(e2.offsetX,e2.offsetY);
            context.stroke();
            context.moveTo(e2.offsetX,e2.offsetY);
        }
        console.log("down");
    }
    canvas.onmouseup=function(e){
        e.target.onmousemove=null;
    }
}
function setDotBrush(canvas){
    var context=canvas.getContext("2d");
    context.lineCap="round";
   // context.lineWidth=brush.size;
    canvas.onmousedown=function(e)
    {
        context.lineWidth=0.5;
        var radius=Math.round(Math.max(brush.size,10));
        e.target.onmousemove=function(e2)
        {
            for(let k=0;k<radius*radius/100;k++)
            {
                var x=Math.round(Math.random()*radius*2)-radius;
                var y=Math.round(Math.sqrt(radius*radius-x*x)*Math.random());
                if(Math.random()*100>50)
                {
                    y=-y;
                }
                context.beginPath();
                context.arc(e2.offsetX+x,e2.offsetY+y,0.1,0,2*Math.PI,true);
                context.stroke();
            }
        }
        console.log("down");
    }
    canvas.onmouseup=function(e){
        e.target.onmousemove=null;
    }
}
function setLineBrush(canvas)
{
    var context=canvas.getContext("2d");
    context.lineCap="round";
    canvas.onmousedown=function(e)
    {
        var tempimg=new Image();
        tempimg.src=canvas.toDataURL();
        var oldx=e.offsetX;
        var oldy=e.offsetY;
        context.lineCap="round";
        context.lineWidth=brush.size;
        canvas.onmousemove=function(e2)
        {
            context.drawImage(tempimg,0,0);
            context.beginPath();
            context.moveTo(oldx,oldy);
            context.lineTo(e2.offsetX,e2.offsetY);
            context.stroke();
        }
    }
    canvas.onmouseup=function(){
        canvas.onmousemove=null;
    }
}
function setRectBrush(canvas)
{
    var context=canvas.getContext("2d");
    context.lineCap="round";
    canvas.onmousedown=function(e)
    {
        var tempimg=new Image();
        tempimg.src=canvas.toDataURL();
        var oldx=e.offsetX;
        var oldy=e.offsetY;
        context.lineCap="round";
        context.lineWidth=brush.size;
        canvas.onmousemove=function(e2)
        {
            context.drawImage(tempimg,0,0);
            context.beginPath();
            context.strokeRect(oldx,oldy,e2.offsetX-oldx,e2.offsetY-oldy);
            context.stroke();
        }
    }
    canvas.onmouseup=function(){
        canvas.onmousemove=null;
    }
}
function setRoundBrush()
{
     var context=canvas.getContext("2d");
    context.lineCap="round";
    canvas.onmousedown=function(e)
    {
        var tempimg=new Image();
        tempimg.src=canvas.toDataURL();
        var oldx=e.offsetX;
        var oldy=e.offsetY;
        context.lineCap="round";
        context.lineWidth=brush.size;
        canvas.onmousemove=function(e2)
        {
            var midx=(e2.offsetX+oldx)/2;
            var midy=(e2.offsetY+oldy)/2;
            context.drawImage(tempimg,0,0);
            context.beginPath();
            var r=(e2.offsetX-oldx)*(e2.offsetX-oldx) +(e2.offsetY-oldy)*(e2.offsetY-oldy);
            r=Math.sqrt(r)/2;
            context.arc(midx,midy,r,0,2*Math.PI,true);
            //  context.fill();
             context.stroke();
        }
    }
    canvas.onmouseup=function(){
        canvas.onmousemove=null;
    }
}