var sxqui={
    createTouchBar:createTouchBar
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

