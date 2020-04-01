var Core = {};
var _cache = {};

Core.config = {
};

Core.init = function() {
	$(window).ready(function() {
		for (var i in gt) {
			_cache.tocItemTemp = {
				"id": i,
				"url": gt[i][1],
				"longname": gt[i][2],
				"shortname": gt[i][3]
			};
			$('#gt').append(FormatModel(tocItemTemp, _cache.tocItemTemp));
		}
		for (var i in nt) {
			_cache.tocItemTemp = {
				"id": i,
				"url": nt[i][1],
				"longname": nt[i][2],
				"shortname": nt[i][3]
			};
			$('#nt').append(FormatModel(tocItemTemp, _cache.tocItemTemp));
		}
	});
	$(document).on('click', '.toc li', function() {
		Core.taskwindow($(this));
	});
};

Core.taskwindow = function(obj) {
	$('.book-container').remove(); // close open book
	_cache.windowTemp = {
		"url": obj.attr('booklink')
	};
	$('#book-frame').append(FormatModel(windowTemp, _cache.windowTemp));
	$('.toc a').removeClass('focus'); // remove old focus
	obj.children('a').addClass('focus'); // add new focus
	};
var FormatModel = function(str, model) {
	for (var k in model) {
		var re = new RegExp("{" + k + "}", "g");
		str = str.replace(re, model[k]);
	}
	return str;
}
$().ready(function() {
	Core.init();
});
