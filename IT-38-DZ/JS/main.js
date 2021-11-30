$(document).ready(function () {
    $('#form-btn').click(function () {
        $('.form-error').hide();


        let name = $('#form-name');
        let address = $('#form-address');
        let number = $('#form-number');

        let hasError = false;
        name.css('border-color', 'rgb(185, 145, 80)');
        address.css('border-color', 'rgb(185, 145, 80)');
        number.css('border-color', 'rgb(185, 145, 80)');


        if (!name.val()) {
            name.siblings('.form-error').show();
            name.css('border-color', 'red');
            hasError = true;
        }
        if (!address.val()) {
            address.siblings('.form-error').show();
            address.css('border-color', 'red');
            hasError = true;
        }
        if (!number.val()) {
            number.siblings('.form-error').show();
            number.css('border-color', 'red');
            hasError = true;
        }
        if (!hasError) {
            let url = 'https://itlogia.ru/test/checkout?name=' + name.val() + '&address=' + address.val() + '&number=' + number.val();
            console.log(url);
            let loader = $('#loader');
            loader.css('display', 'flex');



            $.ajax({
                method: "POST",
                url: url,
                data: { name: name.val(), address: address.val(), number: number.val()}
            })
                .done(function (message) {
                    loader.hide();
                    let result = message.success;
                    let form = $('#order-form');
                    let suc = $('#order-form-success')
                    if (result) {
                        form.css('display', 'none');
                        suc.css('display', 'flex');

                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');

                    }
                });
        }

    });
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    };
    document.querySelectorAll('#menu > *').forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    });
    $('.cookie-close').click(function () {
        $('#cookie').hide();
        localStorage.setItem('cookieHide', '1');

    });


    let cookieHide = localStorage.getItem('cookieHide');
    if (!cookieHide) {
        $('#cookie').show();
    }

    $('.product-button').click(function (event) {
        let productTitle = $(event.target).siblings('.product-title').text().trim();

        let cart = localStorage.getItem('cart');
        let cartArray = [];
        if (cart) {
            // Ниже преобразовываем из строки формата JSON в объект/массив JS
            cartArray = JSON.parse(cart);
        }
        cartArray.push(productTitle);
        localStorage.setItem('cart', JSON.stringify(cartArray));

        console.log(localStorage);
    });


});