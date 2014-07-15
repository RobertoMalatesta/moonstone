(function (enyo, scope) {
	/**
	* event sent to {@link moon.HighlighText} to turn on highlight
	*
	* @event moon.HighlighText#event:onHighlight
	* @type {Object}
	* @property {Object} sender - The [component]{@link enyo.Component} that most recently
	*	propagated the [event]{@link external:event}.
	* @property {Object} event - An [object]{@link external:Object} containing
	*	[event]{@link external:event} information.
	* @public
	*/

	/**
	* event sent to {@link moon.HighlighText} to turn off highlight
	*
	* @event moon.HighlighText#event:offHighlight
	* @type {Object}
	* @property {Object} sender - The [component]{@link enyo.Component} that most recently
	*	propagated the [event]{@link external:event}.
	* @property {Object} event - An [object]{@link external:Object} containing
	*	[event]{@link external:event} information.
	* @public
	*/

	var HTMLStringDelegate = enyo.HTMLStringDelegate,
		HighlightTextDelegate = Object.create(HTMLStringDelegate);

	HighlightTextDelegate.generateInnerHtml = function (control) {
		if (control.search) {
			return control.content.replace(control.search, control.bindSafely(function (s) {
				return '<span style=\'pointer-events:none;\' class=\'' + this.highlightClasses + '\'>' + enyo.dom.escape(s) + '</span>';
			}));
		} else {
			return enyo.dom.escape(control.get('content'));
		}
	};

	/**
	* _moon.HighlightText_ is a control that displays highlighted text.  When
	* {@link moon.HighlightText#setHighlight} is called or an
	* {@link moon.HighlightText#event:onHighlight} event is received, it will highlight a specified
	* string if that string is found within the control's content.
	*
	* For example, let's say we have the following control:
	*
	* ```
	* {kind: 'moon.HighlightText', name: 'myHT', content: 'Hello World!'}
	* ```
	* In response to the event
	*
	* ```
	* this.waterfall('onHighlight', {highlight: 'Hello'});
	* ```
	* or the direct API call
	*
	* ```
	* this.$.myHT.setHighlight('Hello');
	* ```
	*
	* the word 'Hello' will be highlighted.
	*
	* The highlighting will be turned off when an {@link moon.HighlightText#event:offHighlight}
	* event is received
	*
	* ```
	* this.waterfall('offHighlight');
	* ```
	* or when {@link moon.HighlightText#setHighlight} is passed a falsy value
	*
	* ```
	* this.$.myHT.setHighlight('');
	* ```
	*
	* @ui
	* @class moon.HighlightText
	* @public
	*/
	enyo.kind(
		/** @lends moon.HighlightText.prototype */ {

		/**
		* @private
		*/
		name: 'moon.HighlightText',

		/**
		* @private
		*/
		published: /** @lends  moon.HighlightText.prototype */ {

			/**
			* String or regular expression specifying the text or pattern to
			* highlight. Setting this to an empty string, falsy value, or empty
			* regex will disable highlighting.
			*
			* @type {String}
			* @default ''
			* @public
			*/
			highlight: '',

			/**
			* When true, only case-sensitive matches of the string to highlight will be highlighted.  This
			* property will be ignored if the {@link moon.HighlightText#highlight} property is set to a
			* regular expression (you may use the 'i' modifier to create a case-insensitive regex).
			*
			* @type {Boolean}
			* @default false
			* @public
			*/
			caseSensitive: false,

			/**
			* The default CSS class to apply to highlighted content
			*
			* @type {String}
			* @default 'moon-highlight-text-highlighted'
			* @public
			*/
			highlightClasses: 'moon-highlight-text-highlighted'
		},

		/**
		* @private
		*/
		renderDelegate: HighlightTextDelegate,

		/**
		* @private
		*/
		handlers: {
			onHighlight: 'onHighlightHandler',
			onUnHighlight: 'unHighlightHandler'
		},

		/**
		* @private
		*/
		create: function () {
			this.inherited(arguments);
			this.highlightChanged();
		},

		/**
		* @private
		*/
		highlightChanged: function () {
			if (this.highlight) {
				if (this.highlight instanceof RegExp) {
					// Make sure the regex isn't empty
					this.search = (''.match(this.highlight)) ? null : this.highlight;
				} else {
					// Escape string for use in regex (standard regex escape from google)
					var escaped = this.highlight.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
					this.search = new RegExp(escaped, this.caseSensitive ? 'g' : 'ig');
				}
			} else {
				this.search = false;
			}
			if (this.hasNode()) {
				this.contentChanged();
			}
		},

		/**
		* @private
		*/
		caseSensitiveChanged: function () {
			this.highlightChanged();
		},

		/**
		* @private
		*/
		onHighlightHandler: function (inSender, inEvent) {
			this.setHighlight(inEvent.highlight);
			return true;
		},

		/**
		* @private
		*/
		unHighlightHandler: function (inSender, inEvent) {
			this.setHighlight(false);
			return true;
		}
	});

})(enyo, this);
