import '/node_modules/zepto/src/zepto.js';
import '/node_modules/zepto/src/event.js';
import '/node_modules/zepto/src/touch.js';
import '/node_modules/zepto/src/fx.js';

import domEvent from 'dom-event.es';
// import data from 'data.js';
import data from 'miyuezhuan_data.js';

const Angle = Math.PI / 6;
const angleSet = {
    1: {
        angle: Angle * 5
    },
    2: {
        angle: Angle * 3
    },
    3: {
        angle: Angle
    },
    4: {
        angle: Angle * 11
    },
    5: {
        angle: Angle * 9
    },
    6: {
        angle: Angle * 7
    }
}

let nodeSet = null;
let edgeSet = null;

const canvas = document.getElementById('relation-map-canvas');
const ctx = canvas.getContext('2d');
const stage = new createjs.Stage(canvas, false, false);
const view = viewport();

const canvasHeight = 250 * data.level;
const canvasWidth = 250 * data.level;

const startYPos = 400;

function viewport() {

    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;

    if (width > 414) {
        // 为了适配ipad
        width = 414;
        height = 736;
    }
    return {
        width: width,
        height: height
    };
}

function scaleCanvas() {

    let ratio = getPixelRatio(ctx);

    // let ratio = 4;

    // let height = view.height * ratio;
    // let width = view.width * ratio;

    let height = canvasHeight;
    let width = canvasWidth;

    canvas.style.height = height + 'px';
    canvas.style.width = width + 'px';
    canvas.setAttribute('width', width * 2);
    canvas.setAttribute('height', height * 2);

}

// polyfill 提供了这个方法用来获取设备的 pixel ratio
function getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
};

