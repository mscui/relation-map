import '/node_modules/zepto/src/zepto.js';
import '/node_modules/zepto/src/event.js';
import '/node_modules/zepto/src/touch.js';
import '/node_modules/zepto/src/fx.js';

import domEvent from 'dom-event.es';

const popularNode = [{
    src: '/static/image/1.jpeg',
    id: '1',
    pos: '1',
    role: '1',
    name: '1'
},{
    src: '/static/image/4.jpeg',
    id: '145',
    pos: '145',
    role: '2',
    name: '145'
},{
    src: '/static/image/4.jpeg',
    id: '1454',
    pos: '1454',
    role: '2',
    name: '1454'
},{
    src: '/static/image/4.jpeg',
    id: '1555',
    pos: '1555',
    role: '2',
    name: '1555'
},{
    src: '/static/image/4.jpeg',
    id: '1332',
    pos: '1332',
    role: '2',
    name: '1332'
},{
    src: '/static/image/4.jpeg',
    id: '1334',
    pos: '1334',
    role: '2',
    name: '1334'
}];
const roleText = {
    '1': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1',
        roleName: '1',
        src: '/static/image/1.jpeg'
    },
    '11': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '11',
        roleName: '11',
        src: '/static/image/2.jpeg'
    },
    '12': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '12',
        roleName: '12',
        src: '/static/image/3.jpeg'
    },
    '13': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '13',
        roleName: '13',
        src: '/static/image/4.jpeg'
    },
    '14': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '14',
        roleName: '14',
        src: '/static/image/4.jpeg'
    },
    '15': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '15',
        roleName: '15',
        src: '/static/image/4.jpeg'
    },
    '16': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '16',
        roleName: '16',
        src: '/static/image/4.jpeg'
    },
    '122': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '122',
        roleName: '122',
        src: '/static/image/4.jpeg'
    },
    '133': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '133',
        roleName: '133',
        src: '/static/image/4.jpeg'
    },
    '1332': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1332',
        roleName: '1332',
        src: '/static/image/4.jpeg'
    },
    '156': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '156',
        roleName: '156',
        src: '/static/image/4.jpeg'
    },
    '15556': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '15556',
        roleName: '15556',
        src: '/static/image/4.jpeg'
    },
    '15551': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '15551',
        roleName: '15551',
        src: '/static/image/1.jpeg'
    },
    '1555': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1555',
        roleName: '1555',
        src: '/static/image/4.jpeg'
    },
    '155': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '155',
        roleName: '155',
        src: '/static/image/1.jpeg'
    },
    '1455': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1455',
        roleName: '1455',
        src: '/static/image/1.jpeg'
    },
    '145': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '145',
        roleName: '145',
        src: '/static/image/1.jpeg'
    },
    '1454': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1454',
        roleName: '1454',
        src: '/static/image/1.jpeg'
    },
    '144': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '144',
        roleName: '144',
        src: '/static/image/1.jpeg'
    },
    '14544': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '14544',
        roleName: '14544',
        src: '/static/image/1.jpeg'
    },
    '1443': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1443',
        roleName: '1443',
        src: '/static/image/1.jpeg'
    },
    '1334': {
        text: '这个段落，在源代码中包含许多行，但是浏览器。忽略了它们，这个段落，在源代码中包含。许多行但是浏览器忽略了它们。段落的行数依赖于浏览器窗口的大小。如果调节浏览器窗口的大小，将改变段落中的行数。',
        name: '1334',
        roleName: '1334',
        src: '/static/image/1.jpeg'
    }
}
const manifest = [{
    src: '/static/image/1.jpeg',
    id: '1',
    pos: '1',
    role: '1',
    name: '1'
},{
    src: '/static/image/2.jpeg',
    id: '11',
    pos: '11',
    role: '2',
    name: '11'
},{
    src: '/static/image/3.jpeg',
    id: '12',
    pos: '12',
    role: '2',
    name: '12'
},{
    src: '/static/image/4.jpeg',
    id: '13',
    pos: '13',
    role: '2',
    name: '13'
},{
    src: '/static/image/1.jpeg',
    id: '14',
    pos: '14',
    role: '2',
    name: '14'
},{
    src: '/static/image/2.jpeg',
    id: '15',
    pos: '15',
    role: '2',
    name: '15'
},{
    src: '/static/image/4.jpeg',
    id: '16',
    pos: '16',
    role: '2',
    name: '16'
},{
    src: '/static/image/4.jpeg',
    id: '122',
    pos: '122',
    role: '2',
    name: '122'
},{
    src: '/static/image/4.jpeg',
    id: '133',
    pos: '133',
    role: '2',
    name: '133'
},{
    src: '/static/image/4.jpeg',
    id: '155',
    pos: '155',
    role: '2',
    name: '155'
},{
    src: '/static/image/4.jpeg',
    id: '145',
    pos: '145',
    role: '2',
    name: '145'
},{
    src: '/static/image/4.jpeg',
    id: '156',
    pos: '156',
    role: '2',
    name: '156'
},{
    src: '/static/image/4.jpeg',
    id: '144',
    pos: '144',
    role: '2',
    name: '144'
},{
    src: '/static/image/4.jpeg',
    id: '1454',
    pos: '1454',
    role: '2',
    name: '1454'
},{
    src: '/static/image/4.jpeg',
    id: '1555',
    pos: '1555',
    role: '2',
    name: '1555'
},{
    src: '/static/image/4.jpeg',
    id: '1332',
    pos: '1332',
    role: '2',
    name: '1332'
},{
    src: '/static/image/4.jpeg',
    id: '1455',
    pos: '1455',
    role: '2',
    name: '1455'
},{
    src: '/static/image/4.jpeg',
    id: '14544',
    pos: '14544',
    role: '2',
    name: '14544'
},{
    src: '/static/image/4.jpeg',
    id: '1443',
    pos: '1443',
    role: '2',
    name: '1443'
},{
    src: '/static/image/4.jpeg',
    id: '15551',
    pos: '15551',
    role: '2',
    name: '15551'
},{
    src: '/static/image/4.jpeg',
    id: '15556',
    pos: '15556',
    role: '2',
    name: '15556'
},{
    src: '/static/image/4.jpeg',
    id: '1334',
    pos: '1334',
    role: '2',
    name: '1334'
}];

