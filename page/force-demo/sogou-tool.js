var KmapTools = (function () {
    var version = '0.0.10',
        isHttps = location.protocol.toLowerCase() === 'https:',
        protocol = location.protocol,
        httpsImgDomain = 'https://img.store.sogou.com/',
        that = {};

    that.getImgLink = function(src) {
//      if (!src) {
//          return '';
//      }
//      return isHttps ? src.replace(/https?:\/\/[^\/]+\//, httpsImgDomain) : src;
        return httpsUtil.getCdnImgLink(src);
    };
    that.getResouceUrl = function(src){
        if(!src){
            return ''
        }
        return isHttps ? src.replace(/^\s*http/, 'https') : src;
    }

    return that;
})();

var httpsUtil = (function(){
    var isHttps = location.protocol.toLowerCase() == "https:";
    function hashCode(str){
        var hash = 0;
        if (str.length == 0) return hash;
        var hashChar;
        for (var i = 0; i < str.length; i++) {
            hashChar = str.charCodeAt(i);
            hash = ((hash<<5)-hash) + hashChar;
            hash = hash & hash;
        }
        return hash;
    }
    function getCdnImgLink(imgSrc){
        if(!imgSrc) return "";
        //返回原图的几种情况：
        //1. 不是https协议 2. 图片本身是相对路径 3. 图片本身是https协议
        if(!isHttps || imgSrc.indexOf("http://") == -1 ||imgSrc.indexOf("https://") == 0)
            return imgSrc;
        var cycle = Math.abs(hashCode(imgSrc) % 4) + 1;
        var cdnHost = "https://img0" + cycle + ".sogoucdn.com",
            regex1 = /^\s*http:\/\/www\.sogou\.com/g,
            regex2 = /^\s*http:\/\/img\d*\.sogoucdn\.com/g,
            regex3 = /^\s*http:\/\/img\d*\.store\.sogou\.com/g,
            regex4 = /^\s*http:\/\/imgstore\d*\.cdn\.sogou\.com/g,
            regex5 = /^\s*http:\/\/cmc\.imgstore\.cdn\.sogou\.com/g,
            regex6 = /^\s*http:\/\/pic\d*\.sogoucdn\.com/g;
        if(regex1.test(imgSrc)){
            return imgSrc.replace(regex1, "");
        }else if(regex2.test(imgSrc)){
            return imgSrc.replace(regex2, cdnHost);
        }else if(regex3.test(imgSrc)){
            return imgSrc.replace(regex3, cdnHost);
        }else if(regex4.test(imgSrc)){
            return imgSrc.replace(regex4, cdnHost);
        }else if(regex5.test(imgSrc)){
            return imgSrc.replace(regex5, cdnHost);
        }else if(regex6.test(imgSrc)){
            return imgSrc.replace(regex6, cdnHost);
        }else{ //第三方图片
            //第三方的图片
            return cdnHost + "/v2/thumb?t=2&url="+encodeURIComponent(imgSrc)+"&appid=200580";
        }
    }

    function getPingbackHost(){
        if(isHttps)
            return "https://pb.sogou.com";
        else
            return "http://pb.sogou.com";
    }

    function getWebCdnHost(){
        if(isHttps)
            return "https://dlweb.sogoucdn.com";
        else
            return "http://dl.web.sogoucdn.com";
    }

    function getUrl (url){
        var ret = url;
        if(url){
            var el = document.createElement("a");
            el.href = url;
            ret = el.href;
            var reg = /https?:/i
            ret = ret.replace(reg, location.protocol.toLowerCase());
            el = null;
        }
        return ret;
    }

    function transformUrl (){
        var arr = ['/reventondc/transform?key=' + window.encodeURIComponent(window["oldQuery"]), 'uuid=' + window["uuid"], 'type=2'];
        var i, item, key, value;
        var obj = {};
        for(i=0; i<arguments.length; i++){
            item = arguments[i];
            if(typeof item == "string"){
                i == 0 && (obj.objid = item);
                i == 1 && (obj.userarea = item);
                i == 2 && (obj.url = item);
                i == 3 && (obj.charset = item);
            }
            else if(typeof item == "object"){
                for(key in item){
                    obj[key] = item[key];
                }
            }
        }
        if(!isHttps) return obj.url;
        for(key in obj){
            value = obj[key];
            arr.push(key + "=" + (value ? window.encodeURIComponent(value) : value));
        }
        return arr.join("&");
    }
    return {
        isHttps : isHttps,
        getCdnImgLink : getCdnImgLink,
        getPingbackHost : getPingbackHost,
        getWebCdnHost : getWebCdnHost,
        getUrl: getUrl,
        transformUrl: transformUrl
    }
})();
