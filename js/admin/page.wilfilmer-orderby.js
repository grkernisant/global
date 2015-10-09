var PAGE_ADMIN_WILFILMER_ORDERBY = {
	init: function($)
	{
		// departments sort order
		$('ul.departments-order-by').sortable({
			distance: 10,
			items: '> li',
			placeholder: 'sortable-placeholder',
			revert: true,
			update: this.onDepartmentUpdateSort
		});
		// departments display
		$('ul.departments-order-by input[name="display_department[]"]')
			.on('click', this.onDepartmentUpdateDisplay);
		// departments wilfilmers display
		$('ul.departments-order-by .item-edit')
			.on('click', this.onDepartmentItemEditClick);
		// wilfilmers sort order
		$('ul.departments-order-by .wilfilmers').sortable({
			distance: 10,
			items: '> li',
			placeholder: 'sortable-placeholder',
			revert: true,
			update: this.onWilfilmersUpdateSort
		});
		// departments display
		$('ul.departments-order-by input[name="display_wilfilmers[]"]')
			.on('click', this.onWilfilmersUpdateDisplay);
	},
	onDepartmentItemEditClick: function(event)
	{
		jQuery(event.currentTarget)
			.parents('.menu-item-bar')
			.next().toggleClass('hidden');
	},
	onDepartmentUpdateDisplay: function(event)
	{
		var self = PAGE_ADMIN_WILFILMER_ORDERBY;
		var ul = jQuery(event.currentTarget).parents('ul.departments-order-by');
		// checkboxes
		var departments = new Array();
		ul.find('input[name="display_department[]"]').each(function(){
			var c = jQuery(this);
			departments.push(c.val() + '=' + (c.is(':checked') ? 1:0));
		});
		var data = {
			__actions: 'option-update',
			action: 'data_request',
			option_name: '_taxonomy_department_post_wilfilmer_orderby',
			option_value: departments.join('&')
		};
		jQuery.post(ajaxurl, data, 'json');
	},
	onDepartmentUpdateSort: function(event, ui)
	{
		var self = PAGE_ADMIN_WILFILMER_ORDERBY;
		var ul = ui.item.parent();
		// checkboxes
		var departments = new Array();
		ul.find('input[name="display_department[]"]').each(function(){
			var c = jQuery(this);
			departments.push(c.val() + '=' + (c.is(':checked') ? 1:0));
		});
		var data = {
			__actions: 'option-update',
			action: 'data_request',
			option_name: '_taxonomy_department_post_wilfilmer_orderby',
			option_value: departments.join('&')
		};
		jQuery.post(ajaxurl, data, 'json');
	},
	onWilfilmersUpdateDisplay: function(event)
	{
		var self = PAGE_ADMIN_WILFILMER_ORDERBY;
		var ul = jQuery(event.currentTarget).parents('ul.ui-sortable[data-slug]');
		// checkboxes
		var wilfilmers = new Array();
		ul.find('input[name="display_wilfilmers[]"]').each(function(){
			var c = jQuery(this);
			wilfilmers.push(c.val() + '=' + (c.is(':checked') ? 1:0));
		});
		var data = {
			__actions: 'option-update',
			action: 'data_request',
			option_name: '_taxonomy_department_' + ul.attr('data-slug') + '_post_wilfilmer_orderby',
			option_value: wilfilmers.join('&')
		};
		jQuery.post(ajaxurl, data, 'json');
	},
	onWilfilmersUpdateSort: function(event, ui)
	{
		var self = PAGE_ADMIN_WILFILMER_ORDERBY;
		var ul = ui.item.parent();
		// checkboxes
		var wilfilmers = new Array();
		ul.find('input[name="display_wilfilmers[]"]').each(function(){
			var c = jQuery(this);
			wilfilmers.push(c.val() + '=' + (c.is(':checked') ? 1:0));
		});
		var data = {
			__actions: 'option-update',
			action: 'data_request',
			option_name: '_taxonomy_department_' + ul.attr('data-slug') + '_post_wilfilmer_orderby',
			option_value: wilfilmers.join('&')
		};
		jQuery.post(ajaxurl, data, 'json');
	}
};

jQuery(document).ready(function($) {
	PAGE_ADMIN_WILFILMER_ORDERBY.init($);
})