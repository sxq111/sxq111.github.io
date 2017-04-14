//alert("sxq");
window.onload=main;

var sxqtools={
    nodeListToArray:function(nodes)
    {
        var arr=[];
        for(var i=0;i<nodes.length;i++)
        {
            arr.push(nodes[i]);
        }
        return arr;
    },
    currentColor:null,//当前选择的取色块
    toRGB:function(r,g,b){
        return "rgb("+r+","+g+","+b+")";
    },
    setColor:function(r,g,b,radius){
        radius=Math.round(radius*100);
        radius=radius/100;
        if(radius>=0&&radius<=0.5){
            console.log("in 1");
            sxqtools.currentColor.style.backgroundColor=sxqtools.toRGB(Math.round(r*radius/0.5),
            Math.round(g*radius/0.5),
            Math.round(b*radius/0.5));
        }
        if(radius>0.5&&radius<=1){
            console.log("in 12");
            sxqtools.currentColor.style.backgroundColor=sxqtools.toRGB(Math.round(r+(255-r)*(radius-0.5)/0.5),
           Math.round(g+(255-g)*(radius-0.5)/0.5),
           Math.round(b+(255-b)*(radius-0.5)/0.5));
        }
        console.log(radius);
    //console.log(selectedtarget.style.backgroundColor);
    },
    currentContext:null

};

