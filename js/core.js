var Core = {};
var _cache = {};
Core.config = {
    shortcutTop: 50,
    shortcutLeft: 100,
    createIndexid: 1,
    windowMinWidth: 150,
    windowMinHeight: 56,
    dockHeight: 64 + 16
};
Core.init = function() {
    $(document).on('click', 'body', function() {
        $(".popup-menu").hide();
    });
    var _top = Core.config.shortcutTop;
    var _left = Core.config.shortcutLeft;
    var windowHeight = $("#desk").height();
    var windowWidth = $("#desk").width();
    var ul = $("#desk").find('ul');
    $(document).ready(function() {
        for (var sc in shortcut) {
            _cache.shortcutTemp = {
                "top": _top,
                "left": _left,
                "title": shortcut[sc][1],
                "shortcut": shortcut[sc][0],
                "imgsrc": shortcut[sc][2]
            };
            $(ul).append(FormatModel(shortcutTemp, _cache.shortcutTemp));
            _left += 125;
            if (_left + Core.config.shortcutLeft + 125 > windowWidth) {
                _left = Core.config.shortcutLeft;
                _top += 125;
            }
        }
    });
    $(window).on('resize', function() {
        _top = Core.config.shortcutTop;
        _left = Core.config.shortcutLeft;
        windowHeight = $("#desk").height();
        windowWidth = $("#desk").width();
        $(ul).find("li").each(function() {
            $(this).css({
                "left": _left,
                "top": _top
            });
            _left += 125;
            if (_left + Core.config.shortcutLeft + 125 > windowWidth) {
                _left = Core.config.shortcutLeft;
                _top += 125;
            }
        });
        $("#desk div.window-container").each(function() {
            currentW = $(window).width() - $(this).width();
            currentH = $(window).height() - $(this).height();
            _l = $(this).data("info").left / $(this).data("info").emptyW * currentW >= currentW ? currentW : $(this).data("info").left / $(this).data("info").emptyW * currentW;
            _l = _l <= 0 ? 0 : _l;
            _t = $(this).data("info").top / $(this).data("info").emptyH * currentH >= currentH ? currentH : $(this).data("info").top / $(this).data("info").emptyH * currentH;
            _t = _t <= 0 ? 0 : _t;
            $(this).css({
                "left": _l + "px",
                "top": _t + "px"
            });
        });
    });
    $(document).on('click', '#desk li', function() {
        Core.create($(this));
    }).on('click', '.task-window li', function() {
        Core.taskwindow($(this));
    }).on('click', '.window-container', function() {
        Core.container($(this));
    });
};
Core.create = function(obj, opt) {
    var sc = obj.attr('shortcut');
    var options = {
        num: shortcut[sc][0],
        title: shortcut[sc][1],
        imgsrc: shortcut[sc][2],
        url: shortcut[sc][3],
        width: $(window).width()/2,
        height: ($(window).height()-Core.config.dockHeight)/2,
        resize: true
    };
    var window_warp = 'window_' + options.num + '_warp';
    var window_inner = 'window_' + options.num + '_inner';
    var iswindowopen = 0;
    $('.task-window li').each(function() {
        if ($(this).attr('window') == options.num) {
            iswindowopen = 1;
            $('.task-window li b').removeClass('focus');
            $(this).children('b').addClass('focus');
            $('.window-container').removeClass('window-current');
            $('#' + window_warp).addClass('window-current').css({
                'z-index': Core.config.createIndexid
            }).show();
            $('.window-frame').children('div').show();
            $('#' + window_inner + ' .window-frame').children('div').hide();
            Core.config.createIndexid += 1;
        }
    });
    if (iswindowopen == 0) {
        _cache.MoveLayOut = GetLayOutBox();
        _cache.MoveLayOut.show();
        $('.window-frame').children('div').show();
        $('.task-window li b').removeClass('focus');
        $('.window-container').removeClass('window-current');
        _cache.taskTemp = {
            "num": options.num,
            "title": options.title,
            "imgsrc": options.imgsrc
        };
        var top = ($(window).height() - Core.config.dockHeight)/4;
        var left = $(window).width()/4;
        // var top = ($(window).height() - options.height - Core.config.dockHeight) / 2 <= 0 ? 0 : ($(window).height() - options.height - Core.config.dockHeight) / 2;
        // var left = ($(window).width() - options.width) / 2 <= 0 ? 0 : ($(window).width() - options.width) / 2;
        _cache.windowTemp = {
            "width": options.width,
            "height": options.height,
            "top": top,
            "left": left,
            "emptyW": $(window).width() - options.width,
            "emptyH": $(window).height() - options.height,
            "zIndex": Core.config.createIndexid,
            "num": options.num,
            "title": options.title,
            "url": options.url
        };
        _cache.resizeTemp = {
            "t": "left:0;top:-5px;width:100%;height:10px;z-index:1;cursor:n-resize",
            "r": "right:-5px;top:0;width:10px;height:100%;z-index:1;cursor:e-resize",
            "b": "left:0;bottom:-5px;width:100%;height:10px;z-index:1;cursor:s-resize",
            "l": "left:-5px;top:0;width:10px;height:100%;z-index:1;cursor:w-resize",
            "rt": "right:-5px;top:-5px;width:10px;height:10px;z-index:2;cursor:ne-resize",
            "rb": "right: -5px;bottom:-5px;width:10px;height:10px;z-index:2;cursor:se-resize",
            "lt": "left:-5px;top:-5px;width:10px;height:10px;z-index:2;cursor:nw-resize",
            "lb": "left:-5px;bottom:-5px;width:10px;height:10px;z-index:2;cursor:sw-resize"
        };
        $('.task-window').append(FormatModel(taskTemp, _cache.taskTemp));
        var win_warp = "";
        if (options.resize) {
            for (var k in _cache.resizeTemp) {
                win_warp += FormatModel(resizeTemp, {
                    resize_type: k,
                    css: _cache.resizeTemp[k]
                });
            }
        }
        win_warp = FormatModel(FormatModel(windowTemp, {
            resize: win_warp
        }), _cache.windowTemp);
        $('#desk').append(win_warp);
        $("#" + window_warp).data("info", _cache.windowTemp);
        Core.config.createIndexid += 1;
        Core.bindWindowMove($('#' + window_warp));
        if (options.resize) {
            Core.bindWindowResize($('#' + window_warp));
        }
        Core.handle($('#' + window_warp));
        _cache.MoveLayOut.hide();
    }
};
Core.taskwindow = function(obj) {
    var window_warp = 'window_' + obj.attr('window') + '_warp';
    var window_inner = 'window_' + obj.attr('window') + '_inner';
    if (obj.children('b').hasClass('focus')) {
        obj.children('b').removeClass('focus');
        $('#' + window_warp).hide();
    } else {
        $('.task-window li b').removeClass('focus');
        obj.children('b').addClass('focus');
        $('.window-container').removeClass('window-current');
        $('#' + window_warp).addClass('window-current').css({
            'z-index': Core.config.createIndexid
        }).show();
        $('.window-frame').children('div').show();
        $('#' + window_inner + ' .window-frame').children('div').hide();
        Core.config.createIndexid += 1;
    }
};
Core.taskwindowsystemmenu = function(obj) {
    _cache.TaskSystem = GetTaskSystem(obj);
    _cache.TaskSystem.css({
        right: '2px'
    }).show();
};
Core.container = function(obj) {
    $('.task-window li b').removeClass('focus');
    $('.task-window li[window="' + obj.attr('window') + '"] b').addClass('focus');
    $('.window-container').removeClass('window-current');
    obj.addClass('window-current').css({
        'z-index': Core.config.createIndexid
    });
    $('.window-frame').children('div').show();
    obj.find('.window-frame').children('div').hide();
    Core.config.createIndexid += 1;
};
Core.handle = function(obj) {
    $('.window-container').removeClass('window-current');
    obj.addClass('window-current').css({
        'z-index': Core.config.createIndexid
    });
    Core.config.createIndexid += 1;
    obj.find(".ha-min").on("click", function(e) {
        e.stopPropagation();
        obj.hide();
        $('.task-window li[window="' + obj.attr('window') + '"] b').removeClass('focus');
    });
    obj.find(".ha-max").on("click", function(e) {
        obj.css({
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
        });
        $(this).hide().next(".ha-revert").show();
    });
    obj.find(".ha-revert").on("click", function(e) {
        obj.css({
            width: obj.data("info").width + "px",
            height: obj.data("info").height + "px",
            left: obj.data("info").left + "px",
            top: obj.data("info").top + "px"
        });
        $(this).hide().prev(".ha-max").show();
    });
    obj.find(".title-bar").on("dblclick", function(e) {
        if ($(this).find(".ha-max").is(":visible")) {
            $(this).find(".ha-max").trigger('click');
        } else {
            $(this).find(".ha-revert").trigger('click');
        }
    });
    obj.find(".ha-close").on("click", function(e) {
        $('.task-window li[window="' + obj.attr('window') + '"]').remove();
        obj.remove();
    });
};
Core.showDesktop = function() {
    $(".task-window li b").removeClass("focus");
    $("#desk ul").nextAll("div").hide();
};
Core.bindWindowMove = function(obj) {
    obj.find(".title-bar").on("mousedown", function(e) {
        $('.window-container').removeClass('window-current');
        obj.addClass('window-current').css({
            'z-index': Core.config.createIndexid
        });
        Core.config.createIndexid += 1;
        x = e.screenX; // mouse x position
        y = e.screenY; // mouse y position
        sT = obj.offset().top; // window distance from top
        sL = obj.offset().left; // window distance from left
        _cache.MoveLayOut = GetLayOutBox();
        var lay = $(window); // browser window height and width
        lay.off("mousemove").on("mousemove", function(e) {
            _cache.MoveLayOut.show();
            obj.find(".ha-revert").hide().prev(".ha-max").show(); // change button
            eX = e.screenX;
            eY = e.screenY;
            lessX = eX - x;
            lessY = eY - y;
            _l = sL + lessX;
            _t = sT + lessY;
            _w = obj.data("info").width;
            _h = obj.data("info").height;
            // move snapping top
            if (_t <= 10) {
                _t = 0;
            }
            // move snapping left
            if (_l <= 10) {
                _l = 0;
            }
            // move snapping right
            if (_l >= lay.width() - _w - 10) {
                _l = lay.width() - _w;
            }
            // move snapping bottom
            if (_t >= lay.height() - _h - Core.config.dockHeight - 10) {
                _t = lay.height() - _h - Core.config.dockHeight;
            }
            obj.css({
                width: _w,
                height: _h,
                left: _l,
                top: _t
            });
            obj.data("info", {
                width: obj.data("info").width,
                height: obj.data("info").height,
                left: obj.offset().left,
                top: obj.offset().top,
                emptyW: $(window).width() - obj.data("info").width,
                emptyH: $(window).height() - obj.data("info").height
            });
        });
        lay.off("mouseup").on("mouseup", function() {
            _cache.MoveLayOut.hide();
            $(this).off("mousemove");
        });
    });
};
Core.bindWindowResize = function(obj) {
    for (rs in _cache.resizeTemp) {
        bindResize(rs);
    }

    function bindResize(r) {
        obj.find("div[resize='" + r + "']").on("mousedown", function(e) {
            _cache.MoveLayOut = GetLayOutBox();
            var lay = $(window); // browser window height and width
            cy = e.clientY; // mouse y at start of move
            cx = e.clientX; // mouse x at start of move
            h = obj.height(); // window height at start of move
            w = obj.width(); // window width at start of move
            sT = obj.offset().top; // window distance from top
            sL = obj.offset().left; // window distance from left
            _cache.MoveLayOut = GetLayOutBox();
            lay.off("mousemove").on("mousemove", function(e) {
                _cache.MoveLayOut.show();
                _t = e.clientY; // current mouse y
                _l = e.clientX; // current mouse x
                // resize snapping top
                if (_t <= 10) {
                    _t = 0;
                }
                // resize snapping bottom
                if (_t >= (lay.height() - Core.config.dockHeight - 10)) {
                    _t = lay.height() - Core.config.dockHeight - sT - h + cy;
                } // new height: h - cy + _t
                // resize snapping left
                if (_l <= 10) {
                    _l = 0;
                }
                // resize snapping right
                if (_l >= (lay.width() - 10)) {
                    _l = lay.width() - sL - w + cx;
                } // new width: (w - cx + _l)
                $('.window-frame').children('div').hide();
                obj.find('.window-frame').children('div').show();
                switch (r) {
                    case "t":
                        if (h + cy - _t > Core.config.windowMinHeight) {
                            obj.css({
                                height: (h + cy - _t) + "px", // start window height + start mouse y - current mouse y
                                top: _t + "px"
                            });
                        }
                        break;
                    case "r":
                        if (w - cx + _l > Core.config.windowMinWidth) {
                            obj.css({
                                width: (w - cx + _l) + "px" // start window width - start mouse x + current mouse x
                            });
                        }
                        break;
                    case "b":
                        if (h - cy + _t > Core.config.windowMinHeight) {
                            obj.css({
                                height: (h - cy + _t) + "px" // start window height - start mouse y + current mouse y
                            });
                        }
                        break;
                    case "l":
                        if (w + cx - _l > Core.config.windowMinWidth) {
                            obj.css({
                                width: (w + cx - _l) + "px", // start window width + start mouse x - current mouse x
                                left: _l + "px"
                            });
                        }
                        break;
                    case "rt":
                        if (h + cy - _t > Core.config.windowMinHeight) {
                            obj.css({
                                height: (h + cy - _t) + "px", // start window height + start mouse y - current mouse y
                                top: _t + "px"
                            });
                        }
                        if (w - cx + _l > Core.config.windowMinWidth) {
                            obj.css({
                                width: (w - cx + _l) + "px" // start window width - start mouse x + current mouse x
                            });
                        }
                        break;
                    case "rb":
                        if (w - cx + _l > Core.config.windowMinWidth) {
                            obj.css({
                                width: (w - cx + _l) + "px" // start window width - start mouse x + current mouse x
                            });
                        }
                        if (h - cy + _t > Core.config.windowMinHeight) {
                            obj.css({
                                height: (h - cy + _t) + "px" // start window height - start mouse y + current mouse y
                            });
                        }
                        break;
                    case "lt":
                        if (w + cx - _l > Core.config.windowMinWidth) {
                            obj.css({
                                width: (w + cx - _l) + "px",
                                left: _l + "px"
                            });
                        }
                        if (h + cy - _t > Core.config.windowMinHeight) {
                            obj.css({
                                height: (h + cy - _t) + "px",
                                top: _t + "px"
                            });
                        }
                        break;
                    case "lb":
                        if (w + cx - _l > Core.config.windowMinWidth) {
                            obj.css({
                                width: (w + cx - _l) + "px",
                                left: _l + "px"
                            });
                        }
                        if (h - cy + _t > Core.config.windowMinHeight) {
                            obj.css({
                                height: (h - cy + _t) + "px"
                            });
                        }
                        break;
                }
                obj.data("info", {
                    width: obj.width(),
                    height: obj.height(),
                    left: obj.offset().left,
                    top: obj.offset().top,
                    emptyW: $(window).width() - obj.width(),
                    emptyH: $(window).height() - obj.height()
                });
            });
            lay.off("mouseup").on("mouseup", function() {
                _cache.MoveLayOut.hide();
                $(this).off("mousemove");
            });
        });
    }
};
var GetLayOutBox = function() {
    if (!_cache.LayOutBox) {
        _cache.LayOutBox = $('<div style="z-index:99999;display:none;cursor:default;background:none;height:100%;left:0;position:absolute;top:0;width:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0"><div style="height:100%;width:100%"></div></div>');
        $(document.body).append(_cache.LayOutBox);
    }
    return _cache.LayOutBox;
}
var GetTaskSystem = function(obj) {
    if (!_cache.TaskSystem) {
        _cache.TaskSystem = $('<div class="popup-menu task-menu" style="z-index:99999;bottom:' + Core.config.dockHeight + 'px;display:none"><ul><li><a menu="close" href="javascript:;">User login</a></li><li><a menu="close" href="javascript:;">User login</a></li></ul></div>');
        $(document.body).append(_cache.TaskSystem);
        $('.task-menu').on('contextmenu', function() {
            return false;
        });
    }
    $('.task-menu a[menu="close"]').off("click").on("click", function() {
        $('#window_' + obj.attr('window') + '_inner .title-handle .ha-close').trigger('click');
        $('.task-menu').hide();
    });
    return _cache.TaskSystem;
}
var FormatModel = function(str, model) {
    for (var k in model) {
        var re = new RegExp("{" + k + "}", "g");
        str = str.replace(re, model[k]);
    }
    return str;
}
$(document).ready(function() {
    document.body.onselectstart = document.body.ondrag = function() {
        return false;
    }
    Core.init();
});
$(".startMenuBtn").on('click', function() {
    Core.showDesktop();
});
$("#desk li:last").hide();
