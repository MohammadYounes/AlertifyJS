# Release Notes
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
