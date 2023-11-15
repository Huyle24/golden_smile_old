import $ from "jquery";
import moment from 'moment';

// export function getLinkToPreview(arr) {
//     let link_element = ""
//     arr.forEach(link => {
//         if (link.includes("https://")) {
//             link_element += link
//         }
//     })

//     console.log("link ele", link_element);
//     return link_element;
// }


export function youtube_parser(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        //error
    }
}
export function format_currency(num) {
    if (num)
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return 0;
}

export function un_format_money(money) {
    if (money && money != '')
        return parseInt(money.replace(/\,/g, ''));
    else return 0;
}

export function update_format_money(element) {
    var money = $(element).val();
    if ($.trim(money) == '') return;
    money = un_format_money(money);
    $(element).val(format_currency(money));
}
export function add_price_date() {
    var date_start = $(".date_start").find('option:selected').val();
    var date_end = $(".date_end").find('option:selected').val();
    var select_add_price = $(".select_add_price").find('option:selected').val();
    var price_add_date = $(".price_add_date").val();
    while (date_start <= date_end) {
        $("." + select_add_price + "_" + date_start).val(price_add_date);
        date_start++;
    }
}
export function NumInWords(number) {
    const first = ['', 'một ', 'hai ', 'ba ', 'bốn ', 'năm ', 'sáu ', 'bảy ', 'tám ', 'chín ', 'mười ', 'mười một ', 'mười hai ', 'mười ba ', 'mười bốn ', 'mười lăm ', 'mười sáu ', 'mười bảy ', 'mười tám ', 'mười chín '];
    const tens = ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
    const mad = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ'];
    let word = '';

    for (let i = 0; i < mad.length; i++) {
        let tempNumber = number % (100 * Math.pow(1000, i));
        if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
            if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
                word = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + word;
            } else {
                word = tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + '-' + first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + mad[i] + ' ' + word;
            }
        }

        tempNumber = number % (Math.pow(1000, i + 1));
        if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0) word = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'trăm ' + word;
    }
    return word;
}
export function date_picker(class_div) {
    $(class_div).datetimepicker({
        format: 'DD/MM/YYYY',
        ignoreReadonly: true,
        icons: {
            time: 'fas fas-clock',
            date: 'fas fas-calendar',
            up: 'fas fas-arrow-up',
            down: 'fas fas-arrow-down',
            previous: 'fas fas-chevron-left',
            next: 'fas fas-chevron-right',
            today: 'fas fas-calendar-check',
            clear: 'fas fas-trash-alt',
            close: 'fas fas-times-circle'
        }
    });
}

export function random_string(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function delay_function(callback, ms) {
    var timer = 0;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, ms || 0);
    };
}
export function format_telephone(num) {
    if (num && $.isNumeric(num))
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1");
    return "";
}
export function update_format_phone(element) {
    var ele = $(element).val();
    if ($.trim(ele) == '') return;
    ele = format_telephone(ele);
    $(element).val(ele);
}
export function repeat_form(class_apply) {
    $(class_apply).repeater({
        isFirstItemUndeletable: false,
        initEmpty: false,
        show: function () {
            $(this).slideDown();
        },
        hide: function (e) {

        },
    });
}

export function format_date_time_for_view(datetime, type) {
    let datetimeformat = moment(datetime, 'YYYY-MM-DD HH:mm:ss', true);
    switch (type) {
        case 'date':
            return datetimeformat.format("DD/MM/YYYY");
        case 'time':
            return datetimeformat.format("HH:mm:ss");
        case 'datetime':
            return datetimeformat.format("DD/MM/YYYY HH:mm:ss");
        default:
            return datetimeformat.format('YYYY-MM-DD');
    }
}
export function format_date_for_view(datetime) {
    let dateformat = moment(datetime, 'YYYY-MM-DD', true);
    return dateformat.format("DD/MM/YYYY");
}
export function format_date_for_db(datetime) {
    let dateformat = moment(datetime, "DD/MM/YYYY", true);
    return dateformat.format("YYYY-MM-DD");
}
export function getMonthorYearCurrent(type) {
    let current_date = new Date();
    switch (type) {
        case 'date':
            return current_date.getDate();
        case 'month':
            return current_date.getMonth() + 1;
        case 'year':
            return current_date.getFullYear();
        case 'fulldate':
            return current_date.getDate() + "/" + (current_date.getMonth() + 1) + "/" + current_date.getFullYear();
    }
}
export function listMonthOfYear() {
    let obj_month = [];
    let i;
    for (i = 0; i < 12; i++) {
        obj_month.push(i + 1);
    }
    return obj_month;
}

export function get_append_img($class_run, $class_append, w = 150) {
    $($class_run).change(function (event) {
        let uploadImg = $(this);
        let input = $(event.currentTarget);
        let file = input[0].files[0];
        let reader = new FileReader();
        let image_base64 = '';
        reader.onload = function (e) {
            image_base64 = e.target.result;
         //   if ($(uploadImg).next('.preloadImgUp')) $(uploadImg).next('.preloadImgUp').remove();
         //   $($class_append).html("<img src='" + image_base64 + "' width=" + w + " class='img-rounded rounded' />");
        };
       // reader.readAsDataURL(file);
        return image_base64;
    });
}
export function get_img_attr($class_run, $class_append, $class_change) {
    $($class_run).change(function (event) {
        let uploadImg = $(this);
        let input = $(event.currentTarget);
        let file = input[0].files[0];
        let reader = new FileReader();
        let image_base64 = '';
        reader.onload = function (e) {
            image_base64 = e.target.result;
            if ($(uploadImg).next('.preloadImgUp')) $(uploadImg).next('.preloadImgUp').remove();
            $($class_append).attr('src', image_base64);
            $($class_change).removeClass('hide');
        };
        reader.readAsDataURL(file);
    });
}
export function get_append_multi_img($class_run, $class_append) {

    $($class_run).change(function (event) {
        let uploadImg = $(this);
        let input = $(event.currentTarget);
        let file = input[0].files;

        //$($class_append).html("");
        $.each(file, function (key, value) {
            let reader = new FileReader();
            let image_base64 = '';
            let random_key = random_string(6);
            reader.onload = function (e) {
                image_base64 = e.target.result;
                if ($(uploadImg).next('.preloadImgUp')) $(uploadImg).next('.preloadImgUp').remove();
                $($class_append).append("<div class='image_box_timeline image_timeline_" + random_key + "'>" +
                    "<a href='javascript:void(0)' onclick=remove_click('" + random_key + "')><i class='fa fa-close'></i></a>" +
                    "<img src='" + image_base64 + "' width='150' height='150' class='img-rounded rounded' />" +
                    "</div>");
            };
            reader.readAsDataURL(file[key]);
        });

    });
}
// export function getBase64Image(url) {
//     const data = fetch(url);
//     console.log(data)
//     const blob = data.blob();
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(blob);
//         reader.onloadend = function () {
//             const base64data = reader.result;
//             resolve(base64data);
//         }
//     });
// }
export function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
export function validURL(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


export function convertToInteger(numberStr) {
    let numberInt = parseInt(numberStr.replace(/,/g, ""));
    return numberInt;
}

