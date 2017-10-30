import '/node_modules/zepto/src/zepto.js';
import '/node_modules/zepto/src/event.js';
import '/node_modules/zepto/src/touch.js';
import '/node_modules/zepto/src/fx.js';


function fillContent(roleName, name, text, img) {
    let $roleNameNode = $('.detail-tooltip-main-title-name');
    let $nameNode = $('.detail-tooltip-main-title-link');
    let $textNode = $('.detail-tooltip-main-text');
    let $imgNode = $('.detail-tooltip-main-content-img');

    $roleNameNode.html(roleName);
    $nameNode.html(name);
    $textNode.html(text);
    $imgNode.attr('src', img);
}

export function renderListTpl(data, nodeSet, stage) {
    let $ulNode = $('.recommend-tooltip-main-list');

    data.map((item, index)=>{

        let liNode = '<li class="recommend-tooltip-main-list-item">'
                    + '<img class="recommend-tooltip-main-list-item-img" src="'
                    + item.src + '" data-id="'
                    + item.id + '" alt=""><span>'
                    + item.name + '</span></li>';

        $ulNode.append(liNode);
    });

    $ulNode.css('width', 8 * data.length + 'rem');

    $('.recommend-tooltip-main-list-item').css('width', 100 / data.length + '%');

    $('.recommend-tooltip-main-list-item').on('click', [nodeSet, stage], handleLiNodeClick);
}


function smoothScroll(el, toX, toY, duration) {
    if (duration < 0) {
        return;
    }

    // var difference = to - $(window).scrollTop();
    var differenceX = toX - el.scrollLeft();
    var differenceY = toY - el.scrollTop();
    var perTickX = differenceX / duration * 10;
    var perTickY = differenceY / duration * 10;

    setTimeout(function() {
        if (!isNaN(parseInt(perTickX, 10)) && !isNaN(parseInt(perTickY, 10))) {
            // window.scrollTo(0, $(window).scrollTop() + perTick);
            el.scrollLeft(el.scrollLeft() + perTickX);
            el.scrollTop(el.scrollTop() + perTickY);
            smoothScroll(el, toX, toY, duration - 10);
        }
    }.bind(this), 10);
}


function handleLiNodeClick(e) {

    // console.log(event.data);

    const nodeSet = event.data[0];
    const stage = event.data[1];
    const tooltipHeight = $('.recommend-tooltip-main-list').height();
    const canvasWidth = $('#relation-map-canvas').width();
    const canvasHeight = $('#relation-map-canvas').height();
    const node = nodeSet.nodes[e.target.dataset.id]

    if (node) {

        const x = node.x / 2;
        const y = node.y / 2;

        // 主角在整个画面的哪个位置
        const ratioX = x / canvasWidth + 0.15;
        // const ratioY = 0.3;
        const ratioY = y / canvasHeight;

        console.log(y / canvasHeight);

        // 为了修复手百会因为overflow scroll导致页面只渲染一半
        // $('.relation-map').css('overflow', 'hidden');

        smoothScroll($('.relation-map'), x * ratioX, y * ratioY, 200);

        // 恢复页面可以滑动
        // $('.relation-map').css('overflow', 'scroll');


    }

    for (let id in nodeSet.nodes) {
        let node = nodeSet.nodes[id];
        let shapeCircle = node.container.children[1].children[0];
        let shapeImg = node.container.children[0].children[0];
        let shapeTextBg = node.container.children[0].children[1];
        let shapeText = node.container.children[0].children[2];
        let shapeMask = node.container.children[0].mask;

        // console.log(node.container);

        if (id === e.target.dataset.id) {
            shapeCircle.graphics
                .clear()
                .setStrokeStyle(5, 'round', 'round')
                .beginStroke('#de452a')
                .drawCircle(node.x, node.y, node.clickNodeRadius)
                .closePath();

            // console.log(shapeTextBg);
            shapeTextBg.graphics
                .clear()
                .beginFill('rgba(222,69,42,0.5)')
                .drawRect(node.x - node.clickNodeRadius, node.y + node.clickTextHeight, node.clickNodeRadius * 2, node.clickNodeRadius * 2)
                .endFill();

            shapeMask.graphics
                .beginFill('#000')
                .drawCircle(node.x, node.y, node.clickNodeRadius)
                .closePath();
            shapeText.set({x: node.x, y: node.y + node.clickTextHeight + 10});
            shapeImg.scaleX = node.clickImgScaleX;
            shapeImg.scaleY = node.clickImgScaleY;
            shapeImg.x = node.x - node.clickNodeRadius;
            shapeImg.y = node.y - node.clickNodeRadius;
        } else {
            shapeCircle.graphics
                .clear()
                .setStrokeStyle(5, 'round', 'round')
                .beginStroke('#0084ff')
                .drawCircle(node.x, node.y, node.normalNodeRadius)
                .closePath();

            // console.log(shapeTextBg);
            shapeTextBg.graphics
                .clear()
                .beginFill('rgba(0,147,255,0.5)')
                .drawRect(node.x - node.normalNodeRadius, node.y + node.normalTextHeight, node.normalNodeRadius * 2, node.normalNodeRadius * 2)
                .endFill();

            shapeMask.graphics
                .beginFill('#000')
                .drawCircle(node.x, node.y, node.normalNodeRadius)
                .closePath();

            shapeText.set({x: node.x, y: node.y + node.normalTextHeight + 10});
            shapeImg.scaleX = node.normalImgScaleX;
            shapeImg.scaleY = node.normalImgScaleY;
            shapeImg.x = node.x - node.normalNodeRadius;
            shapeImg.y = node.y - node.normalNodeRadius;
        }

    }



    stage.update();

}

