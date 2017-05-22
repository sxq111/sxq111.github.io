
var editor={
    picArr:[],
    arrMaxSzie:30,
    currentIndex:null,
    add:add,
    undo:undo,
    redo:redo,
    get:getImage,
    reset:reset
};

function reset(image){
    editor.picArr=[];
    editor.currentIndex=null;
    editor.add(image);
}
function add(image){
    if(editor.currentIndex!=null&&editor.currentIndex!=editor.picArr.length-1)
    {
        console.log("inundo")
        editor.picArr=editor.picArr.slice(0,editor.currentIndex+1);
    }
    editor.picArr.push(image);
    if(editor.picArr.length>editor.arrMaxSzie)
    {       
        editor.picArr.shift();
    }
    editor.currentIndex=editor.picArr.length-1;
}
function undo()
{
    if(editor.currentIndex>0)
    {
        editor.currentIndex--;
    }else{
        alert("can not undo now");
    }
}
function redo(){
     if(editor.currentIndex<editor.picArr.length-1)
    {
        editor.currentIndex++;
    }else{
        alert("can not redo now");
    }
}
function getImage()
{

    return editor.picArr[editor.currentIndex];
}