function main()
{
    // var temp={name:"temp",
    //     fun:function(){
    //         console.log(this);
    //     }    
    // };
    // temp.fun();
    // setTimeout(temp.fun,1000);
    // function foo(){
    //     var i=111;
    //     return {val:i,
    //             see: function(){
    //                 console.log(i);
    //             }
    //             };
    // }
    // var temp=foo();
    // temp.val=222; 单纯的对象不能形成闭包，原因是对象的属性是值传递，只有函数才形成闭包
    // temp.see();
    // console.log(temp.val);
    // for(var i=0;i<5;i++)
    // {
    //     setTimeout((function(temp){
    //         return function(){
    //             console.log(temp);
    //         };
    //     })(i),1000*i);
    // }闭包和循环测试
   // console.log(sxqtools.indexOf);
//    for(let i=0;i<5;i++)
//    {
//        setTimeout(function () {
//            console.log(i);
//        },1000*i);
//    }
    
   console.log(sxqtools.hasOwnProperty("toRGB"));
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");

    sxqtools.currentContext=context;
    sxqtools.currentContext.lineWidth=2;
    sxqtools.currentContext.lineCap="round";



//-------------------tool buttons ------------------
    var btn1=document.getElementById("btn1");
    btn1.onclick=function(){
        context.fillStyle="#fff"
        context.fillRect(0,0,canvas.width,canvas.height);
        context.strokeStyle="#000"
        context.lineCap="round";
        context.lineWidth=10;
        pathlist.forEach(function(e){
            context.stroke(e);
        });
    };
    var btn2=document.getElementById("btn2");
    var image=new Image();
    btn2.onclick=function(){
        context.fillStyle="rgba(128,128,128,0.1)"
        context.fillRect(0,0,canvas.width,canvas.height);
        context.fillStyle="rgb(0,0,0)";
        context.fillRect(0,0,canvas.width/2,canvas.height/2);
        image.src=canvas.toDataURL();
        //console.log();
    };

    var btn3=document.getElementById("btn3");
    var imgdata;
    btn3.onclick=function()
    {
        imgdata= context.getImageData(0,0,canvas.width,canvas.height);
    }

    var btn4=document.getElementById("btn4");
    btn4.onclick=function()
    {
        //context.putImageData(imgdata,0,0);
        context.drawImage(image,0,0);
    }
    //-------colors  drag----------
    var colors=document.getElementById("colors");
    colors.onmousedown=function(e){
        console.log("c:"+colors.clientLeft);// 等于左边框宽度
        console.log("o:"+colors.offsetLeft);//等于距离包含框的距离
        console.log("s:"+colors.scrollLeft);
        //console.log("l:"+colors.left);
        var extraX=e.clientX-colors.offsetLeft//
        var extraY=e.clientY-colors.offsetTop//用offset属性读，用style.top设置是最优的
        if(e.target==colors){
            colors.onmousemove=function(e2){
                colors.style.top=e2.clientY-extraY+"px";
                colors.style.left=e2.clientX-extraX+"px";
                if(colors.offsetLeft<0)
                {
                    colors.style.left=0+"px";
                    //return;
                }
                if(colors.offsetTop<0)
                {
                    colors.style.top=0+"px";
                    //return;
                }
                if(colors.offsetLeft>document.body.clientWidth-colors.offsetWidth)
                {
                    colors.style.left=document.body.clientWidth-colors.offsetWidth+"px";
                }
                if(colors.offsetTop>document.body.clientHeight-colors.offsetHeight)
                {
                    colors.style.top=document.body.clientHeight-colors.offsetHeight+"px";
                }
                
                //console.log("now x:"+colors.style.left);
            }
        }
    }
    colors.onmouseup=function(){
        colors.onmousemove=null;
    }
//----------------colorpickers--------------
//to do 尝试使用事件委托
var pickercanvas=document.getElementById("pickercanvas");
var mypickercanvas=sxqui.createColorPickerCanvas(pickercanvas);
mypickercanvas.setColors(4);

var  origionColor;
var selectedtarget;
//var radius=0.5;
var pickerr=128,pickerg=128,pickerb=128;
mypickercanvas.colorSelectCallback=function(){
    pickerr=mypickercanvas.r;
    pickerg=mypickercanvas.g;
    pickerb=mypickercanvas.b;
    sxqtools.setColor(mypickercanvas.r,mypickercanvas.g,mypickercanvas.b,mybar.radius);
}

var buttoncancle=document.getElementById("colorCancle");
var buttonok=document.getElementById("colorOk");

buttoncancle.onclick=function(){
    var colorboard=document.getElementById("pickerdiv");
    colorboard.style.display="none";
    selectedtarget.style.backgroundColor=origionColor;
}
buttonok.onclick=function(){
    var colorboard=document.getElementById("pickerdiv");
    colorboard.style.display="none";
}
var colorpickers=colors.getElementsByClassName('colorpicker');

colors.ondblclick=function(e)
{
    //事件委托

    var eventtarget=e.target;
    switch(eventtarget)
    {
        case e.currentTarget:
            console.log("board");
            break;
        default:
            if(selectedtarget){
                selectedtarget.style.borderColor="#000";
            }
            //radius=0.5;
            //touchbar.style.left=Math.round(radius*190)+"px";
            mybar.setBarPosition(0.5);
            selectedtarget=eventtarget;
            eventtarget.style.borderColor="#ff0";
            var colorboard=document.getElementById("pickerdiv");
            colorboard.style.display="block";
            //console.log(getComputedStyle(eventtarget,null).backgroundColor);
            var reg=/^rgb\(([\d\s]+)\,([\d\s]+)\,([\d\s]+)\)$/;//从字符串中取3原色值的正则
            {
                let arr= reg.exec(getComputedStyle(eventtarget,null).backgroundColor);
                pickerr=Number.parseInt(arr[1]);
                pickerg=Number.parseInt(arr[2]);
                pickerb=Number.parseInt(arr[3]);
            }
           // console.log(reg.exec(getComputedStyle(eventtarget,null).backgroundColor));
            origionColor=getComputedStyle(eventtarget,null).backgroundColor;
            //console.log("origionColor: "+origionColor);
            //console.log("picker");
            break;
    }
}

colors.onclick=function(e)
{
    //事件委托

    var eventtarget=e.target;
    switch(eventtarget)
    {
        case e.currentTarget:
            //console.log("board");
            break;
        default:
             if(selectedtarget){
                selectedtarget.style.borderColor="#000";
            }
            selectedtarget=eventtarget;
            sxqtools.currentColor=selectedtarget;
            //console.log("currentColor:"+sxqtools.currentColor.style.backgroundColor);
            eventtarget.style.borderColor="#ff0";
            var colorboard=document.getElementById("pickerdiv");
            break;
    }
}
//----------------picker touchbar---------------
 var touch_base=document.getElementById("touchbar_container");
 var touchbar=document.getElementById("touchbar_bar");
 var mybar=sxqui.createTouchBar(touch_base,touchbar);
 mybar.setBarChangeCallback(function(){
     sxqtools.setColor(pickerr,pickerg,pickerb,mybar.radius);
     console.log(this);
 });

//-----------------brush size---------------
 var brushsize_base=document.getElementById("brushsize_baseline");
 var brushsizebar=document.getElementById("burshsize_bar");
 var brushsizealert=document.getElementById("brushsize_alert");
 var brushsize=sxqui.createTouchBar(brushsize_base,brushsizebar);
 brushsize.setBarPosition(0);
 brushsize.setBarChangeCallback(function(){
     brushsizealert.style.width=Math.round(brushsize.radius*60)+2+"px";
     brushsizealert.style.height=brushsizealert.style.width;
     sxqtools.currentContext.lineWidth=Number.parseInt(brushsizealert.style.height);
     brushsizealert.style.marginLeft=9 -Math.round(Number.parseInt(brushsizealert.style.width)/2)+"px";
     //brushsizealert.style.borderRadius
     console.log(brushsizealert.style.width);
 });
brushsizebar.addEventListener("mouseover",function(){
    brushsizealert.style.display="block";
},false);
brushsizebar.addEventListener("mouseout",function(){
    brushsizealert.style.display="none";
},false);



//-------------draw methods--------------
    var currentpath=new Path2D();
    var pathlist=[];
    var path=new Path2D();
    canvas.onmousedown=function(e)
    {
        if(sxqtools.currentColor &&sxqtools.currentColor.style.backgroundColor)
        {
            context.strokeStyle=sxqtools.currentColor.style.backgroundColor;
        }else{
            context.strokeStyle="#888";
        }
        
        //context.lineWidth=3;
        currentpath.moveTo(e.offsetX,e.offsetY);
        path.moveTo(e.offsetX,e.offsetY);
        e.target.onmousemove=function(e2)
        {
            //context.fillStyle="#000";
             //context.lineCap="round";//---很重要，如果是默认值会导致意想不到结果---
             currentpath.lineTo(e2.offsetX,e2.offsetY);
             //currentpath.arc(e2.offsetX,e2.offsetY,1,0,2*Math.PI,false);
             context.stroke(currentpath);
             //context.fill(currentpath);
             path.lineTo(e2.offsetX,e2.offsetY);
             path.moveTo(e2.offsetX,e2.offsetY);///---很重要，这样保证与currentpath绘制方式一致
             currentpath=new Path2D();
             currentpath.moveTo(e2.offsetX,e2.offsetY);
             console.log(" offset :"+e2.offsetX+","+e2.offsetY);
        }
        console.log("down");
    }
    
    canvas.onmouseup=function(e){
        
        //context.stroke(currentpath);
        var oldpath=path;
        path=new Path2D();
        pathlist.push(oldpath);
        e.target.onmousemove=null;
        console.log("up");
    }
  
}