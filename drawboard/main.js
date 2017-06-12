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
    currentContext:null,
    isClear:undefined
};



function main()
{
   console.log(sxqtools.hasOwnProperty("toRGB"));
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    context.fillStyle="#fff";
    context.fillRect(0,0,canvas.width,canvas.height);
    sxqtools.currentContext=context;
    sxqtools.currentContext.lineWidth=2;
    sxqtools.currentContext.lineCap="round";



//-------------------tool buttons ------------------
    var image =new Image();
    image.src=canvas.toDataURL();
        editor.reset(image);
        console.log(editor)
    
    var btn1=document.getElementById("btn1");
    btn1.onclick=function(){
        //undo
        editor.undo();
        console.log(editor);
        if(editor.get().isClear)
        {
            sxqtools.isClear=true;
        }
        context.drawImage(editor.get(),0,0);
        
    };
    var btn2=document.getElementById("btn2");
    btn2.onclick=function(){
        editor.redo();
        if(editor.get().isClear)
        {
            sxqtools.isClear=true;
        }
        context.drawImage(editor.get(),0,0);
    };

    var btn3=document.getElementById("btn3");

    btn3.onclick=function()
    {
        download(canvas);
    }


    var btn4=document.getElementById("btn4");
    var loadfile= document.getElementById("loadfile");
    loadfile.addEventListener("change",function(){
             var file = this.files[0];//获取input输入的图片
             console.log(file);
             var fname=file.name;
             if(!/^(.+?)\.(jpeg|png|bmp)$/.test(fname.toLowerCase())){
                alert('Not An Image(bmp,jpeg,png)');
                return;
             }
              var reader = new FileReader();
              reader.readAsDataURL(file);//转化成base64数据类型
               reader.onload = function(e){
                console.log("file load");
                var theimg=new Image();
                theimg.src=this.result;
                theimg.onload=function()
                {
                    context.drawImage(theimg,0,0,canvas.width,canvas.height);
                }
        }
        },false);
    btn4.onclick=function()
    {
        //context.drawImage(image,0,0);
       loadfile.click();

    }

    var btn5=document.getElementById("btn5");
    btn5.onclick=function()
    {
        if(sxqtools.isClear===false)
            {
                context.fillStyle="#fff";
                context.fillRect(0,0,canvas.width,canvas.height);
                sxqtools.isClear=true;
                var img=new Image();
                img.src=canvas.toDataURL();
                img.isClear=true;
                editor.add(img);
            }else{
                alert("Is Cleared Already !");
                return;
            }
    }

    //-------colors  drag----------
    var colors=document.getElementById("colors");
    sxqui.createDragable(colors);
    var mybrush=document.getElementById("brushtools");
    sxqui.createDragable(mybrush);
//----------------colorpickers--------------
//to do 尝试使用事件委托
var pickercanvas=document.getElementById("pickercanvas");
var mypickercanvas=sxqui.createColorPickerCanvas(pickercanvas);
mypickercanvas.setColors(4);
mypickercanvas.setSize(1);
var  origionColor;
var selectedtarget;
//var radius=0.5;
var pickerr=128,pickerg=128,pickerb=128;
mypickercanvas.colorSelectCallback=function(){
    pickerr=mypickercanvas.r;
    pickerg=mypickercanvas.g;
    pickerb=mypickercanvas.b;
    sxqtools.setColor(mypickercanvas.r,mypickercanvas.g,mypickercanvas.b,mybar.radius);
    touchbar.style.backgroundColor=sxqtools.currentColor.style.backgroundColor;
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
            touchbar.style.backgroundColor=origionColor;
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
     touchbar.style.backgroundColor=sxqtools.currentColor.style.backgroundColor;
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
     //sxqtools.currentContext.lineWidth=Number.parseInt(brushsizealert.style.height);
     brush.setLineSize(Number.parseInt(brushsizealert.style.height));
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
// --------------------brush type----------------------------
var brushList=document.getElementsByClassName("brushtypebtn");
brushList[0].addEventListener("click",function(e){
    brush.setNormalBrush(canvas);
},false)
brushList[1].addEventListener("click",function(e){
    brush.setDotBrush(canvas);
},false)
brushList[2].addEventListener("click",function(e){
    brush.setLineBrush(canvas);
},false);
brushList[3].addEventListener("click",function(e){
    brush.setRectBrush(canvas);
},false);
brushList[4].addEventListener("click",function(e){
    brush.setRoundBrush(canvas);
},false);
brushList[5].addEventListener("click",function(e){
    brush.setFillRectBrush(canvas);
},false);
brushList[6].addEventListener("click",function(e){
    brush.setFillRoundBrush(canvas);
},false);
brushList[7].addEventListener("click",function(e){
    brush.setCurvebrush(canvas);
},false);
brushList[8].addEventListener("click",function(e){
    brush.setEraser(canvas);
},false);
//-------------draw methods--------------

brush.setDotBrush(canvas);
canvas.addEventListener("mousedown",function(){
    sxqtools.isClear=false;
    if(sxqtools.currentColor &&sxqtools.currentColor.style.backgroundColor)
        {
            context.strokeStyle=sxqtools.currentColor.style.backgroundColor;
            context.fillStyle=context.strokeStyle;
        }else{
            context.strokeStyle="#888";
             context.fillStyle=context.strokeStyle;
        }
},false);
canvas.addEventListener("mouseup",function(){
        var img=new Image();
        img.src=canvas.toDataURL();
        editor.add(img);
},false);
}

// $(document).ready(function () {
//     var container = $('.brush-wrapper');
//     var btns = container.find('.brushtypebtn');
// });