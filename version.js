(function (enyo, scope) {
	/**
		A library of UI widgets designed for use alongside Enyo core in the
		development of smart TV applications.

		@namespace moon
	*/
	if (enyo && enyo.version) {
		enyo.version.moonstone = "2.5.3-zzz.2";
	}

	if (!scope.moon) {
		scope.moon = {};
	}

	/**
	* Global *design-time* configuration options for Moonstone
	*
	* @param {Boolean} accelerate `true` to prefer CSS transforms over position properties
	* @type {Object}
	*/
	scope.moon.config = enyo.mixin({
		accelerate: false
	}, scope.moon.config);
})(enyo, this);