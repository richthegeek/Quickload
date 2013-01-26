jQuery(function($) {

	var today = new Date();
	var expire = new Date();
	expire.setTime(today.getTime() + 3600000*24*365);
	document.cookie = "has_js=true; expires="+expire.toGMTString();

	search = window.location.search + ((window.location.search && '&') || '?') + 'nocache=true'
	url = window.location.origin + '/' + search + window.location.hash
	$.get(url, function(page) {

		extract = function(src, tag) {
			start = src.indexOf('<' + tag)
			end = src.indexOf('</' + tag + '>')
			text = src.substring(start, end)
			return text.substr(text.indexOf('>') + 1)
		}
		jQuery('body').html(extract(page, 'body') + '<div id="quickload-marker"></div>')
		jQuery('head').html(extract(page, 'head'))

		attach = function() {
			if ($('#quickload-marker').length) {
				Drupal.attachBehaviors()
			} else {
				setTimeout(attach, 50)
			}
		}
		attach()
	})
})