/**
 * Created by Danny on 2017-03-29.
 */

var search_bar = document.getElementsByClassName('search_bar')[0];
var banImg = document.getElementsByClassName('banImg')[0];
var eles = banImg.getElementsByTagName('a')
var banner = document.getElementsByClassName('banner')[0];
var focusList = banner.getElementsByClassName('focus_lists')[0];

var imgs= banImg.getElementsByTagName('img');
var lis = focusList.getElementsByTagName('li');

//search
// search_bar.onfocus = function () {
//         search_bar.value='';
//     }
// search_bar.onblur=function () {
//     if(search_bar.value!= ''){
//         search_bar.style.color='black';
//     }else{
//         search_bar.value='进口食品好味道';
//         search_bar.style.color='rgba(0, 0, 0, .3)';
//     }
// }

//banner
var data =null;
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt',false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4 && xhr.status ==200){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
})();
//console.log(data);
;(function (){
    if(data && data.length){
        var strImg = '';
        var strLi = '';
        for(var i = 0; i < data.length; i++){
            strImg = '<img src="" real="'+ data[i].src +'">';
            strLi += i == 0 ? '<li class="cur"></li>' : '<li></li>';
        eles[i].innerHTML =strImg;
            console.log(eles[i]);
        }

        focusList.innerHTML = strLi;
        console.log(focusList);
    }
})();

//  验证图片有效性 => 让第一张图片层级关系提高，并且透明度从0动画到1
;(function (){
    for(var i = 0; i < imgs.length; i++){
        var tempImg = document.createElement('img');
        tempImg.index = i; // 事件绑定给哪个元素属性就添加给这个元素
        tempImg.src = imgs[i].getAttribute('real');
        tempImg.onload = function (){
            imgs[this.index].src = this.src;
            if(this.index == 0){
               utils.css(imgs[0],'zIndex', 1);
                animate({
                    ele : imgs[0],
                    target : {
                        opacity : 1
                    },
                    duration : 300
                });
            }
        }
    }
})();

//
var index = 0; // 默认第一张  1
var timer = window.setInterval(autoMove,4000);
function autoMove(){
    index++;
    if(index == data.length){
        index = 0;
    }
    setImg();
}
// 负责让哪一张图片提高层级并且渐显
function setImg(){
    for(var i = 0; i < imgs.length; i++){
        if(i == index){
            utils.css(imgs[i],'zIndex',1);
            animate({
                ele : imgs[i],
                target : {
                    opacity : 1
                },
                duration : 300,
                callback : function (){
                    // 当动画到1之后然后要把除了当前刚动画结束的这一张图片的其他所有图片的透明度设置到0
                    var otherImgs = utils.siblings(this.parentNode);
                    console.log(otherImgs);
                    // 除了当前正在最高层级的这一张
                    for(var i = 0; i < otherImgs.length; i++){

                        utils.css(otherImgs[i].firstChild/*otherImgs[i].children*/,'opacity',0);
                    }
                    canClick = true;
                }
            });
        }else{
            utils.css(imgs[i],'zIndex',0);
        }
        // 焦点对齐
        lis[i].className = index == i ? 'cur' : '';
    }
}

//获得兄弟节点
// function siblings(elm) {
//
//     var a = [];
//     var p = elm.parentNode.parentNode.children;
//     for(var i =0;i< p.length;i++) {
//         if(p[i].children !== elm) {
//             a.push(p[i].children);
//         }
//     }
//     console.log(a[1]);
//     return a;
// }
