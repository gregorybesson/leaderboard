/*******************************************************************************************************************
*  ___   _                  ___                                _     _   _   _     _   _   _   _     _             *
* | _ \ | |  __ _   _  _   / __|  _ _   ___   _  _   _ _    __| |   | | | | | |_  (_) | | (_) | |_  (_)  ___   ___ *
* |  _/ | | / _` | | || | | (_ | | '_| / _ \ | || | | ' \  / _` |   | |_| | |  _| | | | | | | |  _| | | / -_) (_-< *
* |_|   |_| \__,_|  \_, |  \___| |_|   \___/  \_,_| |_||_| \__,_|    \___/   \__| |_| |_| |_|  \__| |_| \___| /__/ *
*                   |__/                                                                                           *
********************************************************************************************************************/
var PG_U = PG_U || {};

/**
 * Test if an object is not null
 * @param {Object} el, object to test
 * @param {Object} optional, optional  parameter to check if the tested object is not null and not equal to this parameter
 */
PG_U.notNull = function (el, optional)
{
    if(optional !== null && optional !== undefined) return (el !== null && el !== undefined && el !== optional);
    return (el !== null && el !== undefined);
};

/**
 * Return element from 
 * @param {Object} selector, ID or TAG name
 */
PG_U.getElement = function (selector)
{
    this.el = (selector.charAt(0) == "#") ? document.getElementById(selector) : document.getElementsByTagName(selector);
    this.append = function (tag, content)
    {
        if (document.createTextNode){
            var newElm = document.createElement(content);
            this.el.appendChild(newElm);
        }
    };
    return this;
};

/****************************************************************************************************************************
*  ___   _                  ___                                _      ___   _   _                _         _     ___   ___  *
* | _ \ | |  __ _   _  _   / __|  _ _   ___   _  _   _ _    __| |    / __| | | (_)  ___   _ _   | |_      /_\   | _ \ |_ _| *
* |  _/ | | / _` | | || | | (_ | | '_| / _ \ | || | | ' \  / _` |   | (__  | | | | / -_) | ' \  |  _|    / _ \  |  _/  | |  *
* |_|   |_| \__,_|  \_, |  \___| |_|   \___/  \_,_| |_||_| \__,_|    \___| |_| |_| \___| |_||_|  \__|   /_/ \_\ |_|   |___| *
*                   |__/                                                                                                    *
*****************************************************************************************************************************/
var PG_C = PG_C || {};

PG_C.route = {
    server : 'http://localhost:8333/'
};

PG_C.register = function (api_key)
{
    this.api_key = api_key;
};

PG_C.isAllowed = function ()
{
    if(!PG_U.notNull(this.api_key)) throw new Error('Use register() to register your API kye first');
    return PG_U.notNull(this.api_key);
};

PG_C.ajaxObject = function (url, callbackFunction)
{
    if(!PG_C.isAllowed()) return;
    var that = this;
    this.updating = false;
    this.abort = function ()
    {
        if (that.updating) {
            that.updating = false;
            that.AJAX.abort();
            that.AJAX = null;
        }
    };
    this.update = function(passData, postMethod)
    {
        if (that.updating) return false;
        
        that.AJAX = null;
        
        if (window.XMLHttpRequest) that.AJAX = new XMLHttpRequest();              
        else that.AJAX = new ActiveXObject("Microsoft.XMLHTTP");
        
        if (that.AJAX == null) return false;   
        else {
            that.AJAX.onreadystatechange = function ()
            {
                if (that.AJAX.readyState == 4) {             
                    that.updating = false;                
                    that.callback(that.AJAX.responseText, that.AJAX.status, that.AJAX.responseXML);
                    that.AJAX = null;
                }
            };
            that.updating = new Date();
            if (/post/i.test(postMethod)) {
                var uri = urlCall + '?' + that.updating.getTime();
                that.AJAX.open("POST", uri, true);
                that.AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                //that.AJAX.setRequestHeader("Content-Length", passData.length);
                that.AJAX.send(passData);
            } else {
                var uri = urlCall + '?' + passData + '&timestamp=' + (that.updating.getTime());
                that.AJAX.open("GET", uri, true);
                that.AJAX.send(null);
            }
            return true;
        }
    };
    var urlCall = url;
    this.callback = callbackFunction || function () { };
};

PG_C.ajax = function (obj, success, error)
{
    if(!PG_C.isAllowed()) return;
    if(!PG_U.notNull(obj) || !PG_U.notNull(obj.url)) throw new Error("Missing url parameter using function ajax()");
    
    var myRequest = new PG_C.ajaxObject(obj.url, function (p1, p2, p3)
    {
        if(p2 == 200 && PG_U.notNull(success)) success(p1, p2, p3);
        else error(p1, p2, p3);
    });
    
    if(PG_U.notNull(obj.data)) {
        var str = '', key;
        for (key in obj.data) {
            if(str != "") str += "&";
            str += key + "=" + obj.data[key] ;
        };
        myRequest.update(str, 'POST');
    }
};

PG_C.send = function (container, action, user)
{
    if(!PG_C.isAllowed()) return;
    
    PG_C.ajax (
        {
            url : PG_C.route.server + 'update',
            data : {
                username : user,
                apiKey : this.api_key,
                points : 10
            }
        },
        function ()
        {
            console.log('++++++++++++++++++++++++++++++++++++++++ 1');
        },
        function ()
        {
            console.log('++++++++++++++++++++++++++++++++++++++++ 2');
        }
    );
};


/*
var addEvent = (function () {
   var filter = function(el, type, fn) {
      for ( var i = 0, len = el.length; i < len; i++ ) {
         addEvent(el[i], type, fn);
      }
   };
   if ( document.addEventListener ) {
      return function (el, type, fn) {
         if ( el && el.nodeName || el === window ) {
            el.addEventListener(type, fn, false);
         } else if (el && el.length) {
            filter(el, type, fn);
         }
      };
   }
 
   return function (el, type, fn) {
      if ( el && el.nodeName || el === window ) {
         el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if ( el && el.length ) {
         filter(el, type, fn);
      }
   };
})();
 
// usage
addEvent( document.getElementsByTagName('a'), 'click', fn);
*/
