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

		CUSTOM_RELATED_POSTS.updateRelatedPosts(p.parents('.related-posts'));
	},
	updateRelatedPosts: function(post) {
		var related = new Array();
		post.children('li.selected').each(function() {
			related.push(jQuery(this).attr('data-post_id'));
		});

		// html update
		post.attr('data-related_posts', related.join(''));
		// db update
		var data = {
			__actions: 'post-meta-update',
			action: 'data_request',
			post_id: post.attr('data-post_id'),
			meta_key: post.attr('data-related_key'),
			meta_value: related
		};
		jQuery.post(ajaxurl, data, 'json');
	}
};


jQuery(document).ready(function($){
    CUSTOM_RELATED_POSTS.init($);
})