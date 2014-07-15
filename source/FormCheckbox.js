(function (enyo, scope) {
	/**
	* _moon.FormCheckbox_ is a labeled checkbox designed for use in form layouts.
	* Unlike {@link moon.CheckboxItem}, {@link moon.FormCheckbox} provides a
	* circular 'hit target' that is always visible, regardless of whether the
	* checkbox is currently checked.
	*
	* @ui
	* @class moon.FormCheckbox
	* @extends moon.CheckboxItem
	* @public
	*/

	enyo.kind(
		/** @lends moon.FormCheckbox.prototype */ {

		/**
		* @private
		*/
		name: 'moon.FormCheckbox',

		/**
		* @private
		*/
		kind: 'moon.CheckboxItem',

		/**
		* @private
		*/
		classes: 'moon-formcheckbox-item'
	});

})(enyo, this);