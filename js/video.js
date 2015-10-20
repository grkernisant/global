var WILFILM_VideoPlayer = {
	/* constants */
	CONTROLS_STATUS: {
		DISABLED: 'disabled',
		ENABLED:  'enabled',
		PAUSED:   'paused',
		PLAYING:  'playing',
		SEEKING:  'seeking'
	},
	EVENTS: {
		__default: [
			'abort',
			'canplay',
			'canplaythrough',
			'durationchange',
			'emptied',
			'ended',
			'error',
			'loadeddata',
			'loadedmetadata',
			'loadstart',
			'pause',
			'play',
			'playing',
			'progress',
			'ratechange',
			'seeked',
			'seeking',
			'stalled',
			'suspend',
			'timeupdate',
			'volumechange',
			'waiting'
		],
		__keys: {
			SPACE: 32,

			LEFT:  37,
			UP:    38,
			RIGHT: 39,
			DOWN:  40
		}
	},
	FRAME_RATE: 25,
	
	/* methods */
	getHTML5: function(obj)
	{
		var attrs = new Array('id', 'width', 'height', 'poster', 'preload', 'controls', 'autoplay', 'loop', 'sources', 'data', 'title');
		var i = 0;
		var l = attrs.length;
		var a = new Array();
		var s = new Array();
		while (i<l) {
			if (typeof(obj[attrs[i]])) {
				switch(attrs[i]) {
					case 'sources':
						if (typeof(obj.sources)!='undefined') {
							var sl = obj.sources.length;
							if (sl == 1) {
								var type   = typeof(obj.sources[0].type)!='undefined' && obj.sources[0].type.length>0 ? obj.sources[0].type:false;
								var codecs = typeof(obj.sources[0].codecs)!='undefined' && obj.sources[0].codecs.length>0 ? obj.sources[0].codecs:false;
								if (type) {
									if (typeof(obj.sources[0].src)) {
										if (obj.sources[0].type=='video/mov') {
											// Hack for FireFox
											obj.sources[0].type = 'video/mp4';
										}
										var source = '<source src="'+ obj.sources[0].src + '" ' + "type='" + obj.sources[0].type;
										if (typeof(obj.sources[0].codecs)!='undefined' && obj.sources[0].codecs.length>0) {
											source+= '; codecs="'+ obj.sources[0].codecs +'"';
										}
										source+= "' />";
										s.push(source);
									}
								} else if (typeof(obj.sources[0].src)) {
									a.push('src="' + obj.sources[0].src + '"');
								}
							} else {
								var j = 0;
								while (j<sl) {
									if (typeof(obj.sources[j].src)) {
										var source = '<source src="' + obj.sources[j].src + '"';
										if (typeof(obj.sources[j].type)!='undefined') {
											if (obj.sources[j].type=='video/mov') {
												// Hack for FireFox
												obj.sources[j].type = 'video/mp4';
											}
											source+= " type='" + obj.sources[j].type;
											if (typeof(obj.sources[j].codecs)!='undefined' && obj.sources[j].codecs.length>0) {
												source+= '; codecs="'+ obj.sources[j].codecs +'"';
											}
											source+= "'";
										}
										source+= ' />';
										s.push(source);
									}
									j++;
								}
							}
						}
					break;

					case 'data':
						for(var x in obj['data']) {
							a.push('data-' + x + '="' + obj['data'][x] + '"');
						}
					break;

					case 'id':
					case 'width':
					case 'height':
					case 'poster':
					case 'preload':
					case 'title':
						if (typeof(obj[attrs[i]])!='undefined') {
							a.push(attrs[i] + '="' + obj[attrs[i]].toString().split('"').join('\\"') + '"');
						}
					break;

					case 'controls':
					case 'autoplay':
					case 'loop':
						if (typeof(obj[attrs[i]])!='undefined' && (obj[attrs[i]]==true || obj[attrs[i]]==attrs[i])) {
							a.push(attrs[i] + '="' + obj[attrs[i]] + '"');
						}
					break;
				}
			}
			i++;
		}
		// fall back
		var error = typeof(obj.error_msg)!='undefined' ? obj.error_msg:'Your browser does not support the <code>video</code> element';
		var fb = '<div class="error html5-unsupported-tag html5-unsupported-tag-video"><!--ERROR--></div>';
		var poster = '';
		if (typeof(obj['poster'])!='undefined') {
			poster = '<div style="position:relative; background: url(' + obj['poster'] + ') center center no-repeat; ';
			if (typeof(obj.width)) {
				poster += 'width: ';
				poster += isNaN(obj.width) ? obj.width:obj.width+'px';
				poster += '; ';
			}
			if (typeof(obj.height)) {
				poster += 'height: ';
				poster += isNaN(obj.height) ? obj.height:obj.height+'px';
				poster += '; ';
			}
			poster += '"><div style="position: absolute; background-color: rgb(255, 255, 255); background: rgba(255, 255, 255, 0.8); bottom: 0; padding: 0.5em; text-align: center; width:100%;">' + error + '</div></div>';
		} else {
			poster = error;
		}
		fb = fb.split('<!--ERROR-->').join(poster);
		
		var video = '<video ';
		// add attributes
		video += a.join(' ') + '>' + "\n";
		// add sources
		if (s.length) {
			video += s.join("\n") + "\n";
		}
		// add fallback
		video += fb + "\n";
		video += '</video>';

		return video;
	},
	getQuickTime: function(obj)
	{
		var defaults = {
			id: undefined,
			width: undefined,
			height: undefined,
			src: undefined,
			autoplay: true,
			loop: 'False',
			controller: true,
			scale: 'ToFit',
			postdomevents: false
		};
		
		var template = '';
		if (typeof(obj['postdomevents'])!='undefined' && obj['postdomevents']) {
			template += '<object id="EVENT_ID" class="quicktime-dom-events-target hidden" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0" width="1" height="1"></object>' + "\n";
			template += '<object id="OBJECT_ID" class="quicktime-player" width="WIDTH" height="HEIGHT" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0" style="behaviour:url(#EVENT_ID);">' + "\n";
		} else {
			template += '<object id="OBJECT_ID" class="quicktime-player" width="WIDTH" height="HEIGHT" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0">' + "\n";
		}
		template += '	<param name="src" value="SRC" />' + "\n";
		template += '	<param name="loop" value="LOOP" />' + "\n";
		template += '	<param name="scale" value="SCALE" />' + "\n";
		template += '	<param name="autoplay" value="AUTOPLAY" />' + "\n";
		template += '	<param name="controller" value="CONTROLLER" />' + "\n";
		template += '	<param name="postdomevents" value="POSTDOMEVENTS" />' + "EXTRA_PARAMS\n";
		template += '	<embed id="EMBED_ID" name="OBJECT_ID" src="SRC" class="quicktime-player" width="WIDTH" height="HEIGHT" type="video/quicktime" scale="SCALE" loop="LOOP" autoplay="AUTOPLAY" controller="CONTROLLER" postdomevents="POSTDOMEVENTS" EXTRA_ATTRS pluginspage="http://www.apple.com/quicktime/download/"></embed>' + "\n";
		template += '</object>' + "\n";

		if (typeof(obj['height'])!='undefined' && ((typeof(obj['controller'])!='undefined' && obj['controller']) || typeof(obj['controller'])=='undefined')) {
			// obj['width']-= 16;
			var h = obj['height'] - 16;
			var r = obj['height']/obj['width'];
			obj['width'] = Math.round(h/r); 
		}
		for(var x in defaults) {
			var value = typeof(obj[x])!='undefined' ? obj[x]:defaults[x];
			switch(x) {
				case 'id':
					try {
						if (typeof(value)=='undefined') {
							var now  = new Date();
							value = 'qt_' + now.getTime() + '_' + Math.random().toString().substr(2);	
						}
						if (typeof(value)!='undefined' && value) {
							template = template.split('OBJECT_ID').join(value);
							template = template.split('EMBED_ID').join(value + '_embed');
							template = template.split('EVENT_ID').join(value + '_events');
						}
					} catch(e) {}
				break;

				case 'height':
					try {
						if (typeof(value)!='undefined' && value) {
							template = template.split('HEIGHT').join(value);
						} else {
							template = template.split('height="HEIGHT" ').join('');
						}
					} catch(e) {}
				break;

				case 'width':
					try {
						if (typeof(value)!='undefined' && value) {
							template = template.split('WIDTH').join(value);
						} else {
							template = template.split('width="WIDTH" ').join('');
						}
					} catch(e) {}
				break;
				
				case 'src':
					try {
						if (typeof(value)!='undefined' && value) {
							template = template.split('="SRC"').join('="' + value + '"');
						} else {
							template = template.split('src="SRC" ').join('');
							template = template.split('data="SRC" ').join('');
							template = template.split('<param name="src" value="SRC">').join('');
						}
					} catch(e) {}
				break;

				case 'autoplay':
					var autoplay = value ? 'true':'false';
					template = template.split('AUTOPLAY').join(autoplay);
				break;
				
				case 'controller':
					var controller = value ? 'true':'false';
					template = template.split('CONTROLLER').join(controller);
				break;
				
				case 'scale':
					template = template.split('SCALE').join(value);
				break;
				
				case 'loop':
					template = template.split('LOOP').join(value);
				break;

				case 'postdomevents':
					var events = value ? 'true':'false';
					template   = template.split('POSTDOMEVENTS').join(events);
				break;
			}
		}
		var ep = new Array();
		var ea = new Array();
		for(var x in obj) {
			if (typeof(defaults[x])=='undefined') {
				ep.push('<param name="' + x + '" value="' + obj[x] + '" />');
				ea.push(x + '="' + obj[x] + '"');
			}
		}
		template = template.split('EXTRA_PARAMS').join(ep.length>0 ? ep.join("\n   "):'');
		template = template.split('EXTRA_ATTRS').join(ea.length>0 ? ea.join(' '):'');

		return template;		
	}
};