$(document).on('scrollToCenter', function(){


    // 获取主角坐标, 除以2是因为在最开始的时候canvas有一个2倍的缩放
    let x = nodeSet.nodes[1].x / 2;
    let y = nodeSet.nodes[1].y / 2;

    // 主角在整个画面的哪个位置
    let ratioX = data.mainRoleXRatio + 0.05;
    let ratioY = 0.1;

    $('.relation-map').scrollLeft(x * ratioX);
    $('.relation-map').scrollTop(y * ratioY);

});
class Edge {
    constructor() {
        this.source = null;
        this.target = null;
        this.relation = '';
        this.isCore = false;
    }
}
class Edges {
    constructor() {
        this.edges = {};
    }
    drawEdge() {

        let container = new createjs.Container();

        let coreRadius = nodeSet.nodes[data.manifest[0].id].radius;

        let restRadius = nodeSet.nodes[data.manifest[1].id].radius;

        let circleRadius = 10;

        for (let i in this.edges) {
            let item = this.edges[i];


            let r = item.isCore ? coreRadius : restRadius;

            console.log(item.isCore);
            let thresholdX = r * Math.sin(angleSet[+item.pos].angle) * 0.15;
            let thresholdY = r * Math.cos(angleSet[+item.pos].angle) * 0.15;
            let circleX = Math.min(item.source.x, item.target.x) + Math.abs(item.source.x - item.target.x) / 2 + thresholdX;
            let circleY = Math.min(item.source.y, item.target.y) + Math.abs(item.source.y - item.target.y) / 2 + thresholdY;

            let line = new createjs.Shape();

            // console.log(item);

            let text = new createjs.Text(item.relation, '28px Arial', '#0084ff');
            let textWidth = text.getBounds().width;
            let textHeight = text.getBounds().height;
            let textpadding = 15;
            let textX = circleX + textpadding;
            let textY = circleY - textHeight / 2;



            container.addChild(text);

            switch(item.pos) {
                case '1':
                    break;
                case '2':

                    textX = circleX - textWidth / 2;
                    textY = circleY + textHeight / 2;
                    break;
                case '3':
                    break;
                case '4':
                    break;
                case '5':
                    textX = circleX - textWidth / 2;
                    textY = circleY + textHeight / 2;
                    break;
                case '6':

                    break;
            }

            text.set({x: textX, y: textY});

            line.graphics.setStrokeStyle(4, 'round', 'round')
                .beginStroke('#0084ff')
                .moveTo(item.source.x, item.source.y)
                .lineTo(item.target.x, item.target.y)
                .closePath();

            container.addChild(line);

            let lineCircle = new createjs.Shape();


            lineCircle.graphics
                .beginFill('#0084ff')
                .drawCircle(circleX, circleY, circleRadius)
                .closePath();

            container.addChild(lineCircle);
            stage.addChild(container);
        }

        stage.update();
    }
    newEdges() {

        data.linesData.map((item, index)=>{

            let edge = new Edge();
            edge.source = nodeSet.nodes[+item.source];
            edge.target = nodeSet.nodes[+item.target];
            edge.relation = item.relation;
            edge.pos = item.pos;
            edge.isCore = item.isCore;

            this.edges[index] = edge;
        });
    }
}
class Node {
    constructor(item) {
        this.role = item ? item.role : '';
        this.x = 0;
        this.y = 0;
        this.isRender = false;
        this.src = item ? item.src : '';
        this.id = item ? item.id : '';
        this.pos = item ? item.pos : '';
        this.role = item ? item.role : '';
        this.name = item ? item.name : '';
        this.crossOrigin = 'Anonymous';
        this.container = null;
    }
}
class Nodes {
    constructor(item) {
        this.nodes = {};
    }
    drawNode(queue) {

        // let tyre = queue.getResult(data.manifest[0].id);

        // let image = new createjs.Bitmap(tyre);

        for (let i in this.nodes) {

            let tyre = queue.getResult(this.nodes[i].id);

            // 图片缩放成屏幕适应宽高，图片更清晰
            let image = new createjs.Bitmap(tyre);

            image.x = this.nodes[i].x;
            image.y = this.nodes[i].y;

            image.scaleX = this.nodes[i].radius * 2 / image.getBounds().width;
            image.scaleY = this.nodes[i].radius * 2 / image.getBounds().height;



            this.nodes[i].normalImgScaleX = this.nodes[i].normalNodeRadius * 2 / image.getBounds().width;
            this.nodes[i].normalImgScaleY = this.nodes[i].normalNodeRadius * 2 / image.getBounds().height;
            this.nodes[i].clickImgScaleX = this.nodes[i].clickNodeRadius * 2 / image.getBounds().width;
            this.nodes[i].clickImgScaleY = this.nodes[i].clickNodeRadius * 2 / image.getBounds().height;

            // 绘制整个node
            this.drawSpin(this.nodes[i], image);
        }

        // this.test(this.nodes[1], image);

    }
    test(node, image) {
    }
    calPos() {

        for (let i in this.nodes) {
            let r = 280;
            let item = this.nodes[i];
            let centerId = item.pos.slice(0, item.pos.length - 1);
            let center = this.nodes[centerId];
            let pos = +item.pos.slice(item.pos.length - 1);

            if (item.role === '1') {
                // 主角

                // console.log(canvas);
                // item.x = view.height * 2;
                // item.y = view.width * 2;
                // 根据整体画布中主角所占区域分配比例
                // item.x = canvasWidth * 2 * 0.6;
                // item.y = canvasHeight * 2 * 0.25;
                item.x = canvasWidth * 2 * data.mainRoleXRatio;
                item.y = startYPos;

                item.isRender = true;
            } else {
                // 不是主角且没有被分配位置
                if (!item.isRender) {

                    item.x = center.x + r * Math.sin(angleSet[pos].angle);
                    item.y = center.y + r * Math.cos(angleSet[pos].angle);

                    item.isRender = true;
                }
            }
        }

    }
    drawSpin(node, image) {

        let spinImageAndText = new createjs.Container();
        let spinBorder = new createjs.Container();
        let spinNodeWrapper = new createjs.Container();

        // 绘制图片
        image.x = node.x - node.radius;
        image.y = node.y - node.radius;
        spinImageAndText.addChild(image);

        // 最外层边框
        let mask = new createjs.Shape();
        let mtx = new createjs.Matrix2D().rotate(1);

        mask.graphics
            .setStrokeStyle(5, 'round', 'round')
            .beginStroke('#0084ff')
            .drawCircle(node.x, node.y, node.radius)
            .closePath();
        spinBorder.addChild(mask);


        //遮罩图形
        let shape = new createjs.Shape();

        shape.graphics
            .beginFill('#000')
            .drawCircle(node.x, node.y, node.radius)
            .closePath();

        // 文字下层底色
        let box = new createjs.Shape();

        box.graphics
            .beginFill('rgba(0,147,255,0.5)')
            .drawRect(node.x - node.radius, node.y + node.textHeight, node.radius * 2, node.radius * 2)
            .endFill();

        spinImageAndText.addChild(box);

        // 文字
        let text = new createjs.Text(node.name, node.fontSize, '#fff');
        text.set({x: node.x, y: node.y + node.textHeight + 10});
        text.textAlign = 'center';

        spinImageAndText.addChild(text);

        // 给图片文字添加遮罩
        spinImageAndText.mask = shape;

        spinImageAndText.on('click', this.handleClick);

        // 用两个Container是为了android机对于mask会产生边距锯齿的问题
        spinNodeWrapper.addChild(spinImageAndText, spinBorder);
        stage.addChild(spinNodeWrapper);

        // 为点击事件可以查找到nodeid
        spinNodeWrapper.id = node.id;


        this.nodes[node.id].container = spinNodeWrapper;

        stage.update();
    }
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(data.roleText[e.target.parent.parent.id].text);


