var brush={
    color:"#888",
    size:1,
    setColor:setColor,
    setLineSize:setSize,
    setNormalBrush:setNormalBrush,
    setDotBrush:setDotBrush
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
        context.strokeStyle="#000";
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
                context.arc(e2.offsetX+x,e2.offsetY+y,0.5,0,2*Math.PI);
                context.stroke();
            }
        }
        console.log("down");
    }
    canvas.onmouseup=function(e){
        e.target.onmousemove=null;
    }
}