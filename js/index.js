/**
 * Created by wen on 2016/8/29.
 */
window.onload=function(){
    downTime();
    search();
    slide();

}



function slide() {
    /*
     1.图片自动滚起来
     2.小圆点也要跟着滚动起来 无缝轮播图
     3.滚动的时候需要动画
     4.图片盒子需要滑动
     5.当滑动不超过1/3的时候 让他吸附回去
     6.当滑动超过1/3的时候让他切换到上一张或者下一张
     */
    var slide=document.querySelector("#slide");
    var slideWidth=slide.offsetWidth;
    //定义一个计数的变量 也是轮播图的下标索引
    var index=1;
    var slideUl=document.querySelector("#slide ul");
    //轮播图可以自动播放要有定时器
    var timer;
    function timerr() {
        timer = setInterval(function () {
            index++;
            //slideUl.style.transform = "translateX(-" + slideWidth * index + "px)";
            setTranslateX(-slideWidth*index);
            //slideUl.style.transition = "all 0.2s";
            addTransition()
        }, 1000);
    }
    timerr();
    //添加一个过渡完成事件
    slideUl.addEventListener('transitionend',function(){
        //过渡完成事件
        if(index>=9){
            index=1;
            //slideUl.style.transition="none";
            removeTransition()
            //slideUl.style.transform="translateX(-"+slideWidth*index+"px)";
            setTranslateX(-slideWidth*index);
        }else if(index<=0){
            index=9;
            //slideUl.style.transition="none";
            removeTransition()
            //slideUl.style.transform="translateX(-"+slideWidth*index+"px)";
            setTranslateX(-slideWidth*index);
        }
        setPoints();
    });
    //得知道滑动的距离。如果是正值就切换到下一张
    //2：如果是负值就切换到上一张
    //3：添加两个事件touchstart touchend 获取开始和结束的位置相减
    var startX=0;
    var endX=0;
    var moveX=0;
    var distanceX=0;
    slide.addEventListener('touchstart',function(e){
        //滑动的时候就不要自动播放 清除定时器
        clearInterval(timer);
        startX= e.touches[0].clientX;
    });
    slide.addEventListener('touchend',function(e){
        //滑动的时候就不要自动播放 清除定时器
        clearInterval(timer);
        endX= e.changedTouches[0].clientX;
        console.log(endX - startX);
        if(endX - startX > 0 && Math.abs(endX - startX)>1/3*slideWidth){
            //切换到上一张
            index--;
        }else if(endX - startX < 0 && Math.abs(endX - startX)>1/3*slideWidth) {
            //切换到下一张
            index++;
        }

        //slideUl.style.transform="translateX(-"+slideWidth*index+"px)";
        setTranslateX(-slideWidth*index);
        //slideUl.style.transition = "all 0.2s";
        addTransition()
        clearInterval(timer);
        timerr();
    });

    //得知道滑动过程中 滑动的距离
    //获取到了这个距离 设置当前的定位位置
    //从上一次最后的位置加上这个距离
    slide.addEventListener('touchmove',function(e){
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        //slideUl.style.transform="translateX("+(-slideWidth*index+distanceX)+"px)";
        setTranslateX(-slideWidth*index+distanceX);
        //slideUl.style.transition="none";
        removeTransition()
    })

    var points=slide.querySelectorAll('ul:last-child li');
    function setPoints(){
        for(var i=0;i<points.length;i++){
            points[i].className="";
        }
        points[index-1].className="active";
    }


    function setTranslateX(x){
        slideUl.style.transform="translateX("+x+"px)";
    }
    function removeTransition(){
        slideUl.style.transition="none";
    }
    function addTransition(){
        slideUl.style.transition="all 0.2s";
    }
}
//倒计时JS
function downTime(){
    //1:定义一个总时间
    //2：设定一个定时器让总时间每秒减一秒
    //3：拆分成时分秒 设置到计时在对应的标签上
    var time=18000;
    var timer=setInterval(function(){
        time--;
        //console.log(time);
        var seckillTimes=document.querySelectorAll(".seckill-time span");
        var h=Math.floor(time/3600);
        var m=Math.floor(time%3600/60);
        var s=Math.floor(time%60);
        seckillTimes[0].innerHTML=Math.floor(h/10);
        seckillTimes[1].innerHTML=Math.floor(h%10);
        seckillTimes[3].innerHTML=Math.floor(m/10);
        seckillTimes[4].innerHTML=Math.floor(m%10);
        seckillTimes[6].innerHTML=Math.floor(s/10);
        seckillTimes[7].innerHTML=Math.floor(s%10);

    },1000)
}

function search(){
        window.onscroll=function(){
            var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
            var topbar=document.querySelector(".topbar");
            if(scrollTop<document.querySelector("#slide").offsetHeight){
                //console.log(scrollTop);
                var opcity=scrollTop/document.querySelector("#slide").offsetHeight;
                topbar.style.backgroundColor='rgba(201, 21, 35, '+ opcity +')';
            }else{
                topbar.style.backgroundColor="rgba(201, 21, 35, 0.85)";
            }
        }
}