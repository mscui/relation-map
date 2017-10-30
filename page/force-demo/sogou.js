(function(){
    var uid = (function uuid() {
        return new Date().getTime()*1000 + Math.round(Math.random()*1000);
    }());
    var $d = document;

    var view = viewport();

    function RelList(person){
        this.person = person;
        this.mainBody = $s('kmap-rel-more');
        this.button = $s('kmap-rel-button');
        this.ul = $s('kmap-rel-ul');
        this.exchangeButton = $s('kmap-rel-exchange');
        this.list = [];
        this.index = 0;
        this.mainBody.style.display = '';
        this.ul.style.width = view.width - 13 + 'px';

        var that = this;
        this.button.onclick = function(){
            if(that.mainBody.className.indexOf('rel-more-close') > -1){
                that.mainBody.className = 'rel-more';
                pingback('wap_tupu', {
                    subtype: 'person',
                    uigs_cl: 'unfold'
                }, true);
            }else{
                that.mainBody.className = 'rel-more rel-more-close';
                pingback('wap_tupu', {
                    subtype: 'person',
                    uigs_cl: 'fold'
                }, true);
            }
            return false;
        };
        this.exchangeButton.onclick = function(){
            that.exChange();
            pingback('wap_tupu', {
                subtype: 'person',
                uigs_cl: 'exchange'
            }, true);
        };
    }
    RelList.prototype.render = function(data){
        this.list = data;
        this.index = 0;
        this.exChange();
    };
    RelList.prototype.exChange = function(){
        if(this.index >= this.list.length){
            this.index = 0;
        }
        var lis = this.ul.getElementsByTagName('li');
        for(var i = 0; i < 4; i++){
            var li = lis[i],
            item = this.list[this.index + i];
            li.innerHTML = '';
            if(item){
                var that = this,
                aTag = $c('a', li),
                span = $c('span', aTag),
                p = $c('p', aTag),
                img = $c('img', span);
                aTag.id = item.id;
                aTag.name = item.name;
                img.src = KmapTools.getImgLink(item.img);
                p.innerHTML = item.name;
                aTag.onclick = function(){
                    var id = this.id,
                    name = this.name;
                    that.person.render(id, name, 'map', true);
                    pingback('wap_tupu', {
                        subtype: 'person',
                        uigs_cl: 'hot_person'
                    }, true);
                }
            }
        }
        this.index += 4;
    };
    RelList.prototype.hide = function(){
        this.mainBody.className = 'rel-more rel-more-close';
    };
    RelList.prototype.show = function(){
        this.mainBody.className = 'rel-more';
    };
    RelList.prototype.isHide = function(){
        return this.mainBody.className.indexOf('rel-more-close') > -1;
    };

    function CanvasMap(person){
        this.person = person;
        this.canvas = $s('main-canvas');
        this.context = $s('main-canvas').getContext('2d');
        this.colors = ['#f29796', '#5b92fa', '#8bc63a'];  //爱、亲、友
        this.scale = view.width / 360 > 1.05 ? 1.05 : view.width / 360;
        this.gData = {};
        this.nodeMap = {};
        this.mainNode = null;
        this.ratio = getPixelRatio(this.context);

        var that = this;
        this.width = parseInt(view.width);
        this.height = parseInt(view.height) - 50;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.width *= this.ratio;
        this.height *= this.ratio;
        this.scale *= this.ratio;
        this.canvas.setAttribute('width',this.width);
        this.canvas.setAttribute('height',this.height);
        this.canvas.onclick = function(e){
            if (!that.gData || !that.gData.nodes) {
                return;
            }
            var loc = windowToCanvas(that.canvas, e.clientX, e.clientY, that.ratio);
            e.preventDefault();
            that.gData.nodes.forEach(function (d) {
                if (inNode(that.context, d, loc)) {
                    if (d == that.mainNode) {
                        //showDesc(d);
                    } else {
                        that.person.render(d.id, d.name);
                        pingback('wap_tupu', {
                            subtype: 'person',
                            uigs_cl: 'node'
                        }, true);
                    }
                }
            });
        }
    }
    CanvasMap.prototype.render = function(data){
        this.gData = this.processData(data);
        this.calPos();
        this.draw();
    };
    CanvasMap.prototype.processData = function(data){
        var nodeMap = {}, mainNode = null, nodes = [], links = [];
        if(typeof data == 'string'){
            try {
                data = JSON.parse(data);
            } catch (e) {
                data = {};
            }
        }

        if (!data || !data.nodes || !data.nodes.length || !data.links || !data.links.length) {
            return data;
        }
        //r:35-80
        for (var i in data.nodes) {
            if(nodes.length > 8){
                break;
            }
            var node = data.nodes[i];
            if (node.level != 0 && node.level != 1) {
                continue;
            }
            node.image = new Image();
            node.img = KmapTools.getImgLink(node.img);
            node.image.src = node.img;
            nodeMap[node.id] = node;
            if (node.level == 0) {
                mainNode = node;
            }
            node.shown = true;
            nodes.push(node);
        }
        if (!mainNode) {
            mainNode = data.nodes[0];
        }
        for (var i in data.links) {
            var link = data.links[i], from = nodeMap[link.from], to = nodeMap[link.to];
            if (!from || !to || from != mainNode) {
                continue;
            }
            from.links = from.links || [];
            from.links.push(link);
            from.neighbors = from.neighbors || [];
            from.neighbors.push(to);
            to.type = link.type;
            link.level = 1;
            links.push(link);
        }
        for (var i in nodes) {
            nodes[i].r = 29 * this.scale;
        }
        mainNode.r = 43 * this.scale;
        this.nodeMap = nodeMap;
        this.mainNode = mainNode;
        return {nodes: nodes, links: links};
    };
    CanvasMap.prototype.calPos = function(){
        if (!this.mainNode) {
            return;
        }
        var n = this.mainNode.neighbors.length, angle, r = 140 * this.scale;

        this.mainNode.x = this.canvas.width / 2;    //center
        this.mainNode.y = this.canvas.height / 2 - (this.person.relList.isHide() ? 15 * this.scale : 50 * this.scale);
        if (n == 0) {
            return;
        }
        angle = Math.PI*2/n;
        for (var i in this.mainNode.neighbors) {
            var node = this.mainNode.neighbors[i];
            node.angle = angle * i;
            node.xSpace = r;
            node.ySpace = r*this.mainNode.y/this.mainNode.x;
            node.x = this.mainNode.x + Math.round(node.xSpace * Math.cos(node.angle));
            node.y = this.mainNode.y - Math.round(node.ySpace * Math.sin(node.angle));
        }
    };
    CanvasMap.prototype.draw = function(){
        if (!this.gData) {
            return;
        }
        this.canvas.width = this.canvas.width;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draw nodes
        var nodes = [], links = this.gData.links;
        nodes.push(this.mainNode);
        if (!this.mainNode || !this.mainNode.neighbors || !this.mainNode.neighbors.length) {
            return;
        }
        for (var i in this.mainNode.neighbors) {
            var neighbor = this.mainNode.neighbors[i];
            if (neighbor) {
                nodes.push(neighbor);
            }
        }
        for (var i in nodes) {
            var node = nodes[i];
            if (!node.shown) {
                continue;
            }
            var nodeColor = this.colors[node.type];
            if (node.image.height) {
                drawNode(this.context, node, nodeColor, this.ratio);
            } else {
                node.image.onload = function(ctx, d, color, ratio) {
                    return function() {
                        drawNode(ctx, d, color, ratio);
                    }
                }(this.context, node, nodeColor, this.ratio);
            }
        }

        //draw lines
        for (var i in links) {
            var link = links[i], from = this.nodeMap[link.from], to = this.nodeMap[link.to];
            if (from && to && from == this.mainNode) {
                drawLink(this.context, link, from, to, this.colors[link.type], 2, this.ratio);
            }
        }
    };

    function PersonRel(id, name, history){
        this.relList = new RelList(this);
        this.canvasMap = new CanvasMap(this);
        this.backButton = $s('kmap-rel-back');
        this.historyList = [];
        this.curObj = null;
        /*if(view.height/view.width < 1.5 && view.width < 375){
            this.relList.hide();
        }else{
            this.relList.show();
        }*/
        try{
            history = JSON.parse(decodeURIComponent(history));
        }catch(e){
            history = ''
        }
        if(history && history instanceof Array){
            this.historyList = history;
        }

        this.render(id, name);

        var that = this;
        this.backButton.onclick = function(){
            that.render();
            pingback('wap_tupu', {
                subtype: 'person',
                uigs_cl: 'back'
            }, true);
        };
    }
    PersonRel.prototype.render = function(id, name, type, flag){
        var that = this;
        if(typeof id == 'undefined' && typeof name == 'undefined'){
            var item = this.historyList.pop();
            if(!item){
                return;
            }
            id = item.id;
            name = item.name;
        }else{
            this.curObj && this.historyList.push(this.curObj);
        }
        if(flag){
            this.historyList = [];
        }
        getData (name, id, function(data){
            data = JSON.parse(data);
            if(type == 'map'){
                that.canvasMap.render(data);
            }else if(type == 'list'){
                that.relList && that.relList.render(data.recommenders || []);
            }else{
                that.canvasMap.render(data);
                that.relList && that.relList.render(data.recommenders || []);
            }
            that.curObj = {id: id, name:name};
            var urlls = [];
            if(name){
                urlls.push('q=' + encodeURIComponent(name));
            }
            if(id){
                urlls.push('id=' + id);
            }
            if(that.historyList && that.historyList.length > 0){
                urlls.push('history=' + encodeURIComponent(JSON.stringify(that.historyList)));
            }
            window.history.replaceState(id, name, '?' + urlls.join('&'));
            if(that.historyList && that.historyList.length > 0){
                that.backButton.style.display = '';
            }else{
                that.backButton.style.display = 'none';
            }
        });
    };

    function init(){
        var presonRel;
        if(view.width < view.height){
            presonRel = new PersonRel(getPara('id'), getPara('q'), getPara('history'));
        }
        window.addEventListener('resize', function(){
            view = viewport();
            if(view.width < view.height && !presonRel){
                presonRel = new PersonRel(getPara('id'), getPara('q'), getPara('history'));
            }
        }, false);
        pingback('wap_tupu', {
            subtype: 'person'
        });
    }
    init();

    //tools
    /*function pushState(id, name){
     if(history.pushState){
     var url = '?name=' + encodeURIComponent(name) + '&id=' + id;
     history.pushState(id || name, 'kmap-person-wap', url);
     }
     }*/
    function getPara(p) {
        var paras = window.location.toString().split('?');
        if (!paras[1]) {
            return null;
        }
        paras = paras[1].split('#')[0];
        paras = paras.split('&');
        for (var i in paras) {
            var para = (paras[i] || '').split('=');
            if (para[0] == p) {
                return decodeURIComponent(para[1]);
            }
        }
        return null;
    }
    function viewport() {
        // 当前文档的渲染模式：backcompat 混杂模式 || CSS1Compat 标准规范模式
        var e = $d.compatMode == 'BackCompat' ? 'body' : 'documentElement';
        return { width : $d[e].clientWidth, height : $d[e].clientHeight };
    }
    function getData (name, id, suc, error) {
        ajax({
            type: 'GET',
            url: '/kmap',
            async: true,
            dataType: 'text',
            data: {'query':name, 'from':'relation', 'id':id || ''},
            success: function(data) {
                if (data) {
                    data = data.substring(0, data.lastIndexOf('}')+1);
                    suc(data);
                }
            },
            error: error || function() {
            }
        });
    }
    function ajax (options) {
        try {
            var xhr, timer;
            if (window.XMLHttpRequest) {    // code for IE7+, Firefox, Chrome, Opera, Safari
                xhr = new XMLHttpRequest();
            } else {    // code for IE6, IE5
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            if (!xhr) return;
            options = options || {};
            var type = (!options.type || options.type == 'GET') ? 'GET' : 'POST',
            async = options.async === undefined ? true : !!options.async,
            dataType = (!options.dataType || options.dataType == 'text') ? 'text' : 'xml';
            if (async) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        clearTimeout(timer);
                        if (xhr.status == 200) {
                            typeof options.success === 'function' && options.success(dataType == 'text' ? xhr.responseText : xhr.responseXML);
                        } else {//if (xhr.status == 404) {
                            typeof options.error === 'function' && options.error(xhr.statusText);
                        }
                    }
                }
            }
            if (typeof options.timeout === 'number') {
                timer = setTimeout(function() {
                    xhr.abort();
                    typeof options.error === 'function' && options.error('timeout');
                }, options.timeout);
            }
            if (type == 'GET') {
                xhr.open('GET', getParaFromJson(options.data, options.url), async);
                xhr.send();
            } else {
                xhr.open('POST', options.url, async);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(getParaFromJson(options.data));
            }
        } catch(e) {}
    }
    function getParaFromJson (data, url) {
        if (typeof data === 'object') {
            url = url ? url + (url.indexOf('?') > 0 ? '' : '?') : '';
            var params = [];
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    params.push(k + '=' + encodeURIComponent(data[k]));
                }
            }
            return url + params.join('&');
        }
        return url || '';
    }
    function drawLink(ctx, link, from, to, color, lineWidth, ratio) {
        var fx = from.x, fy = from.y, tx = to.x, ty = to.y, fr = from.r, tr = to.r,
        l = Math.sqrt((fx-tx)*(fx-tx)+(fy-ty)*(fy-ty));
        fr += 4*ratio;
        tr += 4*ratio;
        var nfx = fx + (tx-fx)*fr/l, nfy = fy + (ty-fy)*fr/l,
        ntx = tx - (tx-fx)*tr/l, nty = ty - (ty-fy)*tr/l;
        ctx.beginPath();
        ctx.lineWidth = lineWidth*ratio;
        ctx.strokeStyle = color;
        ctx.moveTo(nfx, nfy);
        ctx.lineTo(ntx, nty);
        ctx.closePath();
        ctx.stroke();

        var cx = fx + tx + (fr-tr) * (tx-fx) / l,
        cy = fy + ty + (fr-tr) * (ty-fy) / l;
        cx /= 2;
        cy /= 2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 11*ratio + 'px Microsoft Yahei';
        var w = ctx.measureText(link.name).width + 10*ratio;
        ctx.fillStyle = color;
        var x0 = cx-w/ 2, y0 = cy-10*ratio, r0 = 9*ratio;
        ctx.moveTo(x0 + r0, y0);
        ctx.arc(x0 + r0, y0 + r0, r0, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.lineTo(x0 + w - r0, y0 + 2 * r0);
        ctx.arc(x0 + w - r0, y0 + r0, r0, 0.5 * Math.PI, 1.5 * Math.PI, true);
        ctx.lineTo(x0 + r0, y0);
        ctx.fill();
        //ctx.fillRect(cx-w/2, cy-10, w, 18);
        ctx.fillStyle = 'white';
        ctx.fillText(link.name, cx, cy - 0.5 * ratio);
    }
    function drawNode(ctx, d, color, ratio) {
        if(!color){
            var mainImg = $s('kmap-rel-main-img'),
            br = 5*ratio;
            ctx.drawImage(mainImg, 0, 0, mainImg.width, mainImg.height, d.x-d.r - br, d.y-d.r - br, 2*d.r+2*br, 2*d.r+2*br);
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r + 1*ratio, 0, 2 * Math.PI, true);
        ctx.clip();
        ctx.closePath();
        var hg = Math.min(d.image.height, d.image.width),
        wh = hg;
        if(Math.abs(d.image.height - d.image.width)/d.image.width < 0.1){
            hg = d.image.height;
            wh = d.image.width;
        }
        if (d.image.height > 10) {
            ctx.drawImage(d.image, 0, 0, wh, hg, d.x-d.r, d.y-d.r, 2*d.r, 2*d.r);
        } else {
            ctx.fillStyle = '#14101c';
            ctx.fillRect(d.x-d.r, d.y-d.r, 2*d.r, 2*d.r);
        }

        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.font = 10*ratio + 'px Microsoft Yahei';
        var w = ctx.measureText('何').width/2 + 12*ratio;
        ctx.fillRect(d.x-d.r, d.y+d.r-w, d.r*2, w);
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(d.name, d.x, d.y+d.r-w+1*ratio);

        ctx.restore();

        drawRing(ctx, d, d.r, 2*ratio, '#ffffff');
        color && drawRing(ctx, d, d.r+2*ratio, 2.5*ratio, color, 0, -2 * Math.PI * 0.75);
    }

    function drawRing (ctx, d, r, width, color, start, end) {
        var start = start || 0,
        end = end || 2 * Math.PI;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.arc(d.x, d.y, r + width*0.5, start, end, true);
        ctx.stroke();
        ctx.closePath();
    }
    function windowToCanvas (canvas, x, y, ratio) {
        var bbox = canvas.getBoundingClientRect();
        return { x: (x - bbox.left * (canvas.width / (bbox.width*ratio)))*ratio,
            y: (y - bbox.top * (canvas.height / (bbox.height*ratio)))*ratio };
    }
    function inNode(context, d, loc) {
        if (!d.shown) {
            return false;
        }
        context.beginPath();
        context.arc(d.x, d.y, d.r, 0, Math.PI * 2, true);
        context.closePath();
        if (context.isPointInPath(loc.x, loc.y)) {
            return true;
        }
        return false;
    }
    function $s(id) {
        return $d.getElementById(id);
    }
    function $c(tag_name, obj, cname){
        var tmp = $d.createElement(tag_name);
        if (obj){
            obj.appendChild(tmp);
        }
        if (cname){
            tmp.className = cname;
        }
        return tmp;
    }
    function getPixelRatio(context) {
        var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 2) / backingStore;
    }
    function pingback(type, params, isCl){
        var url = ['https://pb.sogou.com/pv.gif?uigs_productid=kmap&type='],
        uuid = '',
        oldQuery;
        if(isCl){
            url = ['https://pb.sogou.com/cl.gif?uigs_productid=kmap&type='];
        }
        url.push(type);
        if(uid){
            url.push('&uid=' + uid);
        }
        oldQuery = getPara('q');
        if(oldQuery){
            url.push('&gbkQuery=' + encodeURIComponent(oldQuery));
        }
        url.push('&referrer=' + encodeURIComponent(document.referrer));
        if(params && typeof params == 'object'){
            for(var key in params){
                if(params.hasOwnProperty(key)){
                    url.push('&' + key + '=' + encodeURIComponent(params[key]));
                }
            }
        }
        (new Image()).src = url.join('');
    }
}());