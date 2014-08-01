	var notifier = (function () {
		var reflow,
			element,
			classes = {
				base:'alertify-notifier',
				message:'ajs-message',
				top:'ajs-top',
				right:'ajs-right',
				bottom:'ajs-bottom',
				left:'ajs-left',
				visible:'ajs-visible',
				hidden:'ajs-hidden'
			};
		/**
		 * Helper: initializes the notifier instance
		 * 
		 */
		function initialize(instance) {
			
			if (!instance.__internal) {
				instance.__internal = {
					position: alertify.defaults.notifier.position,
					delay: alertify.defaults.notifier.delay,
				};

				element = document.createElement('DIV');
				
				updatePosition(instance);
				
				//add to DOM tree.
				document.body.appendChild(element);
			}
		}
		
		/**
		 * Helper: update the notifier instance position
		 * 
		 */
		function updatePosition(instance){
			element.className =  classes.base;
			switch (instance.__internal.position) {
			case 'top-right':
				addClass(element, classes.top + ' ' + classes.right);
				break;
			case 'top-left':
				addClass(element, classes.top + ' ' + classes.left);
				break;
			case 'bottom-left':
				addClass(element, classes.bottom+ ' ' + classes.left);
				break;
			
			default:
			case 'bottom-right':
				addClass(element, classes.bottom+ ' ' + classes.right);
				break;
			}
		}

        /**
        * creates a new notification message
        *
        * @param  {DOMElement} message	The notifier message element
        * @param  {Number} wait   Time (in ms) to wait before the message is dismissed, a value of 0 means keep open till clicked.
        * @param  {Function} callback A callback function to be invoked when the message is dismissed.
		*
        * @return {undefined}
        */
        function create(message, wait, callback) {
            var clickDelegate, hideElement, transitionDone;

			clickDelegate = function () {
                off(message, 'click', clickDelegate);
				hideElement(message,true);
            };
						
            transitionDone = function () {
                // unbind event
                off(message, transition.type, transitionDone);
				// remove the message
				element.removeChild(message);
            };
			
			// set click event on messages
            on(message, 'click', clickDelegate);
			
            // this sets the hide class to transition out
            // or removes the child if css transitions aren't supported
            hideElement = function (message,clicked) {
                // ensure element exists
                if (typeof message !== 'undefined' && message.parentNode === element) {
                    // whether CSS transition exists
                    if (transition.supported) {
                        on(message, transition.type, transitionDone);
                        removeClass(message, classes.visible);
                    } else {
                        element.removeChild(message);
                    }
                    // custom callback on hide
                    if(typeof callback === 'function'){
                        callback.call(undefined,clicked);
                    }
                }
            };
			
            // never close (until click) if wait is set to 0
            if (wait === 0) {
                return;
            }
            // set timeout to auto close the notifier message
            setTimeout(function () { hideElement(message); }, wait);
        }
		
		//notifier api
		return {
			/**
			 * Gets or Sets notifier settings. 
			 *
			 * @param {string} key The setting name
			 * @param {Variant} value The setting value.
			 *
			 * @return {Object}	if the called as a setter, return the notifier instance.
			 */
			setting:function(key, value){
				//ensure init
				initialize(this);
				
				if(typeof value === 'undefined'){
					//get
					return this.__internal[key];
				}else{
					//set
					switch(key){
					case 'position':
						this.__internal.position = value;
						updatePosition(this);
						break;
					case 'delay':
						this.__internal.delay = value;
						break;
					}
				}
				return this;
			},
			/**
			 * Creates a new notification message
			 *
			 * @param {string or DOMElement} content The message content
			 * @param {string} type The type of notification message (simply a CSS class name 'ajs-{type}' to be added).
			 * @param {Number} wait The time (in seconds) to wait before the message is dismissed, a value of 0 means keep open till clicked.
			 * @param {Function} callback  A callback function to be invoked when the message is dismissed.
			 *
			 * @return {undefined}
			 */
			notify:function(content, type, wait, callback){
				
				//ensure init
				initialize(this);
				
				var message = document.createElement('div');
				message.className = classes.message + ((typeof type === 'string' && type !== '') ? ' ajs-' + type : '');
				
				//html or dom
				if(typeof content === 'string'){
					message.innerHTML = content;
				}else{
					message.appendChild(content);
				}
				
				// append or insert
				if(this.__internal.position.indexOf('top') < 0){
					element.appendChild(message);
				}else{
					element.insertBefore(message,element.firstChild);
				}
				
				reflow = message.offsetWidth;
				addClass(message, classes.visible);
				var delay = typeof wait !== 'undefined' && !isNaN(+wait) ? +wait : this.__internal.delay;
				create(message, delay * 1000, callback);
			}
		};
	}) ();