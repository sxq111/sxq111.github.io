# sxqui 使用教程

sxqui是一个js 组件库，但是不提供html和css  只提供js。
sxqui只关注于组件的逻辑实现，用户只需完成基本的html构建和css设置样式

sxqui提供的组建有：
1.拖动条
2.取色器




实例：
1.取色器
    html：
           <div id="touchbar_container">
               <div id="touchbar_bar"></div>
           </div>
    需要创建两个div 嵌套

    css：
／#touchbar_container{
    width: 300px;
    height: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color：black；
    position：relative；
}
／#touchbar_container #touchbar_bar{
    width: 20px;
    height: 20px;
    top: -9px;
    border-radius:14px; 
    border: 4px solid yellowgreen;
    background-color: yellow;
    cursor: pointer;
    margin: 0 auto;
    position: absolute;
    left: 95px;
}
    css中仅仅定义了滚动条的外观，但是子元素的position在代码实现中会被强制变为absolute。
