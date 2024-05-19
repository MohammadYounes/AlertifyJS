# Release Notes

* **v1.14.0** [26 Apr. 2024]
  * You can now `@import "alertifyjs"` to get the `build/css/alertify.css` with some modern build tools #264
  * Support wrapped instances of string #261

* **v1.13.1** [02 Dec. 2019]
  * Fix changing Notifier position does not reset class name.

* **v1.13.0** [30 Nov. 2019]
  * New API features: `transitionOff` option.
  * Treat Document Level Touch Event Listeners as Passive. #222
  * Add support `prefers-reduced-motion` @media rule. #224
  * Fix `closableByDimmer` stops working after resize. #225

* **v1.12.0** [28 Sep. 2019]
  * New API features: 
    * `invokeOnCloseOff` option. #218/#219
    * Global pre/post init hooks. #216
    * Expose notifier classes, allowing them to be renamed. #217
  * Add `defaultFocusOff` option to Confirm dialog. #212
  * Fix locking in tab cycle inside modals.

* **v1.11.4** [17 Jun. 2018]
  * Fix SCRIPT5045: Assignment to read-only properties is not allowed in strict mode (IE11). #210

* **v1.11.3** [31 May. 2018]
  * Prevent FOUC in case of async styles loading. #205
  * Ensure `preventBodyShift` restores scrollbars. #206

* **v1.11.2** [30 Oct. 2018]
  * Prevent triggering duplicate callbacks - #199

* **v1.11.1** [24 Mar. 2018]
  * Set body `tabindex` only when a dialog is shown. #145
  * Remove duplicate case statement. #181

* **v1.11.0** [4 Aug. 2017]
  * Adds `top-center` and `bottom-center` position options for notifier. #13

* **v1.10.0** [12 Apr. 2017]
  * New `onclosing` event: Gets or sets a function to invoke when the dialog is about to close. #140