export function pinch(limitWidthMin, limitWidthMax) {
    const canvas = document.querySelector('.relation-map');

    new AlloyFinger(canvas, {
        pinch: function (evt) {

            $('#relation-map-canvas').css({
                'webkit-transition': 'all 0.25s ease-out',
                   transition: 'all 0.25s ease-out'
            });

            const initHeight = $('#relation-map-canvas').height();
            const initWidth = $('#relation-map-canvas').width();

            if (evt.scale > 1 && evt.scale < 1.5 && initWidth < limitWidthMax) {
                setTimeout(function(){
                    $('#relation-map-canvas').css({
                        'height': initHeight * 1.1 + 'px',
                        'width': initWidth * 1.1 + 'px'
                    });
                },500);

            } else if (0.8 < evt.scale && evt.scale < 1 && initWidth > limitWidthMin) {
                setTimeout(function(){
                    $('#relation-map-canvas').css({
                        'height': initHeight * .9 + 'px',
                        'width': initWidth * .9 + 'px'
                    });
                },500);

            }

        }
    });
}

export function detailPaddleDown() {
    $('.detail-tooltip .arrow-font').addClass('icon-arrow-top').removeClass('icon-arrow-bottom');
    $('.detail-tooltip').animate({
        bottom: '-15rem'
    }, 500, 'ease-out');
}

export function detailPaddleUp(roleName, name, text, img){
    fillContent(roleName, name, text, img);
    $('.detail-tooltip .arrow-font').addClass('icon-arrow-bottom').removeClass('icon-arrow-top');
    $('.detail-tooltip').animate({
        bottom: '0'
    }, 500, 'ease-out');
}

export function recommendPaddleUp() {

    $('.recommend-tooltip .arrow-font').addClass('icon-arrow-bottom').removeClass('icon-arrow-top');
    $('.recommend-tooltip').animate({
        bottom: '0'
    }, 500, 'ease-out');

}

export function recommendPaddleDown() {

    $('.recommend-tooltip .arrow-font').addClass('icon-arrow-top').removeClass('icon-arrow-bottom');
    $('.recommend-tooltip').animate({
        bottom: '-9.5rem'
    }, 500, 'ease-out');
}

export function setRecommendUp() {
    $('.detail-tooltip').css('z-index', '1');
    $('.recommend-tooltip').css('z-index', '2');
}

export function setRecommendDown() {
    $('.detail-tooltip').css('z-index', '2');
    $('.recommend-tooltip').css('z-index', '1');
}

$(document).ready(()=>{



    $('.recommend-tooltip .arrow, .recommend-tooltip-title').on('click', (e) => {

        let arrowParent = document.querySelector('.recommend-tooltip .arrow');
        let arrowUp = document.querySelector('.recommend-tooltip .icon-arrow-top');


        if($.contains(arrowParent, arrowUp)) {
            recommendPaddleUp();
        } else {
            recommendPaddleDown();
        }
    });

    $('.detail-tooltip .arrow').on('click', (e) => {

        let arrowParent = document.querySelector('.detail-tooltip .arrow');
        let arrowDown = document.querySelector('.detail-tooltip .icon-arrow-bottom');


        if($.contains(arrowParent, arrowDown)) {
            detailPaddleDown();
            recommendPaddleDown();
            setRecommendUp();
        }
    });

    $('.relation-map').on('touchmove', (e) => {

        detailPaddleDown();
        recommendPaddleDown();
        setRecommendUp();
    });



    //判断手机横竖屏状态：
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (window.orientation === 180 || window.orientation === 0) {
            $('.landscape').hide();
        }
        if (window.orientation === 90 || window.orientation === -90 ){
            $('.landscape').show();
        }
    }, false);
    //移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。
    if (window.orientation === 90 || window.orientation === -90 ){
        $('.landscape').show();
    }
});