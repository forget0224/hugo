const menuBtn = document.querySelector(".menuBtn");
const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".closeMenu");

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

    checkInput()

});

const linkBtn = document.querySelectorAll("div.linkBtn").length;
for (let i = 0; linkBtn > i; i++) {
    document.querySelectorAll("div.linkBtn")[i].addEventListener("click", function () {
        // alert(i+1);
        const clipboard = new ClipboardJS('.link');
        document.querySelectorAll(".linkBtn span")[i].innerHTML = "copied!"
    })
}


const navList = document.querySelectorAll('nav li')
const sections = document.querySelectorAll("section");
window.onscroll = () => {
    var current = "";

    sections.forEach((section) => {
        var sectionTop = section.offsetTop;
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


$('#product').change(changeProduct)
$('#quantity').change(processTotal)
$('input[type=radio][name=delivery]').change(processTotal)

function changeProduct() {
    switchProduct()
    resetParameter()
    processTotal()
}

function switchProduct() {
    $('#quantity-field').removeClass('hidden')
    if ($('#product').val() === '1') {
        $('#size-field').addClass('hidden')
    } else {
        $('#size-field').removeClass('hidden')
    }
}

function resetParameter() {
    $('#size').val('')
    $('#quantity').val('')
}

const PRODUCT_LIST = {
    '1': {
        name: 'DUGOUT Album CD',
        price: 500
    },
    '2': {
        name: 'DUGOUT Album TEE',
        price: 900
    },
    '3': {
        name: 'DUGOUT Album BUNDLE',
        price: 1100
    }
}

function processTotal() {
    const productPrice = PRODUCT_LIST[$('#product').val()] ?.price || 0
    const quantity = Number($('#quantity').val())
    const subTotal = productPrice * quantity
    const shipping = Number($('input[name=delivery]:checked').val()) || 0
    const total = subTotal + shipping
    $('#subTotal').text(subTotal)
    $('#shipping').text(shipping)
    $('#total').text(total)
    subTotal ? $('#sub-total-label').removeClass('hidden') : $('#sub-total-label').addClass('hidden')
    shipping ? $('#shipping-label').removeClass('hidden') : $('#shipping-label').addClass('hidden')
    total ? $('#total-label').removeClass('hidden') : $('#total-label').addClass('hidden')
}

function checkInput() {
    $('#myForm').validate({
        /* 常用檢測屬性
       required:必填
       noSpace:空白
       minlength:最小長度
       maxlength:最大長度
       email:信箱格式
       number:數字格式
       url:網址格式https://www.minwt.com
       */
        onkeyup: function (element, event) {
            //去除左側空白
            var value = this.elementValue(element).replace(/^\s+/g, "");
            $(element).val(value);
        },
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true,
                minlength: 10,
                number: true
            },
            email: {
                required: true,
                email: true
            },
            delivery: {
                required: true
            },
            product: {
                required: true
            },
            size: {
                required: true
            },
            quantity: {
                required: true
            },

            sts: {
                required: "#sts:checked"
            },
        },
        messages: {
            name: {
                required: '必填'
            },
            phone: {
                required: '必填',
                minlength: '不得少於10位',
                number: '電話需為數字'
            },
            delivery: '必填',
            email: {
                required: '必填',
                email: 'Email格式不正確'
            },
            product: {
                required: '必填'
            },
            size: {
                required: '必填'
            },
            quantity: {
                required: '必填'
            },
            sts: {
                required: '必填'
            }
        },
        submitHandler: function () {
            postSheet();
        },
        invalidHandler: function () {
            return false
        }
    });
    const stsCheck = $("input[id='sts']");
    const deliveryCheck = $('input[name=delivery]');
    const stsName = $("input[name=sts]")

    deliveryCheck.click(function () {

        if (stsCheck.is(":checked")) {
            stsName.prop("disabled", false)
        } else {
            stsName.prop("disabled", true)
        }

    })


}

document.querySelector('#myForm').addEventListener('submit', (e) => {
    e.preventDefault();
});


function getTime(order_time, order_number) {
    const nowDate = new Date();
    const Y = nowDate.getFullYear();
    let Mh = nowDate.getMonth() + 1;
    if (Mh > 12) Mh = 01;
    if (Mh < 10) Mh = '0' + Mh;
    const D = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
    const H = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
    const M = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
    const S = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();

    var order_number = Mh + D + H + M + (Math.round(Math.random() * 89 + 100)).toString();
    var order_time = Y + '/' + Mh + '/' + D + '  ' + H + ':' + M + ':' + S
    return {
        order_time,
        order_number
    }


}

function postSheet() {

    getTime();

    $.ajax({
        type: "post",
        url: "https://script.google.com/macros/s/AKfycbxS6kr3GEfvLL64wT5Q-qS765mKqDPMnb-BPK7pu2SGHZN21lo7tEChpbXTS_F-X1Rmgw/exec",
        data: {
            "order_time": getTime().order_time,
            "order_number": getTime().order_number,
            "order_name": $("input[name=name]").val(),
            "order_phone": $("input[name=phone]").val(),
            "order_email": $("input[name=email]").val(),
            "order_order": PRODUCT_LIST[$('#product').val()].name,
            "order_size": $("select[name=size]").val(),
            "order_quantity": $("select[name=quantity]").val(),
            "order_ftf": $("[id='ftf']:checked + label").text(),
            "order_sts": $("input[name=sts]").val(),
            "order_total": $("#total").text(),
            "order_message": $("textarea[name=message]").val()
        },

        success: function (response) {
            if (response == "成功") {

                sendMail()
                alert("訂購資訊已寄送到您的信箱。"+"訂單編號:" + getTime().order_number);

            }
            $("input[name=name]").val("");
            $("input[name=phone]").val("");
            $("input[name=email]").val("");
            $("select[name=product]").val("0")
            $("textarea[name=message]").val("");
            changeProduct()

        }
    });



}


function sendMail() {
    var data = {
        "order_time": getTime().order_time,
        "order_number": getTime().order_number,
        "order_name": $("input[name=name]").val(),
        "order_phone": $("input[name=phone]").val(),
        "order_email": $("input[name=email]").val(),
        "order_order": PRODUCT_LIST[$('#product').val()].name,
        "order_size": $("select[name=size]").val(),
        "order_quantity": $("select[name=quantity]").val(),
        "order_ftf": $("[id='ftf']:checked + label").text(),
        "order_sts": $("input[name=sts]").val(),
        "order_total": $("#total").text(),
        "order_message": $("textarea[name=message]").val()
    }

    const serviceID = "service_0hu3zy5";
    const templateID = "template_hpe1cza"
    emailjs.send(serviceID, templateID, data)
}