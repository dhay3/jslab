//自定义jq(undefined参数为了区分外界的undefined)
(function (window, undefined) {
    //用赋值的方法
    var cjQuery = function (selector) {
        return new cjQuery.fn.init(selector);
    };
    //原型都是公开的属性和方法
    cjQuery.fn = cjQuery.prototype = {//fn赋值prototype
        constructor: cjQuery,
        //可以传字符串,数组
        init: function (selector) {
            //0.处理传进来的字符串
            selector = cjQuery.trim(selector);
            //1.传入 '' null undefined NaN 0 false 返回空的对象
            if (!selector) {
                // return this;
            }
            //2.传入函数(入口函数)
            else if (cjQuery.isFunction(selector)) {
                cjQuery.ready(selector);
            }
            //2.传入字符串
            else if (cjQuery.isString(selector)) {
                //2.1判断是否时代码片段,最小代码片段<a>长度为3
                if (cjQuery.isHTML(selector)) {
                    //2.1.1创建一个对象
                    var temp = document.createElement("div");//只是创建并没有添加到document中
                    temp.innerHTML = selector;
                    // //2.1.2将创建好的一级元素添加到jquery中
                    // for (var i = 0; i < temp.children.length; i++) {
                    //     this[i] = temp.children[i];//这里的可以用this[0],因为jq对象是一个伪数组,temp.children是一个数组
                    // }
                    // //2.1.3添加一个length属性
                    // this.length = temp.children.length;  temp.children是一个数组
                    [].push.apply(this, temp.children);//数组转伪数组,this就是一个空的object,每一行存一个DOM对象
                    //2.1.4返回加工好jq对象
                    // return this;
                }
                //2.2判断是否是选择器
                else {
                    //2.2.1根据传入的选择器找到对应的元素
                    var res = document.querySelectorAll(selector);
                    //2.2.2将找的元素添加到jq中
                    [].push.apply(this, res);
                    //2.2.3返回加工的this
                    // return this;
                }
            }
            //3.传入数组,真伪数组都是对象,并且有length属性,当selector指的是对象时in是判断属性,数组时判断索引
            else if (cjQuery.isArray(selector)) {
                // //3.1真数组
                // if (Array.isArray(selector)) {//Array.isArray()判断是否是数组
                //     //真数组转伪数组
                //     [].push.apply(this, selector);
                // }
                // //3.2伪数组
                // else {
                //     //将自定义的伪数组转为真数组(伪数组变伪数组最好先调用slice)
                //     var item = [].slice.call(selector);
                //     //在把真数组转为伪数组
                //     [].push.apply(this, item);
                // }
                var item = [].slice.call(selector);//不管是真数组还是伪数组都转为真数组
                [].push.apply(this, item);//再转成jq对象
                // return this;
            }
            //4.除上述情况以外
            else {
                // this[0] = selector;
                // this.length = 1;
                [].push.call(this, selector);
                // return this;
            }
            return this;
        },
        jquery: "1.1.0",
        selector: "",
        length: 0,
        //冒号前的push由cjQuery调用,[].push找到数组的push方法
        push: [].push,
        sort: [].sort,
        slice: [].slice
    };

    //new出来和静态都可以向cjQuery添加键
    cjQuery.extend = cjQuery.prototype.extend = function (obj) {
        for (var key in obj) {
            // this[key] = obj[key];//js与java不一样，this是谁调用就是谁不管静态还是实例
            this[key]= obj[key];//jq对象是键值对,这里的key是字符串不能this.key
        }
    };

    //添加静态方法的键值对
    cjQuery.extend({//通过对象存储方法
        //判断是否是字符串
        isString: function (element) {//静态方法
            return typeof element === "string";
        },
        //判断是否是HTML对象
        isHTML: function (element) {
            return element.charAt(0) === "<" && element.charAt(element.length - 1) === ">" && element.length >= 3;
        },
        //裁剪字符两端空格
        trim: function (element) {
            //如果不是字符串返回自己
            if (!cjQuery.isString(element)) return element;
            //判断浏览器是否支持trim方法
            if (element.trim) {//判断字符串是否支持trim方法,IE8以下的浏览器不支持此方法
                return element.trim();
            } else {//IE8以下浏览器采用
                //^匹配开头字符串,$匹配结尾字符串,g表示全局匹配
                //去左右空格,保留中间空格
                return element.replace(/^\s+|\s+$/g, "");
            }
        },
        //判断是否是对象
        isObject: function (element) {
            return typeof element === "object";
        },
        //判断是否是window
        isWindow: function (element) {
            return element === window;
        },
        //判断是否是数组
        isArray: function (element) {
            return cjQuery.isObject(element) && "length" in element && !cjQuery.isWindow(element);
        },
        //判断是否是函数
        isFunction: function (element) {
            return typeof element === "function";
        },
        //判断DOM的状态
        ready: function (fn) {
            //判断DOM是否加载完毕
            if (document.readyState == "complete") {
                fn();
            } else if (document.addEventListener) {//判读浏览器是否支持addEventListener方法
                document.addEventListener("DOMContentLoaded", function () {
                    fn();
                });
            } else {
                document.attachEvent("onreadystatechange", function () {//IE8以下浏览器调用
                    //如果加载完毕调用回调函数
                    if (document.readyState == "complete") {//readystate(uninitialized,loading,interactive,complete)
                        fn();
                    }
                });
            }
        },
        //遍历
        each: function (obj, fn) {
            if (cjQuery.isArray(obj)) {//如果是数组的话
                for (var i = 0; i < obj.length; i++) {
                    // var res = fn(i, obj[i]);这个this是window对象
                    var res = fn.call(obj[i], i, obj[i]);//让回调函数的this变为value(官方做法)
                    if (res === "true") continue;//如果回调函数放回true执行continue
                    else if (res === "false") break;//如果回调函数返回false执行break
                }
            } else if (cjQuery.isObject(obj)) {//如果不是数组,即是对象或伪数组
                for (var key in obj) {
                    // var res = fn(key, obj[key]);
                    var res = fn.call(obj[key], key, obj[key]);
                    if (res === true) continue;
                    else if (res === false) break;
                }
            }
            return obj;//遍历谁返回谁
        },
        //map返回经过回调函数处理的数组
        map: function (obj, fn) {
            var res = [];//默认返回空数组
            if (cjQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var temp = fn(obj[i], i);
                    if (temp !== undefined)
                        res.push(temp);
                }
            } else if (cjQuery.isObject(obj)) {
                for (var key in obj) {
                    var temp = fn(obj[key], key);
                    if (temp !== undefined)
                        res.push(temp);
                }
            }
            return res;
        },
        //获取元素的style
        getStyle: function (dom, styleName) {
            if (window.getComputedStyle(dom)) {
                return window.getComputedStyle(dom)[styleName];//获取css样式
            } else {//IE8以下获取对象css
                return dom.currentStyle[styleName];
            }
        },
        //添加事件工具类
        addEvent: function (dom, event, fn) {
            if (dom.addEventListener) {
                dom.addEventListener(event, fn);
            } else {//IE8及以下调用
                dom.attachEvent("on" + event, fn);//attachEvent要加on
            }
        }
    });
    cjQuery.prototype.extend({
        //jq对象转数组
        toArray: function () {
            return [].slice.call(this);
        },
        //jq对象转DOM
        get: function (i) {
            //如果没有传参
            if (arguments.length === 0) {//arguments内置对象,方法的实参集合
                return this.toArray();//get()返回数组
            } else if (i >= 0) {//如果i大于等于零
                return this[i];
            } else {//如果i小于零
                return this[this.length + i];
            }
        },
        //获取对应的元素的jq对象
        eq: function (i) {
            // var obj = {};
            // if (arguments.length === 0) {
            //
            // } else if (i >= 0) {
            //     [].push.call(obj, this[i]);
            // } else if (i < 0) {
            //     [].push.call(obj, this[this.length + i]);
            // }
            // return obj;
            if (arguments.length === 0) {
                return cjQuery();//返回一个空的对象,可以没有new因为再函数中new了init()
            } else {//大于零或小于零调用get
                return cjQuery(this.get(i));
            }
        },
        //返回第零个元素
        first: function () {
            return this.eq(0);
        },
        //返回最后一个元素
        last: function () {
            return this.eq(-1);
        },
        //实例中的each
        each: function (fn) {
            return cjQuery.each(this, fn);//遍历this
        },
        //map
        map: function (fn) {
            return cjQuery.map(this, fn);
        },
        //清空对应元素中的内容
        empty: function () {
            // document.querySelectorAll();中要传参数
            this.each(function () {
                //each修改了this,this变成了value(this[index]错误)
                this.innerHTML = "";//
            });
            return this;//这里return this 是为了方便链式编程
        },
        //删除指定对象
        remove: function (selector) {
            var $this = this;
            if (arguments.length === 0) {//如果不传参,删除本生
                this.each(function () {
                    var parent = this.parentNode;//找到对应的父元素
                    parent.removeChild(this);//通过父元素删除指定的元素
                });
            } else {//如果传参删除 找到对应元素中指定的元素
                // $("div").remove("p")错误,$("div").remove(".d")正确,后面的部分和前面的部分标签类型要一样
                $(selector).each(function (key, value) {//根据传入的选择器找到对应的元素
                    var type = value.tagName;//获取标签名
                    $this.each(function (k, v) {
                        var temp = v.tagName;
                        if (temp === type) {//判断找到元素的类型和指定元素的类型是否匹配
                            var parent = value.parentNode;
                            if (parent === null) return true;
                            parent.removeChild(value);//删除selector选中的元素
                        }
                    });
                });
            }
            // return $this;
        },
        //修改指定元素中的html
        html: function (selector) {
            if (arguments.length === 0) {//不传参返回第一个元素的内容
                return this[0].innerHTML;
            } else {
                this.each(function () {
                    this.innerHTML = selector;//传入标签会变成标签
                });
                return this;
            }
        },
        //修改指定元素中的文本内容
        text: function (selector) {
            var str = "";
            if (arguments.length === 0) {//不传参返回指定元素的所有text
                this.each(function () {
                    str += this.innerText;//innerText包括了this中子级元素的text
                });
                return str;
            } else {
                this.each(function () {
                    this.innerText = selector//包括this中子级的元素,(替换是不会自动找到标签替换),例如:<p></p>还是文本
                });
                return this;
            }
        },
        //将指定元素添加指定元素末尾
        appendTo: function (selector) {
            var res = [];
            var source = this;
            var target = $(selector);
            target.each(function (index, value) {
                source.each(function () {
                    if (index === 0) {//官方的appendTo会把文档中存在的删除并加入to中的每一个元素
                        value.appendChild(this);//如果是第一个元素就把source加入到target中
                    } else {
                        //要拿克隆出来的操作否则对第一中this操作
                        var cl = this.cloneNode(true);//true表示克隆包括标签中的内容,false表示只克隆标签
                        value.appendChild(cl);//appendChild()只能传一个对象
                    }
                    res.push(this);
                });
            });
            return $(res);//返回一共添加的jq对象
        },
        //将指定元素添加到指定元素开头,selector被当成选择器
        prependTo: function (selector) {
            var res = [];
            var source = this;
            var target = $(selector);
            target.each(function (index, value) {
                source.each(function () {
                    if (index === 0) {
                        value.insertBefore(this, value.firstChild);
                    } else {
                        var cl = this.cloneNode(true);
                        value.insertBefore(this, value.firstChild);
                    }
                    res.push(this);
                });
            });
            return $(res);//返回一共添加的jq对象
        },
        //selector不被当成选择器
        append: function (selector) {
            if (cjQuery.isArray(selector)) {
                    $(selector).appendTo(this);
            } else {
                this.each(function () {
                    this.innerHTML += selector;
                })
            }
            return this;
        },
        //设置元素css样式,css必须要传参
        css: function (styleName, value) {
            if (cjQuery.isString(styleName)) {//判断是否是字符串
                if (arguments.length === 1) {//判断参数个数
                    return cjQuery.getStyle(this[0], styleName);//如果只有一个参数返回第一个元素对应的attr的值
                } else {//如果传入两个参数,给每一个元素设置css
                    this.each(function () {
                        this.style[styleName] = value;//attr是字符串,不能用this.style.styleName
                    });
                }
            } else if (cjQuery.isObject(styleName)) {//传入对象,css中可以传{}形式的参数
                this.each(function (k, v) {
                    $.each(styleName, function (key, value) {
                        v.style[key] = value;
                    });
                });
                // var $this = this;
                // $.each(styleName, function (key, value) {
                //     $this.each(function (k,v) {
                //         v.style.key=value;
                //     })
                // });
            }
            return this;//除传一个参数以外都返回自己本身
        },
        //操作属性节点,能写在标签中的就是属性节点(保存在对象中的attribute属性中)
        attr: function (attr, value) {
            if (cjQuery.isString(attr)) {
                if (arguments.length === 1) {//一个参数返回第一个元素的属性值
                    return this[0].getAttribute(attr);
                } else {//传入两个参数设置所有属性的attr
                    this.each(function () {
                        this.setAttribute(attr, value);
                    })
                }
            } else if (cjQuery.isObject(attr)) {//attr同样可以传入对象
                this.each(function (key, value) {
                    $.each(attr, function (k, v) {
                        value.setAttribute(k, v);
                    })
                })
            }
            return this;
        },
        //操作属性,定义在对象中的是属性
        prop: function (prop, value) {
            if (cjQuery.isString(prop)) {
                if (arguments.length === 1) {//一个参数返回第一个元素的属性值
                    return this[0][prop];//表示获取属性
                } else {//传入两个参数设置所有属性的prop
                    this.each(function () {
                        this[prop] = value;
                    })
                }
            } else if (cjQuery.isObject(prop)) {//prop同样可以传入对象
                this.each(function (key, value) {
                    $.each(prop, function (k, v) {
                        value[k] = v;
                    })
                })
            }
            return this;
        },
        //获取value的值,DOM对象有属性加value,也有属性节点叫value
        val: function (v) {
            if (arguments.length === 0) {//不传参返回第一个元素的value值
                return this[0].value;//这样可以动态或取value的值
            } else {
                this.each(function () {
                    this.value = v;
                })
            }
            return this;
        },
        //判断元素中是否包含指定类,多个对象时只要有一个对象有class就返回true
        hasClass: function (c) {
            var flag = false;
            if (arguments.length === 0) {
                return flag;//如果不传参就返回false
            } else {
                this.each(function () {
                    var className = " " + this.className + " ";// 有一个属性className和getAttribute("class")效果一样
                    if (className.indexOf(" " + c + " ") !== -1) {
                        flag = true;
                        return false;//如果包含就break; 并改flag为true
                    }
                });
            }
            return flag;
        },
        //添加指定类到元素
        addClass: function (c) {
            if (arguments.length === 0) return this;
            else {
                var split = c.split(" ");//用空格划分参数
                this.each(function (index, value) {
                    $.each(split, function () {
                        if (!$(value).hasClass(this)) {//判断元素是否有当前的类
                            value.className += " " + this;//如果不含有就添加
                        }
                    })
                });
            }
            return this;
        },
        //删除指定类
        removeClass: function (c) {
            if (arguments.length === 0) {//如果参数为空删除所有的类
                this.each(function () {
                    this.className = "";
                });
            } else {
                var split = c.split(" ");
                this.each(function (index, value) {
                    $.each(split, function () {
                        if ($(value).hasClass(this)) {//这里必须加空格
                            value.className = (" " + value.className + " ").replace(" " + this + " ", " ");
                        }
                    })
                });
            }
            return this;
        },
        //变换类
        toggleClass: function (c) {
            if (arguments.length === 0) {//不传参删除所有的类名
                this.each(function () {
                    this.className = "";
                })
            } else {
                var split = c.split(" ");
                this.each(function (index, value) {
                    $.each(split, function () {
                        if ($(value).hasClass(this)) {
                            $(value).removeClass(this);//如果有就删除
                        } else {
                            $(value).addClass(this);//如果没有就添加
                        }
                    })
                });
            }
            return this;
        },
        //事件监听
        on: function (event, fn) {
            this.each(function () {
                var $this = this;
                if (!this.eventsCache) this.eventsCache = {};//定义一个属性用于存储事件和对应的回调函数
                if (!this.eventsCache[event]) {//相当于!'',如果有值了就 return false(这里不能用this.eventsCache.event,这里的event是字符串)
                    this.eventsCache[event] = [];//用于存储对应事件的回调函数
                    this.eventsCache[event].push(fn);//往第一次出现的事件中添加回调函数
                    // $.each(this.eventsCache[event], function () {闭包问题不建议采用
                    //     cjQuery.addEvent($this, event, this);
                    // });
                    cjQuery.addEvent(this, event, function () {
                        $.each(this.eventsCache[event], function () {
                            this();
                        })
                    });
                } else {
                    this.eventsCache[event].push(fn);
                }
            });
        },
        //移除事件
        off: function (event, fn) {
            if (arguments.length === 0) {//不传参移除所有事件
                this.each(function () {
                    this.eventsCache = {};
                });
            } else if (arguments.length === 1) {//移除对应事件
                this.each(function () {
                    this.eventsCache[event] = [];
                });
            } else if (arguments.length === 2) {//移除对应事件中对应函数的调用
                this.each(function () {
                    var $this = this;
                    $.each(this.eventsCache[event], function (index, value) {
                        if (value === fn) {
                            $this.eventsCache[event].splice(index, 1);
                        }
                    });
                });
            }
        },
        //深浅赋值
        clone: function (deep) {
            var res = [];
            if (deep === true) {//深复制,会复制事件
                this.each(function () {
                    var temp = this.cloneNode(true);//原生的js不能复制事件
                    //遍历元素中的eventsCache
                    $.each(this.eventsCache, function (name, array) {
                        //遍历事件对应的数组
                        $.each(array, function (index, fn) {
                            $(temp).on(name, fn);
                        })
                    });
                    res.push(temp);
                });
            } else {//浅复制,不会复制事件
                this.each(function () {
                    var temp = this.cloneNode(true);//原生的js不能复制事件
                    res.push(temp);
                });
            }
            return $(res);
        }
    });

    //原型添加实例方法的键值对
    // cjQuery.prototype.extend({});

    cjQuery.prototype.init.prototype = cjQuery.prototype;
    window.cjQuery = window.$ = cjQuery;
})(window);