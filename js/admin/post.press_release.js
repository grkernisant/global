var ADMIN_POST_TYPE_PRESS_RELEASE = {
    init: function($)
    {
        // included first page
        jQuery('input[name="press_release_front_page"]').on('click', this.onPressReleaseFrontPageClick);
    },
    onPressReleaseFrontPageClick: function(event)
    {
        var self = ADMIN_POST_TYPE_PRESS_RELEASE;
        var c = jQuery(event.currentTarget);
	    var data = {
			__actions: 'post-meta-update',
			action: 'data_request',
            post_id: c.parent().attr('data-post_id'),
			meta_key: 'press_release_front_page',
			meta_value: c.is(':checked') ? '1':'0'
		};
		jQuery.post(ajaxurl, data, 'json');
    }
};

jQuery(document).ready(function($){
    ADMIN_POST_TYPE_PRESS_RELEASE.init($);
});
