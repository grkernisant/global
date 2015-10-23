var PAGE_ADMIN_POST_TAGS_ORDERBY = {
	init: function($)
	{
		// post_tags sort order
		$('ul.post-tags-order-by').sortable({
			distance: 10,
			items: '> li',
			placeholder: 'sortable-placeholder',
			revert: true,
			update: this.onPostTagsUpdateSort
		});
		// post_tags display
		$('ul.post-tags-order-by input[name="display_post_tag[]"]')
			.on('click', this.onPostTagUpdateDisplay);
	},
	onPostTagUpdateDisplay: function(event)
	{
		var self = PAGE_ADMIN_POST_TAGS_ORDERBY;
		var ul = jQuery(event.currentTarget).parents('ul.post-tags-order-by');
		// checkboxes
		var post_tags = new Array();
		ul.find('input[name="display_post_tag[]"]').each(function(){
			var c = jQuery(this);
			post_tags.push(c.val() + '=' + (c.is(':checked') ? 1:0));
		});
		var data = {
			__actions: 'option-update',
			action: 'data_request',
			option_name: '__post_tags_order_by',
			option_value: post_tags.join('&')
		};
		jQuery.post(ajaxurl, data, 'json');
	},
	onPostTagsUpdateSort: function(event, ui)
	{
		var self = PAGE_ADMIN_POST_TAGS_ORDERBY;
		var ul = ui.item.parent();
		// checkboxes
		var post_tags = new Array();
		ul.find('input[name="display_post_tag[]"]').each(function(){
			var c = jQuery(this);
			post_tags.push(c.val() + '=' + (c.is(':checked') ? 1:0));
		});
		var data = {
			__actions: 'option-update',
			action: 'data_request',
			option_name: '__post_tags_order_by',
			option_value: post_tags.join('&')
		};
		jQuery.post(ajaxurl, data, 'json');
	}
};

jQuery(document).ready(function($) {
	PAGE_ADMIN_POST_TAGS_ORDERBY.init($);
})