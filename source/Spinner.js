(function (enyo, scope) {
	/**
	* {@link moon.Spinner} is a [control]{@link enyo.Control} that shows a spinning animation
	* to indicate that activity is taking place. By default, the spinner is light-colored and
	* suitable for displaying against a dark background. If you need a dark spinner (to be
	* shown on a lighter background), apply the `moon-light` CSS class:
	*
	* ```javascript
	* // Normal
	* {kind: 'moon.Spinner'}
	* // Light
	* {kind: 'moon.Spinner', classes: 'moon-light'}
	* // Normal with a message
	* {kind: 'moon.Spinner', content: 'Loading...'}
	* // Transparent background
	* {kind: 'moon.Spinner', transparent: true}
	* ```
	*
	* Typically, a spinner is shown to indicate activity and hidden to indicate that the activity
	* has ended. The animation automatically starts when the spinner is shown. If you wish, you
	* may control the animation directly by calling the [start()]{@link moon.Spinner#start},
	* [stop()]{@link moon.Spinner#stop}, and [toggle()]{@link moon.Spinner#toggle} methods.
	*
	* `moon.Spinner` supports both `content` text and a `components` block. Note that you
	* may only use one of these at a time. Using a `components` block may be desirable if,
	* for example, the text in the content section needs [marquee]{@link moon.MarqueeSupport}
	* functionality or you'd like to include an [icon]{@link moon.Icon} in the message.
	*
	* @class moon.Spinner
	* @extends enyo.Control
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends moon.Spinner.prototype */ {

		/**
		* @private
		*/
		name: 'moon.Spinner',

		/**
		* @private
		*/
		kind: 'enyo.Control',

		/**
		* @private
		*/
		classes: 'moon-spinner',

		/**
		* Determines whether spinner's background is transparent.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		transparent: false,

		/**
		* Sets the spinner to be horizontally centered, relative to its containing control. Use in
		* combination with [moon.Spinner#center]{@link moon.Spinner#middle} to center this spinner
		* both horizontally and vertically, or just horizontally.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		center: false,

		/**
		* When `true`, sets the spinner to be vertically centered inside its container. This option
		* has no effect if [moon.Spinner#center]{@link moon.Spinner#center} is `false`. Setting this
		* to false allows the spinner to only be horizontally centered, and not vertically centered.
		*
		* @type {Boolean}
		* @default true
		* @public
		*/
		middle: true,

		/**
		* @private
		*/
		components: [
			{name: 'decorator', classes: 'moon-spinner-ball-decorator spin-ball-animation', components: [
				{classes: 'moon-spinner-ball moon-spinner-ball1'},
				{classes: 'moon-spinner-ball moon-spinner-ball2'},
				{classes: 'moon-spinner-ball moon-spinner-ball3'}
			]}
		],

		/**
		* @private
		*/
		spinnerTools: [
			{name: 'client', classes: 'moon-spinner-client'}
		],

		/**
		* @private
		*/
		initComponents: function() {
			this.inherited(arguments);
			this.createTools();
		},

		/**
		* @private
		*/
		createTools: function() {
			// This allows for the spinner instances with child components to not have
			// MarqueeText kind on the client container.
			var tools = enyo.clone(this.spinnerTools);
			if (!(this.components && this.components.length > 0)) {
				// If there are no components in the spinner, convert its client area to a MarqueeText kind
				enyo.mixin(tools[0], {
					kind: 'moon.MarqueeText',
					mixins: ['moon.MarqueeSupport'],
					marqueeOnSpotlight: false,
					marqueeOnHover: true,
					marqueeOnRender: true,
					marqueeOnRenderDelay: 1000
				});
			}
			this.createChrome(tools);
		},

		/**
		* @private
		*/
		create: function() {
			this.inherited(arguments);
			this.contentChanged();
			this.transparentChanged();
			this.centerChanged();
			this.middleChanged();
			this.addClass('running');
		},

		/**
		* Hides the animating spinner.
		*
		* @public
		*/
		stop: function() {
			this.set('showing', false);
		},

		/**
		* Shows the spinner with animation.
		*
		* @public
		*/
		start: function() {
			this.set('showing', true);
		},

		/**
		* Toggles the spinner's visibility state.
		*
		* @public
		*/
		toggle: function() {
			this.set('showing', !this.get('showing'));
		},

		/**
		* @private
		*/
		hasContent: function() {
			// true if this.content is set to something OR if there are more than zero components
			return (!!this.content || (this.components && this.components.length > 0));
		},

		/**
		* @private
		*/
		contentChanged: function(old) {
			this.inherited(arguments);
			if (this.content || old) {
				this.$.client.set('content', this.content);
			}
			this.$.client.set('showing', !!this.content);
			this.addRemoveClass('content', this.hasContent());
		},

		/**
		* @private
		*/
		centerChanged: function(old) {
			this.addRemoveClass('center',this.get('center'));
		},

		/**
		* @private
		*/
		middleChanged: function(old) {
			this.addRemoveClass('middle',this.get('middle'));
		},

		/**
		* @private
		*/
		transparentChanged: function() {
			this.addRemoveClass('moon-spinner-transparent-background', !!this.get('transparent'));
		}
	});

})(enyo, this);