const linesData = [{
    source: '1',
    target: '11',
    pos: '1',
    relation: '朋友',
    isCore: true
},{
    source: '1',
    target: '12',
    pos: '2',
    relation: '朋友',
    isCore: true
},{
    source: '1',
    target: '13',
    pos: '3',
    relation: '朋友',
    isCore: true
},{
    source: '1',
    target: '14',
    pos: '4',
    relation: '朋友',
    isCore: true
},{
    source: '1',
    target: '15',
    pos: '5',
    relation: '朋友',
    isCore: true
},{
    source: '1',
    target: '16',
    pos: '6',
    relation: '朋友',
    isCore: true
},{
    source: '12',
    target: '122',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '13',
    target: '133',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '133',
    target: '1332',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '14',
    target: '145',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '15',
    target: '155',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '15',
    target: '145',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '144',
    target: '145',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '144',
    target: '1443',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '1443',
    target: '1334',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '145',
    target: '1454',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '1454',
    target: '14544',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '1454',
    target: '144',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '145',
    target: '1455',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '155',
    target: '1555',
    pos: '5',
    relation: '朋友',
    isCore: false
},{
    source: '155',
    target: '1455',
    pos: '4',
    relation: '朋友',
    isCore: false
},{
    source: '155',
    target: '145',
    pos: '3',
    relation: '朋友',
    isCore: false
},{
    source: '1555',
    target: '15556',
    pos: '6',
    relation: '朋友',
    isCore: false
},{
    source: '15556',
    target: '15551',
    pos: '2',
    relation: '朋友',
    isCore: false
},{
    source: '15551',
    target: '1555',
    pos: '1',
    relation: '朋友',
    isCore: false
},{
    source: '156',
    target: '15',
    pos: '3',
    relation: '朋友',
    isCore: false
}];

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

const canvasHeight = 1104;
const canvasWidth = 1242;

