var CUSTOM_POST_ATTACHMENTS = {
	init: function($) {
		$('.custom-post-attachment .action-edit').on('click', this.onPostAttachmentEditClick);
		$('.custom-post-attachment .action-delete').on('click', this.onPostAttachmentDeleteClick);

		$('.custom-post-attachment .attachment-bg').each(function() {
			var bg = jQuery(this);
			var li = bg.parent();

			bg
				.width(li.width())
				.height(li.height());
		});
	},
	onPostAttachmentDeleteClick: function(event) {
		var self = CUSTOM_POST_ATTACHMENTS;
		var file = jQuery(event.currentTarget).parents('.custom-post-attachment');

		if(confirm("Do you want to delete this attachment?")) {
			var data = {
				__actions: 'post-update',
				action: 'data_request',
				ID: parseInt(file.attr('data-file_id')),
				post_status: 'trash'
			};
			jQuery.post(ajaxurl, data, 'json', self.onPostAttachmentDeleteClickResponse);
		}
	},
	onPostAttachmentDeleteClickResponse: function(data) {
		if (typeof(data['ID'])!='undefined') {
			jQuery('.custom-post-attachment[data-file_id="' + data['ID'] + '"]').remove();
		}
	},
	onPostAttachmentEditClick: function(event) {
		var self = CUSTOM_POST_ATTACHMENTS;
		var file = jQuery(event.currentTarget).parents('.custom-post-attachment');

		if (jQuery('#custom-post-attachment-edit').length==0) {
			var form = '<input type="hidden" name="post_id" />';
			form+= '<dl id="custom-post-attachment-edit">';
			/* Title */
			form+= '<dt><label for="custom-post-attachment-post-title">Title</label></dt>';
			form+= '<dd><input id="custom-post-attachment-post-title" name="post_title" type="text" /></dd>';
			form+= '<div class="clear clear-after"></div>';
			/* Excerpt */
			form+= '<dt><label for="custom-post-attachment-post-excerpt">Excerpt</label></dt>';
			form+= '<dd><input id="custom-post-attachment-post-excerpt" name="post_excerpt" type="text" /></dd>';
			form+= '<div class="clear clear-after"></div>';
			/* Content */
			form+= '<dt><label for="custom-post-attachment-post-content">Content</label></dt>';
			form+= '<dd><input id="custom-post-attachment-post-content" name="post_content" type="text" /></dd>';
			form+= '<div class="clear clear-after"></div>';
			form+= '</dl>';

			jQuery('body').append(form);

			jQuery('#custom-post-attachment-edit').dialog({
				autoOpen: false,
				buttons: [
					{ text: 'Cancel', click: function() { jQuery(this).dialog('close') }},
					{ text: 'Save', click: function() { self.onPostAttachmentEditSaveClick(); }}
				],
				modal: true
			});
		}

		jQuery('#custom-post-attachment-edit')
			.dialog('option', 'title', 'Edit ' + file.find('[data-file_type]').text().toUpperCaseFirst() + ': ' + file.find('.attachment-post-title').text())
			.dialog('open');
	}
};


jQuery(document).ready(function($){
    $('form#post').attr('enctype', 'multipart/form-data');

    CUSTOM_POST_ATTACHMENTS.init($);
})