var dataJson = require('data_ren.js');
var Force = require('ball.js');
require('/node_modules/zepto/src/zepto.js');
require('/node_modules/zepto/src/event.js');
require('/node_modules/zepto/src/touch.js');
require('/node_modules/zepto/src/fx.js');

function smoothScroll(el, toX, toY, duration) {

    if (duration < 0) {
        return;
    }
    var differenceY = toY - $(window).scrollTop();
    var perTickY = differenceY / duration * 10;

    var differenceX = toX - $(window).scrollLeft();
    var perTickX = differenceX / duration * 10;

    setTimeout(function() {
        if (!isNaN(parseInt(perTickX, 10)) && !isNaN(parseInt(perTickY, 10))) {
            window.scrollTo($(window).scrollLeft() + perTickX, $(window).scrollTop() + perTickY);
            smoothScroll(el, toX, toY, duration - 10);
        }
    }, 10);
}

function viewport() {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
}
function scaleCanvas() {

    var view = viewport();
    var ratio = 4;
    canvas.style.height = view.height * 2 + 'px';
    canvas.style.width = view.width * 2 + 'px';
    // canvas.setAttribute('width', view.width * ratio);
    // canvas.setAttribute('height', view.height * ratio);
    canvas.setAttribute('width', view.width * ratio);
    canvas.setAttribute('height', view.height * ratio);
}
// polyfill 提供了这个方法用来获取设备的 pixel ratio
var getPixelRatio = function (context) {
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

var raf;

var ratio = getPixelRatio(ctx);
var scale = 2;
var fontSize = 10;
var paddingCicle = 3;
var marginText = 40;
var flag = false;
var centerWrapRadius = 90;
var nodeWrapRadius = 60;

var NodeDrawFunc = {
    clear: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
};
/*画图*/
Force.draw = function (params) {

    var graph = this.graph = (params && params.graph) ? params.graph : new Force.Graph();
    var nodeFont = "16px Verdana, sans-serif";
    var edgeFont = "8px Verdana, sans-serif";
    var stiffness = (params && params.stiffness) ? params.stiffness : 200.0;
    var repulsion = (params && params.repulsion) ? params.repulsion : 200.0;
    var damping = (params && params.damping) ? params.damping : 0.5;
    var minEnergyThreshold = (params && params.minEnergyThreshold) ? params.minEnergyThreshold : 0.00001;
    var nodeSelected = (params && params.nodeSelected) ? params.nodeSelected : null;
    var nodeImages = {};
    var edgeLabelsUpright = true;
    var layout = this.layout = new Force.Layout.ForceDirected(graph, stiffness, repulsion, damping, minEnergyThreshold);


    var data = dataJson.data;
    var link = dataJson.link;

    var nodeData = {};

    nodeSelected = function(node) {
        console.log('Node selected: ' + JSON.stringify(node.data));
    };

    // 格式化Node节点
    for (var id in data){
        nodeData[id] = graph.newNode({
            label: data[id].name,
            src: data[id].img,
            query: data[id].query,
            id: data[id].id,
            name: data[id].name,
            role: data[id].role,
            color: 'blue',
            radius: id === 0 ? centerWrapRadius : nodeWrapRadius

        });

    };

    // 格式化连线
    link.forEach(function(item) {
        graph.newEdge(nodeData[item.source], nodeData[item.target], {
            color: '#00A0B0',
            relation: item.relation,
            radius: nodeWrapRadius
        });
    });


    // calculate bounding box of graph layout.. with ease-in
    var currentBB = layout.getBoundingBox();
    var targetBB = {
        bottomleft: new Force.Vector(-2, -2),
        topright: new Force.Vector(2, 2)
    }

    // auto adjusting bounding box
    window.requestAnimationFrame(function adjust() {
        targetBB = layout.getBoundingBox();
        // current gets 20% closer to target every iteration
        currentBB = {
            bottomleft: currentBB.bottomleft.add( targetBB.bottomleft.subtract(currentBB.bottomleft)
                .divide(10)),
            topright: currentBB.topright.add( targetBB.topright.subtract(currentBB.topright)
                .divide(10))
        };

        window.requestAnimationFrame(adjust);
    });

    // convert to/from screen coordinates
    var toScreen = function(p) {
        var size = currentBB.topright.subtract(currentBB.bottomleft);
        var sx = p.subtract(currentBB.bottomleft).divide(size.x).x * canvas.width;
        var sy = p.subtract(currentBB.bottomleft).divide(size.y).y * canvas.height;
        return new Force.Vector(sx, sy);
    };
    var fromScreen = function(s) {
        var size = currentBB.topright.subtract(currentBB.bottomleft);
        // canvas缩放比例
        var ratio = 2;
        // var px = (s.x / (canvas.width / ratio)) * size.x + currentBB.bottomleft.x;
        // var py = (s.y / (canvas.height / ratio)) * size.y + currentBB.bottomleft.y;
        var px = (s.x / canvas.width) * size.x + currentBB.bottomleft.x;
        var py = (s.y / canvas.height) * size.y + currentBB.bottomleft.y;
        return new Force.Vector(px, py);
    };

    // half-assed drag and drop
    var selected = null;
    var nearest = null;
    var dragged = null;

    // half-assed drag and drop
    var selectedLine = null;
    var nearestLine = null;

    $(canvas).on('click', function(e) {

        var pos = $(this).offset();

        // var p = fromScreen({x: e.pageX - pos.left, y: e.pageY - pos.top});
        var p = fromScreen({x: e.pageX, y: e.pageY});

        selected = nearest = dragged = layout.nearest(p);

        if (selected.node !== null) {
            dragged.point.m = 10000.0;

            if (nodeSelected) {
                nodeSelected(selected.node);
            }
        }

        selectedLine = nearestLine = layout.nearestLine(p);

        renderer.start();
    });

    var renderer = this.renderer = new Force.Renderer(layout, NodeDrawFunc.clear, function drawEdge(edge, p1, p2){
        var s = {
            x: toScreen(p1).x,
            y: toScreen(p1).y
        };
        var d = {
            x: toScreen(p2).x,
            y: toScreen(p2).y
        };
        var lineLength = Math.round(Math.sqrt( Math.pow(d.x - s.x, 2) + Math.pow(d.y - s.y, 2)));
        // if (edge.source.data.role === 'core') {
        //     s.x = 500;
        //     s.y = 400;
        // } else if (edge.target.data.role === 'core') {
        //     d.x = 500;
        //     d.y = 400;
        // }
        // 绘制链接线条
        ctx.beginPath();
        ctx.strokeStyle = "#eee";
        ctx.lineWidth = 2;
        // ctx.setLineDash([10, fontSize]);
        // ctx.lineDashOffset = -15;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'destination-over';
        ctx.moveTo(s.x, s.y);
        // ctx.lineTo(d.x, d.y);
        ctx.lineTo(d.x - (edge.data.radius / lineLength) * (d.x - s.x) * 1.2, d.y - (edge.data.radius / lineLength) * (d.y - s.y) * 1.2);
        ctx.stroke();

        // 绘制关系说明框
        ctx.beginPath();
        var text = edge.data.relation;
        var padding = 20;
        var textWidth = ctx.measureText(text).width;
        var tooltipWidth = textWidth * ratio + padding;
        var textHeight = fontSize * 3;

        var beginX = Math.max(s.x, d.x) - Math.abs(s.x - d.x) / 2 - tooltipWidth / 2;
        var beginY = Math.max(s.y, d.y) - Math.abs(s.y - d.y) / 2 - textHeight / 2;

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

        var nodeLT = {
            x: x1,
            y: y1
        };
        var nodeRT = {
            x: x1 + tooltipWidth,
            y: y1
        };
        var nodeLB = {
            x: x1,
            y: y1 + textHeight
        };
        var nodeRB = {
            x: x1 + tooltipWidth,
            y: y1 + textHeight
        };
        edge.data.relationPos = {
            xlt: fromScreen(nodeLT).x,
            ylt: fromScreen(nodeLT).y,
            xrt: fromScreen(nodeRT).x,
            yrt: fromScreen(nodeRT).y,
            xlb: fromScreen(nodeLB).x,
            ylb: fromScreen(nodeLB).y,
            xrb: fromScreen(nodeRB).x,
            yrb: fromScreen(nodeRB).y,
        };


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
        ctx.translate(d.x - (edge.data.radius / lineLength) * (d.x - s.x) * 1.2, d.y - (edge.data.radius / lineLength) * (d.y - s.y) * 1.2);
        ctx.rotate(Math.atan2(d.y - s.y, d.x - s.x));
        ctx.beginPath();
        ctx.moveTo(-arrowLength, arrowWidth);
        ctx.lineTo(0, 0);
        ctx.lineTo(-arrowLength, -arrowWidth);
        ctx.lineTo(-arrowLength * 0.8, -0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    },function drawNode(node, p) {

        var x = toScreen(p).x;
        var y = toScreen(p).y;
        // 绘制图片
        ctx.save();

        ctx.beginPath();

        // if (node.data.role === 'core') {
        //     x = 500;
        //     y = 400;
        // }
        ctx.arc(x, y, node.data.radius, 0, 2*Math.PI);
        ctx.clip();
        // void ctx.drawImage(image, dx, dy, dWidth, dHeight);
        ctx.drawImage(node.data.img, x - node.data.radius, y - node.data.radius, node.data.radius * 2, (node.data.imgHeight / node.data.imgWidth) * 2 * node.data.radius);
        ctx.closePath();

        // 绘制名字底图
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x - node.data.radius, y + marginText - 15 - fontSize / 2, node.data.radius * ratio, node.data.radius);

        // 绘制名字文本
        ctx.fillStyle = '#fff';
        ctx.font = fontSize * scale + "px sans-serif, microsoft YaHei";
        ctx.textAlign = "center";
        ctx.fillText(node.data.name, x, y + marginText + fontSize / 2);
        ctx.closePath();

        ctx.restore();

        // 绘制圆形外边框
        ctx.beginPath();
        switch(node.data.role) {
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
        // ctx.arc(x, y, node.data.radius + paddingCicle, 0, 2*Math.PI / 4, true);
        ctx.arc(x, y, node.data.radius + paddingCicle, 0, 2*Math.PI, true);
        ctx.stroke();
        ctx.closePath();
    });

    renderer.start();
}

$(document).ready(function(){

    var screenHeight = document.documentElement.clientHeight;
    var screenWidth = document.documentElement.clientWidth;

    $(document).trigger('scrollToCenter');
});

$(document).on('scrollToCenter', function(){

    var screenHeight = document.documentElement.clientHeight;
    var screenWidth = document.documentElement.clientWidth;

    smoothScroll($(window), screenWidth/2, screenHeight/2, 200);

});

scaleCanvas();
Force.draw();

// start();