* **v1.9.0** [26 Jan. 2017]
  * New notifier global option `closeButton` to add a close button to notifications, This feature helps users copy the contents of a message. Thanks (@pmusaraj - #134).

* **v1.8.0** [30 Jul. 2016]
  * Change license to GPLv3.
  * New global option `preventBodyShift` to prevent body shifting when showing a modal dialog, You may get a double scrollbar when dialog content overflows the screen.
  * Fixes a bug where some dialog options were uninitialized by the factory function. #108

* **v1.7.1** [8 Jun. 2016]
 * Reset Prompt Dialog default value on cancellation. #106

* **v1.7.0** [26 May. 2016]
  * New API feature - Extended set of event callbacks: 
    * `onmove`: Gets or sets a function to invoke when the dialog is about to move.
    * `onmoved`: Gets or sets a function to invoke once the dialog has been moved.
    * `onresize`: Gets or sets a function to invoke when the dialog is about to resize.
    * `onresized`: Gets or sets a function to invoke once the dialog has been resized.
    * `onmaximize`: Gets or sets a function to invoke when the dialog is about to maximize.
    * `onmaximized`: Gets or sets a function to invoke once the dialog has been maximized.
    * `onrestore`: Gets or sets a function to invoke when a maximized dialog is about to restore.
    * `onrestored`: Gets or sets a function to invoke once a maximized dialog has been restored.

* **v1.6.1** [20 Jan. 2016]
  * Fixes a bug in removing classes from `body` element. #86
  
* **v1.6.0** [23 Nov. 2015]
  * New API feature: `bringToFront` method and `moveBounded` option.
  
* **v1.5.0** [28 Sep. 2015]
  * New API feature: `destroy` method.
  * Fixes maintaining scroll position in IE. #76
  
* **v1.4.1** [12 May. 2015]
  * Fixes Prompt Dialog value handling. #59

* **v1.4.0** [22 Apr. 2015]
  * Prompt dialog: Added support for changing the HTML type of the input field.
  * Support percent unit in `ResizeTo` method.
  * Maintain document scroll position.
  * Allow reusing dialog contents by not destroying the DOM, plus faster content clearing.
  * Fixes the context for some callbacks.

* **v1.3.0** [14 Mar. 2015]
  * New API feature: `autoReset` option to control whether to reset dialog size/position on window resize or not.
  * Always use a copy of buttons definition. Fixes #32

* **v1.2.1** [06 Mar. 2015]
  * Add default colors to core CSS, to make it easier to start a theme based on it.
  * Fixes a problem with using AlertifyJS in Ember-CLI. #27

* **v1.2.0** [17 Feb. 2015]
  * New API feature: `closableByDimmer` option.
  * Published to [NPM](https://www.npmjs.com/package/alertifyjs) **Thanks @dantman**
    * Support installation via `npm install alertifyjs --save`.
    * Support use of `require('alertifyjs')` in loaders such as Browserify.

* **v1.1.0** [24 Jan. 2015]
  * New API event hooks for dialog developers (onshow, onclose, onupdate)
  * Support move for frameless dialogs.
  * Fix Move/Resize mouse events capture when dialog contains an iframe.

* **v1.0.1** [11 Jan. 2015]
  * Re-append notifier div when body content is replaced. Fixes #17

* **v1.0.0** [10 Jan. 2015]
  * First official release.

* **v0.10.2** [31 Oct. 2014]
  * Add missing notifier styles to Semantic/Bootstrap themes.

* **v0.10.1** [30 Oct. 2014]
  * Fix ESC key handling for button-less dialogs.

* **v0.10.0** [30 Oct. 2014]
  * Ability to use arrow keys to switch between dialog buttons.
  * New API features:
    * Frameless dialog view mode.
    * Start maximized option.
    * Move the dialog to a specific X,Y coordinates: `moveTo`.
    * Resize the dialog to a specific Width,Height : `resizeTo`.
  * Fixes:
    * Fix initial resizable width for IE.
    * Fix resize bug when body contents height is smaller than window size.

* **v0.9.0** [14 Oct. 2014]
  * New API feature: new options to determine focus element.

* **v0.8.0** [11 Oct. 2014]
  * New dialog option: Basic view mode.
  * Support creating button-less dialogs.
  * Fixes tab cycle for Opera.
  * Fixes missing focus outline for FireFox.
  * Fixes prompt dialog 5-paramters constructor. **Thanks @TomTasche**

* **v0.7.0** [27 Sep. 2014]
  * New API features :
	* Close all open dialogs
	* Close all open dialogs except current.
	* Dismiss all open notifications
	* Dismiss all open notifications except current.

* **v0.6.1** [22 Sep. 2014]
  * Fixes Null reference error when including alertify script before body element.

* **v0.6.0** [21 Sep. 2014]
  * Prefix the names of all animations with `ajs-` (Prevents collision with other frameworks)
  * Listen to `animationend` event instead of `transitionend`.
  * Isolate transition fallback timers (per instance).

* **v0.5.0** [20 Sep. 2014]
  * Notifier API now returns notification object.
  * Add `get`/`set` aliases for `.setting` API.
  * New global option (`alertify.defaults.maintainFocus`:`true`), controls whether to maintain active element focus or not.

* **v0.4.0** [07 Sep. 2014]
  * Add touch devices support.

* **v0.3.1** [03 Sep. 2014]
  * Fixes bug where transition could accidentally hide the dialog on show.

* **v0.3.0** [03 Sep. 2014]
  * Fix dialog is invisible in Desktop Safari.
  * Enable binding to Function Keys.

* **v0.2.0** [25 Aug. 2014]
  * disable move when there is an active resize (possible when mouse up is triggered outside browser window).
  * clear movable/resizable on close.
  * docs enhancements.

* **v0.1.0** [12 Aug. 2014]
  * Add custom `onfocus` callback.
  * Fix content padding.  

* **v0.0.0** [1 Aug. 2014]
  * Initial commit.
