var menuBtn = document.querySelector(".menuBtn");
var menu = document.querySelector(".menu");
var closeMenu = document.querySelector(".closeMenu");

menuBtn.addEventListener('click', function () {

    closeMenu.classList.remove("hidden");
    menu.style.right = "0";
    menuBtn.classList.add("hidden")
    closeMenu.classList.add("block");
}, false);


closeMenu.addEventListener('click', function () {

    menuBtn.classList.remove("hidden");
    menu.style.right = "-16rem";
    closeMenu.classList.add("hidden")
    menuBtn.classList.add("block");
}, false);

document.addEventListener('click', function () {
    menuBtn.classList.remove("hidden");
    menu.style.right = "-16rem"
    closeMenu.classList.add("hidden")
    menuBtn.classList.add("block");
}, true);


$('nav a').click(function () {
    targetTop = $($(this).attr('href')).position().top;

    $('html,body').animate({
        scrollTop: targetTop
    }, 500);


});




$(document).ready(function () {
    $('.banner').slick({
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 1500,
        arrows: false,
        infinite: true,
        cssEase: "linear",


        responsive: [{
            breakpoint: 480,
            settings: {

                slidesToShow: 2,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 1500,
                arrows: false,
                infinite: true,
                cssEase: "linear",

            }
        }]




    });

    $('.cd-slide,.tshirt-slide').slick({

        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',

        responsive: [{
            breakpoint: 480,
            settings: {

                slidesToShow: 1,
                speed: 1500,
                arrows: false,
                infinite: true,
                cssEase: "linear",

            }
        }]
    });


    $('.news_marquee').slick({
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 80000,
        dots: false,
        infinite: true,
        cssEase: 'linear',

        responsive: [{
            breakpoint: 480,
            settings: {

                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 100000,
                dots: false,
                infinite: true,
                
                cssEase: 'linear',

            }
        }]
    });
    

});


const linkBtn=document.querySelectorAll("div.linkBtn").length;
    for(let i=0; linkBtn> i;i++){
      document.querySelectorAll("div.linkBtn")[i].addEventListener("click",function(){
        // alert(i+1);
        const clipboard = new ClipboardJS('.link');
        document.querySelectorAll(".linkBtn span")[i].innerHTML = "copied!"
      })
    }


var navList = document.querySelectorAll('nav li')
const sections = document.querySelectorAll("section");
window.onscroll = () => {
    var current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 80) {
            current = section.getAttribute("id");
        }
    });

    navList.forEach((li) => {
        li.classList.remove("text-yellow-600");
        if (li.classList.contains(current)) {

            li.classList.add("text-yellow-600");
        }
    });
};


$("#send").click(function(){
    var name, phone, order, store,sts
    name = $("input[name=name]").val()
    phone = $("input[name=phone]").val()
    order = $("select[name=order]").val()
    store = $("input[name=sts]").val()
    var sts = $("input[id=sts]:checked").length
    var check=$("input[name='delivery']:checked").length;//判斷有多少個方框被勾選
    if (!name) {
        alert("姓名不能為空");
        $('input[name=name]').focus();
        return false;
    } else if (!phone) {
        alert("手機不能為空");
        $('input[name=phone]').focus();
        return false;
    } else if (phone.length < 10) {
        alert("手機不能小於10位!");
        $('input[name=phone]').focus();
        return false;
    } else if (!order) {
        if (!order) {
            alert("購買項目不能為空");
            $('select[name=order]').focus();
            return false;
        }
    }else  if(check==0){
        alert("寄送方式請擇一");
        return false;//不要提交表單
    }else if(sts==1 &!store){
        alert("店到店門市不能為空");
    $('input[name=sts]').focus();
    return false;
    }

    function getTime(order_time, order_number) {
        var nowDate = new Date();
        var Y = nowDate.getFullYear();
        var Mh = nowDate.getMonth() + 1;
        if (Mh > 12) Mh = 01;
        if (Mh < 10) Mh = '0' + Mh;
        var D = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
        var H = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
        var M = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
        var S = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();

        var order_number = Mh + D + H + M + (Math.round(Math.random() * 89 + 100)).toString();
        var order_time = Y + '/' + Mh + '/' + D + '  ' + H + ':' + M + ':' + S
        return {
            order_time,
            order_number
        }


    }

    $.ajax({
        type: "post",
        url: "https://script.google.com/macros/s/AKfycbzzGPnNyMrr4u3gPaQxDjOwHGUMS-tXbtgyEhgPSk4DzMBRtsl8DHQFfQ2ZICcHHi7ouQ/exec",
        data: {
            "order_time": getTime().order_time,
            "order_number": getTime().order_number,
            "order_name": $("input[name=name]").val(),
            "order_phone": $("input[name=phone]").val(),
            "order_email": $("input[name=email]").val(),
            "order_order": $("select[name=order]").val(),
            "order_ftf": $("[id='ftf']:checked").val(),
            "order_sts": $("input[name=sts]").val(),
            "order_message": $("textarea[name=message]").val()
        },
        success: function (response) {
            if (response == "成功") {
                alert("訂購成功，訂單編號為" + getTime().order_number);
            }
            window.location.reload();
        }
    });

})


