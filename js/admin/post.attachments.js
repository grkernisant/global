var CUSTOM_POST_ATTACHMENTS = {
	post_tags: undefined,

	_onPreload: function(video) {
		var data;
		var w = video.videoWidth;
		var h = video.videoHeight;
		if (typeof(jQuery(video).attr('data-video_width'))=='undefined') {
			jQuery(video)
				.attr('data-video_width', w)
				.attr('data-video_height', h);
			var file_id = jQuery(video).parents('.custom-post-attachment[data-file_id]').attr('data-file_id');
			// update post meta video_width
			data = {
				__actions: 'post-meta-update',
				action: 'data_request',
				post_id: parseInt(file_id),
				meta_key: 'video_width',
				meta_value: w
			};
			jQuery.post(ajaxurl, data, 'json');
			// update post meta video_height
			data = {
				__actions: 'post-meta-update',
				action: 'data_request',
				post_id: parseInt(file_id),
				meta_key: 'video_height',
				meta_value: h
			};
			jQuery.post(ajaxurl, data, 'json');
		}
	},
	_onPreloadLoadedData: function(event) {
		var video = event.target;
		CUSTOM_POST_ATTACHMENTS._onPreload(video);
	},
	_onPreloadLoadedMetaData: function(event) {
		var video = event.target;
		CUSTOM_POST_ATTACHMENTS._onPreload(video);
	},
	bindVideoEvents: function(video) {
		var self = this;
		var WVP = WILFILM_VideoPlayer;
		var l = WVP.EVENTS.__default.length;
		var i = 0;
		while (i<l) {
			var e = WVP.EVENTS.__default[i];
            video.addEventListener(
                e,
                function(event) {
                    self.onVideoEvent.call(self, event);
                },
                false
            );
			i++;
		}
	},
	init: function($) {
		var self = CUSTOM_POST_ATTACHMENTS;

		$('.custom-post-attachment .action-edit').on('click', this.onPostAttachmentEditClick);
		$('.custom-post-attachment .action-delete').on('click', this.onPostAttachmentDeleteClick);

		// images
		$('.custom-post-attachment .attachment-bg').each(function() {
			var bg = jQuery(this);
			var li = bg.parent();

			bg
				.width(li.width())
				.height(li.height());
		});

		// videos
		$('.custom-post-attachment .video-info').each(function() {
			var div = jQuery(this);
			var html = WILFILM_VideoPlayer.getHTML5({
				autoplay: false,
				controls: false,
				height: 1,
				preload: 'metadata',
				sources: [{
					src: div.attr('data-video_src')
				}],
				width: 1
			});
			var video = div.html(html).children().first();
			video.attr('data-event_mode', 'preload');
			self.bindVideoEvents(video.get(0))
		});		
	},
	onPostAttachmentEditSaveClick: function() {
		var form = jQuery('#custom-post-attachment-edit');
		var file_id = form.find('input[name="post_id"]').val();
		var file = jQuery('.custom-post-attachment[data-file_id="' + file_id + '"]');
		if (file.length) {
			// update HTML
			var title = form.find('[name="post_title"]').val();
			var excerpt = form.find('[name="post_excerpt"]').val();
			var content = form.find('[name="post_content"]').val();
			file.find('.attachment-post-title').html(title);
			file.find('.attachment-post-excerpt').html(excerpt);
			file.find('.attachment-post-content').html(content);
			// update db
			var slugs = new Array();
			form.find('[name="post_tag_slugs[]"]:checked').each(function(){
				var c = jQuery(this);
				slugs.push(c.val());
			});
			var data = {
				__actions: 'post-update',
				action: 'data_request',
				ID: form.find('input[name="post_id"]').val(),
				post_title: title,
				post_excerpt: excerpt,
				post_content: content,
				terms: [{
					taxonomy: 'post_tag',
					slugs: slugs
				}]
			};
			jQuery.post(ajaxurl, data, 'json');
		}

		jQuery(this).dialog('close');
	},
	onVideoEvent: function(event) {
		var WVP = WILFILM_VideoPlayer;
        var mode = jQuery(event.target).attr('data-event_mode');
        var func = '_on' + mode.toCamelCase();
        func+= typeof(WVP.EVENTS.__name[event.type])!='undefined' ? WVP.EVENTS.__name[event.type]:event.type.toCamelCase();
        if (typeof(this[func])=='function') {
            this[func].call(this, event);
        } else {
            // console.log(mode + ' ' + event.type + ' !' + func);
        }
	},
	editPostAttachmentForm: function(file_id) {
		var file = jQuery('.custom-post-attachment[data-file_id="' + file_id + '"]');

		if (file.length>0) {
			if (jQuery('#custom-post-attachment-edit').length==0) {
				var html = this.getPostAttachmentFormHTML();
				jQuery('body').append(html);

				jQuery('#custom-post-attachment-edit').dialog({
					autoOpen: false,
					buttons: [
						{ text: 'Cancel', click: function() { jQuery(this).dialog('close') }},
						{ text: 'Save', click: this.onPostAttachmentEditSaveClick }
					],
					modal: true,
					width: '60%'
				});
			}

			var form = jQuery('#custom-post-attachment-edit');
			// update form
			form.find('input[name="post_id"]').val(file_id);
			form.find('[name="post_title"]').val(file.find('.attachment-post-title').text());
			form.find('[name="post_excerpt"]').val(file.find('.attachment-post-excerpt').text());
			form.find('[name="post_content"]').val(file.find('.attachment-post-content').text());
			form.find('[name="post_tag_slugs[]"]').removeAttr('checked');
			var post_tag_slugs = file.attr('data-post_tags').split(' ');
			if (post_tag_slugs.length>0) {
				form.find('[name="post_tag_slugs[]"][value="' + post_tag_slugs.join('|') + '"]').attr('checked', 'checked');
			}

			// update title
			form
				.dialog('option', 'title', 'Edit ' + file.find('[data-file_type]').text().toUpperCaseFirst() + ': ' + file.find('.attachment-post-title').text())
				.dialog('open');
		}
	},
	getPostAttachmentFormHTML: function() {
		var form = '';
		form+= '<dl id="custom-post-attachment-edit">';
		form+= '<input type="hidden" name="post_id" />';
		/* Title */
		form+= '<dt><label for="custom-post-attachment-post-title">Title</label></dt>';
		form+= '<dd><input id="custom-post-attachment-post-title" name="post_title" type="text" /></dd>';
		form+= '<div class="clear clear-after"></div>';
		/* Excerpt */
		form+= '<dt><label for="custom-post-attachment-post-excerpt">Excerpt</label></dt>';
		form+= '<dd><textarea id="custom-post-attachment-post-excerpt" name="post_excerpt"></textarea></dd>';
		form+= '<div class="clear clear-after"></div>';
		/* Content */
		form+= '<dt><label for="custom-post-attachment-post-content">Content</label></dt>';
		form+= '<dd><textarea id="custom-post-attachment-post-content" name="post_content"></textarea></dd>';
		form+= '<div class="clear clear-after"></div>';
		/* Post Tags */
		form+= '<dt><label for="custom-post-attachment-post-tags">Post Tags</label></dt>';
		form+= '<dd>';
		var l = this.post_tags.length;
		for (var i=0; i<l; i++) {
			var slug = this.post_tags[i].slug;
			var label = this.post_tags[i].name;
			form+= '<input id="post_tag_' + slug + '" type="checkbox" name="post_tag_slugs[]" value="' + slug + '" />';
			form+= '<label for="post_tag_' + slug + '">' + label + '</label> ';
		}
		form+= '</dd>';
		form+= '<div class="clear clear-after"></div>';
		form+= '</dl>';

		return form;
	},
	onGetPostTagsResponse: function(data, file_id) {
		var self = CUSTOM_POST_ATTACHMENTS;

		self.post_tags = data.post_tags;
		self.editPostAttachmentForm(file_id);
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
			jQuery.post(ajaxurl, data, self.onPostAttachmentDeleteClickResponse, 'json');
		}
	},
	onPostAttachmentDeleteClickResponse: function(data) {
		if (typeof(data['response'][0]['ID'])!='undefined') {
			jQuery('.custom-post-attachment[data-file_id="' + data['response'][0]['ID'] + '"]').remove();
		}
	},
	onPostAttachmentEditClick: function(event) {
		var self = CUSTOM_POST_ATTACHMENTS;
		var file = jQuery(event.currentTarget).parents('.custom-post-attachment');
		var file_id = parseInt(file.attr('data-file_id'));

		if (jQuery('#custom-post-attachment-edit').length==0) {
			var data = {
				__actions: 'post-tags-get',
				action: 'data_request'
			};
			jQuery.getJSON(ajaxurl, data, function(data) {
				data_tags = GG_API.extract(data, 'post-tags-get');
				self.onGetPostTagsResponse(data_tags, file_id);
			});
		} else {
			self.editPostAttachmentForm(file_id);
		}
	}
};


jQuery(document).ready(function($){
    $('form#post').attr('enctype', 'multipart/form-data');

    CUSTOM_POST_ATTACHMENTS.init($);
})