        for (let id in nodeSet.nodes) {
            let node = nodeSet.nodes[id];

            let shapeCircle = node.container.children[1].children[0];
            let shapeImg = node.container.children[0].children[0];
            let shapeTextBg = node.container.children[0].children[1];
            let shapeText = node.container.children[0].children[2];
            let shapeMask = node.container.children[0].mask;


            if (id === e.target.parent.parent.id) {
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

        let roleName = data.roleText[e.target.parent.parent.id].roleName;
        let name = data.roleText[e.target.parent.parent.id].name;
        let text = data.roleText[e.target.parent.parent.id].text;
        let img = data.roleText[e.target.parent.parent.id].src;

        domEvent.detailPaddleUp(roleName, name, text, img);
        domEvent.recommendPaddleDown();
        domEvent.setRecommendDown();

        stage.update();

    }
    newNodes() {

        data.manifest.map((item, index)=>{

            let node = new Node(item);


            switch(item.role) {
                case '1':
                    node.radius = view.width * 0.22;
                    node.fontSize = '24px Arial';
                    // 根据页面宽度设置文字覆盖范围
                    if (view.width >= 320 & view.width < 340) {
                        node.textHeight = 20;
                        node.normalTextHeight = 10;
                        node.clickTextHeight = 20;
                    } else if (view.width >= 340) {
                        node.textHeight = 40;
                        node.normalTextHeight = 15;
                        node.clickTextHeight = 40;
                    }

                    break;
                case '2':
                    node.radius = view.width * 0.16;
                    node.fontSize = '20px Arial';
                    if (view.width >= 320 & view.width < 340) {
                        node.textHeight = 10;
                        node.normalTextHeight = 10;
                        node.clickTextHeight = 20;
                    } else if (view.width >= 340) {
                        node.textHeight = 15;
                        node.normalTextHeight = 15;
                        node.clickTextHeight = 40;
                    }
                    break;
            }

            node.normalNodeRadius = view.width * 0.16;
            node.clickNodeRadius = view.width * 0.22;


            this.nodes[node.id] = node;
        });

        this.calPos();
    }
}

class Queue {
    constructor() {
        this.queue = new createjs.LoadQueue();
    }
    loadItem() {
        this.queue.on('complete', this.handleComplete, this);
        this.queue.loadManifest(data.manifest);
    }
    handleComplete() {

        $('.loading').animate({
            opacity: 0
        }, 500, 'ease-out', () => {
            $('.loading').hide();
        });

        nodeSet = new Nodes();
        edgeSet = new Edges();

        nodeSet.newNodes();
        edgeSet.newEdges();


        // 执行顺序不要变，图画会根据执行顺序绘制折叠关系
        edgeSet.drawEdge();
        nodeSet.drawNode(this.queue);

        // 滑动到主角
        $(document).trigger('scrollToCenter');

        // 渲染底部热门人物图谱
        domEvent.renderListTpl(data.popularNode, nodeSet, stage);

        const limitWidthMax = $('#relation-map-canvas').width() * 1.5;
        const limitWidthMin = $('#relation-map-canvas').width() * .8;

        domEvent.pinch(limitWidthMin, limitWidthMax);

    }
}

$('document').ready(()=>{

    let queue = new Queue();

    scaleCanvas();
    queue.loadItem();

});