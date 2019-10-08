////////////////////
//Helper functions//
////////////////////

function changePage(options) {
    const bg = $('.bg-orange, .bg-blue, .bg-red, .bg-teal');
    if(bg.length && options.transition !== 'none') {
        bg.children().fadeOut('fast');
        setTimeout(function () {
            changePageHelper(options);
        }, 220);
    }
    else {
        changePageHelper(options);
    }
}

function changePageHelper(options) {

    const body = $('body');
    body.html($('#'+options.template_id).html());
    if (options.overlay_id) {
        body.append($('#'+options.overlay_id).html());
    }
    if (typeof options['on_load'] === 'function')
        options.on_load();
    for (const element in options.on_click) {
        if(options.on_click.hasOwnProperty(element)) {
            if(element.charAt(0) === '.') {
                $(element).on('click', options.on_click[element]);
            }
            else {
                $('#' + element).on('click', options.on_click[element]);
            }
        }
    }
    for (let delay in options.delay) {
        if(options.delay.hasOwnProperty(delay)) {
            setTimeout(options.delay[delay], Number(delay))
        }
    }
    $('.grid-item').each(function() {
        if(!$(this).children('img').length) {
            $(this).css('border', 'none');
        }
    });
    if (cordova && cordova.platformId === 'android') {
        const bgcolor = $('body > div:first').attr('class').split(' ');
        switch (bgcolor[0]) {
            case 'bg-orange':
                StatusBar.backgroundColorByHexString("#f47825");
                break;
            case 'bg-blue':
                StatusBar.backgroundColorByHexString("#63789c");
                break;
            case 'bg-teal':
                StatusBar.backgroundColorByHexString("#44bbb9");
                break;
            case 'bg-red':
                StatusBar.backgroundColorByHexString("#d74256");
                break;
        }

    }
    else if (cordova && cordova.platformId === "ios") {
        StatusBar.hide();
    }
}

function pulse() {
    $('.shiny-heart').animate({
        height: '29%',
        bottom: '5%',
    }, 600, function() {
        $('.shiny-heart').animate({
            height: '25%',
            bottom: '7%',
        }, 600, function() {
            pulse();
        });
    });
}

function singleGridItemSelect(selector) {
    if($(selector).children().length) {
        $('.grid-item').each(function() {
            if($(this).children('img').length) {
                $(this).css('border', '0.07em solid rgba(0, 0, 0, 0.2)');
            }
        });
        $(selector).css('border', '0.07em solid rgba(222, 98, 115, 1)');
        return [$(selector).children().attr('src'), $(selector).data('tag')];
    }
}

/*
 * Starts any clocks using the user's local time
 * From: cssanimation.rocks/clocks
 */
function initLocalClocks() {
    // Get the local time using JS
    const date = new Date;
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    // Create an object with each hand and it's angle in degrees
    const hands = [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];
    // Loop through each of these hands to set their angle
    for (let j = 0; j < hands.length; j++) {
        const elements = document.querySelectorAll('.' + hands[j].hand);
        for (let k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
            elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
            // If this is a minute hand, note the seconds position (to calculate minute position later)
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}

jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility === 'visible') ? 'hidden' : 'visible';
    });
};