function viewport() {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
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

    // console.log(ratio);
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

/*function smoothScroll(el, toX, toY, duration) {

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

    console.log(toX + ',' + toY);
}*/

$(document).on('scrollToCenter', function(){

    // var screenHeight = view.height;
    // var screenWidth = view.width;

    // smoothScroll($(window), screenWidth / 2, screenHeight / 2, 1000);


    // 获取主角坐标, 除以2是因为在最开始的时候canvas有一个2倍的缩放
    let x = nodeSet.nodes[1].x / 2;
    let y = nodeSet.nodes[1].y / 2;

    // 主角在整个画面的哪个位置
    let ratioX = 0.75;
    let ratioY = 0.3;

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

        let coreRadius = nodeSet.nodes[manifest[0].id].radius;

        let restRadius = nodeSet.nodes[manifest[1].id].radius;

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

        linesData.map((item, index)=>{

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
    }
}
class Nodes {
    constructor(item) {
        this.nodes = {};
    }
    drawNode(queue) {

        let tyre = queue.getResult(manifest[0].id);

        let image = new createjs.Bitmap(tyre);

        for (let i in this.nodes) {

            let tyre = queue.getResult(this.nodes[i].id);

            // 图片缩放成屏幕适应宽高，图片更清晰
            let image = new createjs.Bitmap(tyre);

            image.x = this.nodes[i].x;
            image.y = this.nodes[i].y;

            image.scaleX = this.nodes[i].radius * 2 / image.getBounds().width;
            image.scaleY = this.nodes[i].radius * 2 / image.getBounds().height;

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
                item.x = canvasWidth * 2 * 0.6;
                item.y = canvasHeight * 2 * 0.3;

                item.isRender = true;
            } else {
                // 不是主角且没有被分配位置
                if (!item.isRender) {

                    item.x = center.x + r * Math.sin(angleSet[pos].angle);
                    item.y = center.y + r * Math.cos(angleSet[pos].angle);

                    item.isRender = true;
                }
            }

            // console.log('nodex' + i + ':' + item.x);
            // console.log('nodey' + i + ':' +item.y);
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
            // .drawCircle(node.x + node.radius, node.y + node.radius, node.radius)
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
        text.set({x: node.x, y: node.y + node.textHeight + 5});
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

        stage.update();
    }
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(roleText[e.target.parent.parent.id].text);

        // let image = this.children[0];
        // let shapeCircle = this.children[1];
        // let shapeTextBg = this.children[2];

        // console.log(this.children);

        // shape.graphics
        //     .clear()
        //     .beginStroke('#de452a')
        //     .setStrokeStyle(5, 'round', 'round')
        //     .drawCircle(image.radius, image.radius + image.y, image.radius)
        //     .closePath();

        // shapeTextBg.graphics
        //     .clear()
        //     .beginFill('rgba(222,69,42,0.5)')
        //     .drawRect(image.x, image.y + image.textHeight, image.radius * 2, image.radius * 2)
        //     .endFill();

        // stage.update();

        let roleName = roleText[e.target.parent.parent.id].roleName;
        let name = roleText[e.target.parent.parent.id].name;
        let text = roleText[e.target.parent.parent.id].text;
        let img = roleText[e.target.parent.parent.id].src;

        domEvent.detailPaddleUp(roleName, name, text, img);
        domEvent.recommendPaddleDown();
        domEvent.setRecommendDown();

    }
    newNodes() {

        // let x = 0;
        // let y = 0;

        manifest.map((item, index)=>{

            let node = new Node(item);

            // x += 100;

            switch(item.role) {
                case '1':
                    // node.x = 300;
                    // node.y = 300;
                    node.radius = view.width * 0.22;
                    node.fontSize = '24px Arial';
                    // 根据页面宽度设置文字覆盖范围
                    if (view.width >= 320 & view.width < 340) {
                        node.textHeight = 20;
                    } else if (view.width >= 340) {
                        node.textHeight = 40;
                    }
                    break;
                case '2':
                    // node.x = x;
                    // node.y = y;
                    node.radius = view.width * 0.16;
                    node.fontSize = '20px Arial';
                    if (view.width >= 320 & view.width < 340) {
                        node.textHeight = 10;
                    } else if (view.width >= 340) {
                        node.textHeight = 30;
                    }
                    break;
            }

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
        this.queue.loadManifest(manifest);
    }
    handleComplete() {


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
        domEvent.renderListTpl(popularNode, nodeSet);

    }
}

class Ticker {
    addEvent() {
        createjs.Touch.enable(stage);
        stage.enableMouseOver(10);
        // createjs.Ticker.addEventListener('tick', this.tick);
        createjs.Ticker.addEventListener('tick', stage);

        // createjs.Ticker.paused = 1;  //在函数任何地方调用这个，则会暂停tick里面的处理
        // createjs.Ticker.paused = 0;  //恢复游戏
    }
    tick(e) {
        // if (e.paused !== 1) {
        //     //处理
        //     // stage.update();  //刷新舞台
        //     // 理想的帧频率是 60FPS
        //     // createjs.Ticker.setFPS(60);
        //     // 设置成 requestAnimationFrame 模式
        //     // createjs.Ticker.timingMode = createjs.Ticker.RAF;
        // } else {}
        console.log('ss');
        stage.update();
    }
}

function stop() {
    // 防止内容区域滚到底后引起页面整体的滚动
    var content = document.querySelector('.relation-map');
    var startY;
    content.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
    content.addEventListener('touchmove', function (e) {
        // 高位表示向上滚动
        // 底位表示向下滚动
        // 1容许 0禁止
        var status = '11';
        var ele = this;
        var currentY = e.touches[0].clientY;
        if (ele.scrollTop === 0) {
            // 如果内容小于容器则同时禁止上下滚动
            status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
        } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
            // 已经滚到底部了只能向上滚动
            status = '10';
        }
        if (status != '11') {
            // 判断当前的滚动方向
            var direction = currentY - startY > 0 ? '10' : '01';
            // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
            if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                stopEvent(e);
            }
        }
    });
}

$('document').ready(()=>{

    let queue = new Queue();
    // let tick = new Ticker();

    scaleCanvas();


    queue.loadItem();

    // tick.addEvent();
});