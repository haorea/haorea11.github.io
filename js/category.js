/**
 * Created by wen on 2016/8/31.
 */
window.onload=function(){
    swipeLeft();
}
//������˵�����
function swipeLeft(){
/*
* 1����������˵�֧�����»��� ��ֱ����
* 2������������һ������λ�� ��С�Ļ���λ��
* 3��ul��������λ����Y���ƶ���ֵ 0 ���и�ul������СY���ƶ���λ��cate-left -ul �߶�
* 4����������Ǹ�����ƶ�ֵ ����С����С�ƶ�ֵ ������ȥ
* 5�����ĳһ������li��ʱ��Ҫ�����li���������˵�λ��
* 6�������ʱ�������������ƶ�ֵ ����С�� ��С�ƶ�ֵ ��������
*
* */
    var categoryLeft=document.querySelector('.category-left');
    var swipeUl=document.querySelector('.category-left ul');
    var startY=0;
    var moveY=0;
    var endY=0
    var distanceY=0;
    var currentY=0;//�ᴩȫ�ֵ�index�ҵ�ǰ�Ѿ���������λ��
    var maxPosition=0;//�����ƶ�λ��
    var minPosition=categoryLeft.offsetHeight-swipeUl.offsetHeight;//��С���ƶ�λ��
    var maxSwipe=maxPosition+150;//���֧�ֵĻ���λ��
    var minSwipe=minPosition-150;//��С֧�ֵĻ���λ��
    swipeUl.addEventListener('touchstart',function(e){
        startY=e.touches[0].clientY;
    });
    swipeUl.addEventListener('touchmove',function(e){
        moveY=e.touches[0].clientY;
        distanceY=moveY-startY;
        removeTransition();
        //�жϻ����ľ�����û�г��������������λ�ú���С������λ�ã�����Ļ�����
        if((currentY+distanceY)<maxSwipe &&(currentY+distanceY)>minSwipe){
            setTranslateY(currentY+distanceY);
        }
    });
    swipeUl.addEventListener('touchend',function(e){
        endY=e.changedTouches[0].clientY;
        currentY+=distanceY;//��¼�ϴλ����ľ���Ȼ��ÿһ�λ����ľ������ ���ǵ�ǰ�ƶ���λ��
        if(currentY>maxPosition){
            //�������������λ��Ҫ������ȥ
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
    * ���ĳһ������Ҫ����
    * ��ul��ӵ���¼�*/
    swipeUl.addEventListener('click',function(e){
        //��ȡ���е�li
        var lis=swipeUl.querySelectorAll('li');
        //��ǰ���е�li
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
            //С������С�ƶ�λ��
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
