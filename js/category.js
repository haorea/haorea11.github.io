/**
 * Created by wen on 2016/8/31.
 */
window.onload=function(){
    swipeLeft();
}
//左侧分类菜单滑动
function swipeLeft(){
/*
* 1：让左侧分类菜单支持上下滑动 垂直滑动
* 2；滑动有最大的一个滑动位置 最小的滑动位置
* 3：ul允许的最大位置在Y轴移动的值 0 还有个ul允许最小Y轴移动的位置cate-left -ul 高度
* 4：如果超过那个最大移动值 或者小于最小移动值 吸附回去
* 5：点击某一个分类li的时候要让这个li滑动到顶端的位置
* 6：点击的时候如果超过最大移动值 或者小于 最小移动值 不让吸附
*
* */
    var categoryLeft=document.querySelector('.category-left');
    var swipeUl=document.querySelector('.category-left ul');
    var startY=0;
    var moveY=0;
    var endY=0
    var distanceY=0;
    var currentY=0;//贯穿全局的index我当前已经滑动到的位置
    var maxPosition=0;//最大的移动位置
    var minPosition=categoryLeft.offsetHeight-swipeUl.offsetHeight;//最小的移动位置
    var maxSwipe=maxPosition+150;//最大支持的滑动位置
    var minSwipe=minPosition-150;//最小支持的滑动位置
    swipeUl.addEventListener('touchstart',function(e){
        startY=e.touches[0].clientY;
    });
    swipeUl.addEventListener('touchmove',function(e){
        moveY=e.touches[0].clientY;
        distanceY=moveY-startY;
        removeTransition();
        //判断滑动的距离有没有超过最大允许滑动的位置和最小滑动的位置（合理的滑动）
        if((currentY+distanceY)<maxSwipe &&(currentY+distanceY)>minSwipe){
            setTranslateY(currentY+distanceY);
        }
    });
    swipeUl.addEventListener('touchend',function(e){
        endY=e.changedTouches[0].clientY;
        currentY+=distanceY;//记录上次滑动的距离然后每一次滑动的距离相加 就是当前移动的位置
        if(currentY>maxPosition){
            //超过了最大允许位置要吸附回去
            currentY=maxPosition;
            setTranslateY(currentY);
            addTransition();
        }else if(currentY<minPosition){
            currentY=minPosition;
            setTranslateY(currentY);
            addTransition();
        }
    });

    /*
    * 点击某一个分类要吸顶
    * 给ul添加点击事件*/
    swipeUl.addEventListener('click',function(e){
        //获取所有的li
        var lis=swipeUl.querySelectorAll('li');
        //当前点中的li
        var li= e.target.parentNode;
        for(var i=0;i<lis.length;i++){
            lis[i].className="";
            lis[i].index=i;
        }
        var height=li.offsetHeight;
        console.log(li.index);
        var yidongY=-li.index*height;
        if(yidongY>minPosition){
            currentY=yidongY;
            addTransition();
            setTranslateY(currentY);
        }else {
            //小于了最小移动位置
            currentY = maxPosition;
            setTranslateY(currentY);
            addTransition();
        }
        li.className="active";
    })
    function setTranslateY(y) {
        swipeUl.style.transform = "translateY(" + y + "px)";
    }

    function removeTransition() {
        swipeUl.style.transition = "none";
    }

    function addTransition() {
        swipeUl.style.transition = "all 0.2s";
    }


}
