var CUSTOM_RELATED_POSTS = {
	init: function($) {
		$('.related-post').on('click', this.onRelatedPostClick);

		$('.related-post .thumbnail').each(function() {
			var bg = jQuery(this);
			var li = bg.parent();

			if (bg.attr('data-src')!='') {
				bg
					.width(li.width())
					.height(li.height());
			}
		});
	},
	onRelatedPostClick: function(event) {
		var p = jQuery(event.currentTarget);
		p.toggleClass('selected');
	}
};


jQuery(document).ready(function($){
    CUSTOM_RELATED_POSTS.init($);
})