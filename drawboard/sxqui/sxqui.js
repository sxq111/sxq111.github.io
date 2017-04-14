var sxqui={
    createTouchBar:createTouchBar,
    createColorPickerCanvas:createColorPickerCanvas
}
function createColorPickerCanvas(canvas)
{
    
    var picker={r:null,g:null,b:null};
    var maxX;


    // picker.getColor=function()
    // {
    //     if(!selectR)    
    //         return null;
    //     return "rgb("+selectR+","+selectG+","+selectB+")";
    // }

    picker.colorSelectCallback=function(){};

    picker.setColors=function(length)
    {
        length=Math.max(3,length);
        length=Math.min(length,8);
        var context=canvas.getContext("2d");
        //var maxcount=length*length;
        //var step=Math.round(16*16*16/maxcount);
        //console.log(step);
        var blocksize=20;
        if(length<=4)
            blocksize=25;
        if(length<=3)
            blocksize=40;
        var numbs= Math.floor(Math.sqrt(length*length*length));
        maxX=numbs;
        canvas.width=blocksize*numbs;
        canvas.height=blocksize*numbs;
        canvas.style.width=canvas.width+"px";
        canvas.style.height=canvas.height+"px";
        var x=0;
        var y=0;
        //var tempstep=step;
        for(var r=0;r<length;r++)
        {
            for(var g=0;g<length;g++)
            {
                for(var b=0;b<length;b++)
                {
                    if(y>=numbs)
                        break;
                    var temp=Math.floor(255/(length-1));
                    context.fillStyle="rgb("+r*temp+","+g*temp+","+b*temp+")";
                    context.fillRect(x*blocksize,y*blocksize,blocksize,blocksize);
                    context.strokeStyle="#000";
                    context.lineWidth=2;
                    context.strokeRect(x*blocksize,y*blocksize,blocksize,blocksize);
                    x++;
                    if(x>=numbs)
                     {
                          x=0;
                          y++;
                      }
                            
                    }
                }
            }
        canvas.onmouseout=function(){
            context.strokeStyle="#000";
            context.lineWidth=2;
            for(let x=0;x<numbs;x++)
            {
                for(let y=0;y<numbs;y++)
                {
                    context.strokeRect(x*blocksize,y*blocksize,blocksize,blocksize);
                }
            }
        }
        canvas.onmousemove=function(e)
        {
            context.strokeStyle="#000";
            context.lineWidth=2;
            for(let x=0;x<numbs;x++)
            {
                for(let y=0;y<numbs;y++)
                {
                    context.strokeRect(x*blocksize,y*blocksize,blocksize,blocksize);
                }
            }
                if(e.offsetX>0&&e.offsetX<canvas.width&&e.offsetY>0&&e.offsetY<canvas.height)
            {
                context.strokeStyle="#FFF";
                context.strokeRect(Math.floor(e.offsetX/blocksize)*blocksize,Math.floor(e.offsetY/blocksize)*blocksize,blocksize,blocksize);
            }
        }
        canvas.onclick=function(e)
        {
            var x=Math.floor(e.offsetX/blocksize);
            var y=Math.floor(e.offsetY/blocksize);
            var pixels=context.getImageData(x*blocksize+5,y*blocksize+5,1,1);
            console.log(pixels.data);
            picker.r=pixels.data[0];
            picker.g=pixels.data[1];
            picker.b=pixels.data[2];
            picker.colorSelectCallback();
        }             
    }

    return picker;
}
function createTouchBar(baseline,bar)// 好好看看红书的继承知识（各种继承）
{
    //var sxqtools=undefined;
    var touchbar={};
    touchbar.baseline=baseline;
    touchbar.bar=bar;
    touchbar.radius=0.5;
    touchbar.baseline.style.position="relative";
    touchbar.bar.style.position="absolute";
    var barChangeCallback=function(){};
    //console.log("create bar "+ touchbar.radius);
    var basestyle=
    getComputedStyle(touchbar.baseline,null);
    var barstyle=
    getComputedStyle(touchbar.bar,null);
    var baselinewidth=Number.parseInt( basestyle.width);
    var barwidth=Number.parseInt(barstyle.width);
   // console.log(baselinewidth+"   "+barwidth);
    var currentwidth=baselinewidth-barwidth;
    touchbar.bar.style.left=Math.round(touchbar.radius*currentwidth)+"px";
    touchbar.bar.onmousedown=function(e1)
    {
        var x_start=e1.offsetX;
       touchbar.bar.onmousemove=function(e2){
           // console.log( "radius "+touchbar.radius);
            var x=e2.offsetX-x_start;
            touchbar.bar.style.left=touchbar.bar.offsetLeft+x+"px"
            touchbar.bar.offsetLeft<0? touchbar.bar.style.left="0px":null;
            touchbar.bar.offsetLeft>currentwidth? touchbar.bar.style.left= ""+currentwidth+"px":null;
            touchbar.radius=touchbar.bar.offsetLeft/currentwidth;
            barChangeCallback();
        //sxqtools.setColor(pickerr,pickerg,pickerb,radius);
      //  console.log(touchbar.offsetLeft/190);
        }
    }
    touchbar.bar.onmouseout=function () {
         touchbar.bar.onmousemove=null;
    }
    touchbar.bar.onmouseup=function () {
         touchbar.bar.onmousemove=null;
    }
    touchbar.setBarPosition=function(radius)
    {
        if(radius>1||radius<0)
            return;
        touchbar.radius=radius;
        touchbar.bar.style.left=Math.round(touchbar.radius*currentwidth)+"px";
    }
    touchbar.setBarChangeCallback=function(callback){
        barChangeCallback=callback;
    }
    return touchbar;
}

