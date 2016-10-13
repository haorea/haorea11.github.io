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
     1.ͼƬ�Զ�������
     2.СԲ��ҲҪ���Ź������� �޷��ֲ�ͼ
     3.������ʱ����Ҫ����
     4.ͼƬ������Ҫ����
     5.������������1/3��ʱ�� ����������ȥ
     6.����������1/3��ʱ�������л�����һ�Ż�����һ��
     */
    var slide=document.querySelector("#slide");
    var slideWidth=slide.offsetWidth;
    //����һ�������ı��� Ҳ���ֲ�ͼ���±�����
    var index=1;
    var slideUl=document.querySelector("#slide ul");
    //�ֲ�ͼ�����Զ�����Ҫ�ж�ʱ��
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
    //���һ����������¼�
    slideUl.addEventListener('transitionend',function(){
        //��������¼�
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
    //��֪�������ľ��롣�������ֵ���л�����һ��
    //2������Ǹ�ֵ���л�����һ��
    //3����������¼�touchstart touchend ��ȡ��ʼ�ͽ�����λ�����
    var startX=0;
    var endX=0;
    var moveX=0;
    var distanceX=0;
    slide.addEventListener('touchstart',function(e){
        //������ʱ��Ͳ�Ҫ�Զ����� �����ʱ��
        clearInterval(timer);
        startX= e.touches[0].clientX;
    });
    slide.addEventListener('touchend',function(e){
        //������ʱ��Ͳ�Ҫ�Զ����� �����ʱ��
        clearInterval(timer);
        endX= e.changedTouches[0].clientX;
        console.log(endX - startX);
        if(endX - startX > 0 && Math.abs(endX - startX)>1/3*slideWidth){
            //�л�����һ��
            index--;
        }else if(endX - startX < 0 && Math.abs(endX - startX)>1/3*slideWidth) {
            //�л�����һ��
            index++;
        }

        //slideUl.style.transform="translateX(-"+slideWidth*index+"px)";
        setTranslateX(-slideWidth*index);
        //slideUl.style.transition = "all 0.2s";
        addTransition()
        clearInterval(timer);
        timerr();
    });

    //��֪������������ �����ľ���
    //��ȡ����������� ���õ�ǰ�Ķ�λλ��
    //����һ������λ�ü����������
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
//����ʱJS
function downTime(){
    //1:����һ����ʱ��
    //2���趨һ����ʱ������ʱ��ÿ���һ��
    //3����ֳ�ʱ���� ���õ���ʱ�ڶ�Ӧ�ı�ǩ��
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