var offset = 0;
function draw() {
    var canvas = document.getElementById('tutorial');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // ctx.fillRect(25,25,100,100);
        // ctx.clearRect(45,45,60,60);
        // ctx.strokeRect(50,50,50,50);


        // ctx.beginPath();
        // ctx.moveTo(175, 50);
        // ctx.lineTo(200, 75);
        // ctx.lineTo(200, 25);
        // ctx.fill();

        // // 填充三角形
        // ctx.beginPath();
        // ctx.moveTo(25,25);
        // ctx.lineTo(105,25);
        // ctx.lineTo(25,105);
        // ctx.fill();

        // // 描边三角形
        // ctx.beginPath();
        // ctx.moveTo(125,125);
        // ctx.lineTo(125,45);
        // ctx.lineTo(45,125);
        // ctx.closePath();
        // ctx.stroke();

        //arc(x圆心坐标, y圆心坐标, radius, startAngle, endAngle, anticlockwise)
        //startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。参数anticlockwise 为一个布尔值。为true时，是逆时针方向，否则顺时针方向

        // ctx.beginPath();
        // // ctx.moveTo(200, 200);
        // ctx.arc(200, 200, 20, 0, Math.PI, false);
        // ctx.stroke();

        // quadraticCurveTo(cp1x, cp1y, x, y)
        // 绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
        // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        // 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。

        // ctx.beginPath();
        // ctx.moveTo(75,40);
        // ctx.bezierCurveTo(75,37,70,25,50,25);
        // ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
        // ctx.bezierCurveTo(20,80,40,102,75,120);
        // ctx.bezierCurveTo(110,102,130,80,130,62.5);
        // ctx.bezierCurveTo(130,62.5,130,25,100,25);
        // ctx.bezierCurveTo(85,25,75,37,75,40);
        // ctx.fill();

        // var rectangle = new Path2D();
        // rectangle.rect(10, 10, 50, 50);

        // var circle = new Path2D();
        // circle.moveTo(125, 35);
        // circle.arc(100, 35, 25, 0, 2*Math.PI);

        // ctx.stroke(rectangle);
        // ctx.fill(circle);



        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.setLineDash([10, 5]);
        // ctx.lineDashOffset = -offset;
        // ctx.strokeRect(10, 10, 100, 100);

        // ctx.font = "48px serif";
        // ctx.fillText("Hello World", 10, 50);

        var img = new Image();
        img.onload = function () {
            var imgHeight = img.height;
            var imgWidth = img.width;
            ctx.drawImage(img, 20, 20);
            ctx.beginPath();
            ctx.globalCompositeOperation = 'destination-in';
            // ctx.clearRect(45, 45, 60, 60);
            ctx.arc(20 + imgHeight/2, 20 + imgWidth/2, imgHeight/2, 0, 2*Math.PI);
            ctx.fillStyle = '#033';
            ctx.fill();
        }
        img.src = 'https://img01.sogoucdn.com/app/a/10010016/67590d22e1f7b17df54d9ed7615110c5';

        // ctx.fillRect(0, 0, 300, 300);
        // for (var i=0;i<3;i++) {
        //   for (var j=0;j<3;j++) {
        //     ctx.save();
        //     ctx.strokeStyle = "#9CFF00";
        //     ctx.translate(50+j*100,50+i*100);
        //     drawSpirograph(ctx,20*(j+2)/(j+1),-8*(i+3)/(i+1),10);
        //     ctx.restore();
        //   }
        // }

        // ctx.translate(275, 275);

        // for (var i=1;i<6;i++){ // Loop through rings (from inside to out)
        //   ctx.save();
        //   ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';

        //   for (var j=0;j<i*6;j++){ // draw individual dots
        //     ctx.rotate(Math.PI*2/(i*6));
        //     ctx.beginPath();
        //     ctx.arc(0,i*25,5,0,Math.PI*2,true);
        //     // ctx.fillRect(0, i*50, 25, 25);
        //     ctx.fill();
        //   }

        //   ctx.restore();
        // }

    }
}

// function drawSpirograph(ctx,R,r,O){
//   var x1 = R-O;
//   var y1 = 0;
//   var i  = 1;
//   ctx.beginPath();
//   ctx.moveTo(x1,y1);
//   do {
//     if (i>20000) break;
//     var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72))
//     var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72))
//     ctx.lineTo(x2,y2);
//     x1 = x2;
//     y1 = y2;
//     i++;
//   } while (x2 != R-O && y2 != 0 );
//   ctx.stroke();
// }

// function march() {
//   offset++;
//   if (offset > 16) {
//     offset = 0;
//   }
//   draw();
//   setTimeout(march, 20);
// }


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;
var running = false;

var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

function clear() {
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function(e){
  if (!running) {
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
  }
});

canvas.addEventListener("click",function(e){
  if (!running) {
    raf = window.requestAnimationFrame(draw);
    running = true;
  }
});

canvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);
  running = false;
});

window.onload = function() {
    // draw();
    // march();
    // ball.draw();
    canvas.height = window.outerHeight;
    canvas.width = window.outerWidth;
}