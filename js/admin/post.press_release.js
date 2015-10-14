var ADMIN_POST_TYPE_PRESS_RELEASE = {
    init: function($)
    {
        // included first page
        jQuery('input[name="press_release_front_page"]').on('click', this.onPressReleaseFrontPageClick);
    },
    onPressReleaseFrontPageClick: function(event)
    {
	    var data = {
			__actions: 'option-update',
			action: 'data_request',
			option_name: '_taxonomy_department_' + ul.attr('data-slug') + '_post_wilfilmer_orderby',
			option_value: wilfilmers.join('&')
		};
		jQuery.post(ajaxurl, data, 'json');
    }
};

jQuery(document).ready(function($){
    ADMIN_POST_TYPE_PRESS_RELEASE.init($);
});
