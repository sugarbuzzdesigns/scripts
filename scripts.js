var assembly = assembly || {};

(function($){
	assembly.util = {
		env: {
			$win: $(window),
			$doc: $(document),
			winHeight: undefined,
			winWidth: undefined
		},

		init: function(){
			this.env.winHeight = this.env.$win.height()

			this.bindEvents();
		},

		bindEvents: function(){
			var _this = this;

			_this.env.$win.on('resize', _this.debounce(function() {
				_this.env.$win.trigger('windowResize');

				_this.updateViewportDimensions();
			}, 250));
		},
		// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
		timeToWaitForLast: 100,
		/*
		 * Get Viewport Dimensions
		 * returns object with viewport dimensions to match css in width and height properties
		 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
		 */
		updateViewportDimensions: function(){
			var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

			this.env.winWidth = x;
			this.env.winHeight = y;
		},

		/*
		 * Throttle Resize-triggered Events
		 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
		 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
		 */
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}
	}

	/*
	 * Here's an example so you can see how we're using the above function
	 *
	 * This is commented out so it won't work, but you can copy it and
	 * remove the comments.
	 *
	 *
	 *
	 * If we want to only do it on a certain page, we can setup checks so we do it
	 * as efficient as possible.
	 *
	 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
	 *
	 * This once checks to see if you're on the home page based on the body class
	 * We can then use that check to perform actions on the home page only
	 *
	 * When the window is resized, we perform this function
	 * $(window).resize(function () {
	 *
	 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
	 *    if( is_home ) { waitForFinalEvent( function() {
	 *
	 *	// update the viewport, in case the window size has changed
	 *	viewport = updateViewportDimensions();
	 *
	 *      // if we're above or equal to 768 fire this off
	 *      if( viewport.width >= 768 ) {
	 *        console.log('On home page and window sized to 768 width or more.');
	 *      } else {
	 *        // otherwise, let's do this instead
	 *        console.log('Not on home page, or window sized to less than 768.');
	 *      }
	 *
	 *    }, timeToWaitForLast, "your-function-identifier-string"); }
	 * });
	 *
	 * Pretty cool huh? You can create functions like this to conditionally load
	 * content and other stuff dependent on the viewport.
	 * Remember that mobile devices and javascript aren't the best of friends.
	 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
	 *
	*/

$(function(){
	assembly.util.init();
});
})(jQuery);