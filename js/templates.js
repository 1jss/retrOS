var shortcutTemp = '<li style="left:{left}px;top:{top}px" shortcut="{shortcut}"><div class="icon"><i class="fas fa-{imgsrc}"></i></div><span>{title}</span></li>';
var taskTemp = '<li window="{num}">' + '<b class="focus">' + '<div class="icon"><i class="fas fa-{imgsrc}"></i></div>' + '<span>{title}</span>' + '</b>' + '</li>';
var windowTemp = '<div style="width:{width}px;height:{height}px;top:{top}px;left:{left}px;z-index:{zIndex}" class="window-container window-current" window="{num}" id="window_{num}_warp">' + '<div style="height: 100%;" id="window_{num}_inner">' + '<div class="title-bar">' + '{title}<div class="title-handle"><a class="ha-min" btn="hide" href="javascript:;">_</a><a class="ha-max" btn="max" href="javascript:;">+</a><a class="ha-revert" btn="revert" href="javascript:;" style="display:none">-</a><a class="ha-close" btn="close" href="javascript:;">x</a></div>' + '</div>' + '<div class="window-frame" id="window-frame_{num}">' + '<div style="z-index:9000000;background:none;height:100%;position:absolute;width:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0;display:none"></div>' + '<iframe frameborder="0" id="frame{num}" src="{url}"></iframe>' + '</div>' + '{resize}' + '<div style="position:absolute;overflow:hidden;background:url(images/transparent.gif) repeat;display:block" resize="min_width"></div>' + '<div style="position:absolute;overflow:hidden;background:url(images/transparent.gif) repeat;display:block" resize="min_height"></div>' + '</div>' + '</div>';
var resizeTemp = '<div class="dragborder" resize="{resize_type}" style="position:absolute;overflow:hidden;display:block;{css}"></div>';
