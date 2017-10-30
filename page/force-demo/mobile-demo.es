var dataJson = require('data_langhua.js');

var offset = 0;

// polyfill 提供了这个方法用来获取设备的 pixel ratio
var getPixelRatio = function(context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var view = viewport();
// var x = 50;
// var y = 50;
var ratio = getPixelRatio(ctx);
var scale = 2;
var fontSize = 12;
var paddingCicle = 3;
var marginText = 40;
var flag = false;
var centerWrapRadius = 90;
var nodeWrapRadius = 60;
var centerX = view.width * ratio / 2 - centerWrapRadius;
var centerY = view.height * ratio / 2 - centerWrapRadius;
var chooseItem = {
    query: '',
    id: ''
};
var data = dataJson.data;
var link = dataJson.link;
var totalPosData = {
    picNode: [],
    line: []
};

canvas.addEventListener('click', function(e) {
    var p = getEventPosition(e);

    totalPosData.picNode.forEach(function (d) {

        if(inNode(d, p)) {
            console.log(d.query);
        }
    });
}, false);

function getEventPosition(ev){
    //注：使用上面这个函数，需要给Canvas元素的position设为absolute。
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {
        x: x,
        y: y
    };
}
function inNode(d, loc) {
    ctx.beginPath();
    ctx.arc(d.x + d.wrapRadius, d.y + d.wrapRadius, d.wrapRadius, 0, 2 * Math.PI, false);
    ctx.closePath();
    if (ctx.isPointInPath(loc.x * ratio, loc.y * ratio)) {
        console.log(loc.x, loc.y);
        return true;
    }
}
function drawPicNode() {
    // 人物头像
    // ctx.clearRect(0, 0, view.width, view.height);
    totalPosData.picNode.forEach(function(v) {

        // 绘制图片
        ctx.save();

        ctx.beginPath();
        // console.log(v.x + v.wrapRadius);
        ctx.arc(v.x + v.wrapRadius, v.y + v.wrapRadius, v.wrapRadius, 0, 2*Math.PI);
        ctx.clip();
        // void ctx.drawImage(image, dx, dy, dWidth, dHeight);
        ctx.drawImage(v.img, v.x, v.y, v.wrapRadius * 2, (v.imgHeight / v.imgWidth) * 2 * v.wrapRadius);
        ctx.closePath();

        // 绘制名字底图
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(v.x, v.y + v.wrapRadius + marginText - 15, v.wrapRadius * ratio, v.wrapRadius);

        // 绘制名字文本
        ctx.fillStyle = '#fff';
        ctx.font = fontSize * scale + "px sans-serif, microsoft YaHei";
        ctx.textAlign = "center";
        ctx.fillText(v.name, v.x + v.wrapRadius, v.y + v.wrapRadius * 3/2 + marginText - fontSize - 15 / 2);
        ctx.closePath();

        ctx.restore();

        // 绘制圆形外边框
        ctx.beginPath();
        switch(v.role) {
            case 'friend':
                ctx.strokeStyle = "#f0f";
                break;
            case 'like':
                ctx.strokeStyle = "#00f";
                break;
            case 'college':
                ctx.strokeStyle = "#ff0";
                break;
            case 'core':
                ctx.strokeStyle = "#f00";
                break;

        }
        ctx.lineWidth = 3;
        // ctx.arc(v.x + v.wrapRadius, v.y + v.wrapRadius, v.wrapRadius + paddingCicle, 0, 2*Math.PI / 4, true);
        ctx.arc(v.x + v.wrapRadius, v.y + v.wrapRadius, v.wrapRadius + paddingCicle, 0, 2*Math.PI, true);
        ctx.stroke();
        ctx.closePath();


    });

}
function drawLink(data) {
    // source, target, relation



    totalPosData.line.forEach(function(v) {
        // debugger;

        var s = {
            x: data[v.source].x,
            y: data[v.source].y
        };
        var d = {
            x: data[v.target].x,
            y: data[v.target].y
        };
        var lineLength = Math.round(Math.sqrt( Math.pow(d.x - s.x, 2) + Math.pow(d.y - s.y, 2)));

        // 绘制链接线条
        ctx.beginPath();
        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 2;
        // ctx.setLineDash([10, fontSize]);
        // ctx.lineDashOffset = -15;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'destination-over';
        ctx.moveTo(s.x + v.wrapRadius, s.y + v.wrapRadius);
        // ctx.lineTo(d.x + v.wrapRadius, d.y + v.wrapRadius);
        ctx.lineTo(d.x + v.wrapRadius - (v.wrapRadius / lineLength) * (d.x - s.x) * 1.2, d.y + v.wrapRadius - (v.wrapRadius / lineLength) * (d.y - s.y) * 1.2);
        ctx.stroke();

        // 绘制关系说明框
        ctx.beginPath();
        var text = v.relation;
        var padding = 20;
        var textWidth = ctx.measureText(text).width;
        var tooltipWidth = textWidth * ratio + padding;
        var textHeight = fontSize * 3;

        var beginX = Math.max(s.x, d.x) + v.wrapRadius - Math.abs(s.x - d.x) / 2 - tooltipWidth / 2;
        var beginY = Math.max(s.y, d.y) + v.wrapRadius - Math.abs(s.y - d.y) / 2 - textHeight / 2;

        // console.log(beginX);
        // console.log(beginY);
        // console.log(lineLength);
        var x1 = beginX;
        var y1 = beginY;

        var radius = 18;

        ctx.moveTo(beginX, beginY + radius);
        ctx.fillStyle = '#333';
        ctx.globalCompositeOperation = 'source-over';
        ctx.arcTo(x1, y1, x1 + tooltipWidth, y1, radius);
        ctx.arcTo(x1 + tooltipWidth, y1, x1 + tooltipWidth, y1 + textHeight, radius);
        ctx.arcTo(x1 + tooltipWidth, y1 + textHeight, x1, y1 + textHeight, radius);
        ctx.arcTo(x1, y1 + textHeight, x1, y1, radius);
        ctx.fill();
        ctx.closePath();


        // 绘制关系文本
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.font = fontSize * scale + "px m sans-seri, icrosoft YaHef";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        ctx.fillText(text, x1 + padding / 2, y1);
        ctx.restore();

        // arrow
        var arrowWidth = 1 + ctx.lineWidth;
        var arrowLength = 8;
        ctx.save();
        ctx.fillStyle = '#333';
        ctx.translate(d.x + v.wrapRadius - (v.wrapRadius / lineLength) * (d.x - s.x) * 1.2, d.y + v.wrapRadius - (v.wrapRadius / lineLength) * (d.y - s.y) * 1.2);
        ctx.rotate(Math.atan2(d.y - s.y, d.x - s.x));
        ctx.beginPath();
        ctx.moveTo(-arrowLength, arrowWidth);
        ctx.lineTo(0, 0);
        ctx.lineTo(-arrowLength, -arrowWidth);
        ctx.lineTo(-arrowLength * 0.8, -0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();


    })
}
function scaleCanvas() {
    canvas.style.height = view.height + 'px';
    canvas.style.width = view.width + 'px';
    canvas.setAttribute('width', view.width * ratio);
    canvas.setAttribute('height', view.height * ratio);
}
function draw(node, index) {


        var img = new Image();

        img.onload = function () {
            var imgScale = 4/5;
            var imgHeight = img.height * imgScale;
            var imgWidth = img.width * imgScale;
            var wrapRadius = index === 0 ? centerWrapRadius : nodeWrapRadius;

            // console.log(imgHeight);
            scaleCanvas();

            ctx.clearRect(0, 0, view.width, view.height);

            totalPosData.picNode.push({
                img: img,
                x: node.x,
                y: node.y,
                view: view,
                query: node.query,
                imgWidth: imgWidth,
                imgHeight: imgHeight,
                wrapRadius: wrapRadius,
                name: node.name,
                role: node.role
            });
            drawPicNode(node);

            link.forEach(function(item, index) {
                totalPosData.line.push({
                    target: item.target,
                    source: item.source,
                    wrapRadius: wrapRadius,
                    relation: item.relation
                });
            });
            drawLink(data);

        }
        img.src = node.img;
}

function viewport() {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    }
}
window.onload = function() {
    for(var i in data){
        draw(data[i]);
    }
}

