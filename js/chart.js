//window.onload=function(){
//    deleteProduct();
//}
//
//function deleteProduct(){
//    /*
//    * 1������������������Ӷ�������
//    * 2�������¨Ҫ��ÿһ������¨����ӵ����¼�*/
//    var deleteBox=document.querySelector('.delete-box');
//    var model=document.querySelector('#model');
//    var btnCancel=document.querySelector('.btn-cancel');
//    var deleteUp;
//    for(var i=0;i<deleteBox.length;i++){
//    deleteBox[i].addEventListener('click',function(){
//        //���������������
//        //���ȵ��õ�������ʾ����
//        alert(1);
//        model.style.display="block";
//        model.querySelector('.model-info').classList.add('bounceInDown');
//        deleteUp=this.querySelector('span');
//        deleteUp.style.transform="rotateZ(-45deg) translateY(3px)";
//        deleteUp.style.transformOrigin="left bottom";
//        deleteUp.style.transition="all 1s";
//    });
//   }
//    btnCancel.addEventListener('click',function(){
//        //����ģ̬��
//        model.style.display="none";
//        //�ǻظ���
//        deleteUp.style.transform="none";
//        deleteUp.style.transition="all 1s";
//    });
//}


window.onload = function() {
    deleteProduct();
}

function deleteProduct() {
    /**
     * 1.�������¨����������Ӷ�������
     * 2.�������¨Ҫ��ÿһ������¨����ӵ����¼�
     */
    var deleteBox = document.querySelectorAll('.delete-box');
    var model = document.querySelector('#model');
    var btnCancel = document.querySelector('.btn-cancel');
    var btnConfirm = document.querySelector('.btn-confirm');
    var deleteUp;
    var current;
    //var Product=document.querySelector('.product');

    for (var i = 0; i < deleteBox.length; i++) {
        deleteBox[i].addEventListener('click', function() {
            //���������������

            //���ȵ��õ�������ʾ����
            model.style.display = "block";
            model.querySelector('.model-info').classList.add('bounceInDown');
            deleteUp = this.querySelector('span');
            deleteUp.style.transform = "rotateZ(-45deg) translateY(3px)";
            deleteUp.style.transformOrigin = "left bottom";
            deleteUp.style.transition = "all 1s";
            current=this;
        });
    }

    btnCancel.addEventListener('click', function() {

        // ����ģ̬��
        model.style.display = "none";
        //�ǻظ���
        deleteUp.style.transform = "none";
        deleteUp.style.transition = "all 1s";
    });


    btnConfirm.addEventListener('click', function() {
        //Product.style.display="none";
        current.parentNode.parentNode.parentNode.parentNode.style.display="none";
        model.style.display = "none";
        deleteUp.style.transform = "none";
        deleteUp.style.transition = "all 1s";
       });

    }
