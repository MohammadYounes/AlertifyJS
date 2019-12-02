    /**
     * Test to check if passive event listeners are supported.
     */
    var IsPassiveSupported = false;
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                IsPassiveSupported = true;
            }
        });
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
    } catch (e) {}

     /**
     * Removes an event listener
     *
     * @param {HTMLElement} el The EventTarget to register the listenr on.
     * @param {string} event The event type to listen for.
     * @param {Function} handler The function to handle the event.
     * @param {boolean} useCapture Specifices if the event to be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     * @param {boolean} passive A Boolean which, if true, indicates that the function specified by listener will never call preventDefault().
     */
    var on = function (el, event, fn, useCapture, passive) {
        el.addEventListener(event, fn, IsPassiveSupported ? { capture: useCapture, passive: passive } : useCapture === true);
    };

    /**
     * Removes an event listener
     *
     * @param {HTMLElement} el The EventTarget to unregister the listenr from.
     * @param {string} event The event type to remove.
     * @param {Function} fn The event handler to remove.
     * @param {boolean} useCapture Specifices if the event to be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     * @param {boolean} passive A Boolean which, if true, indicates that the function specified by listener will never call preventDefault().
     */
    var off = function (el, event, fn, useCapture, passive) {
        el.removeEventListener(event, fn, IsPassiveSupported ? { capture: useCapture, passive: passive } : useCapture === true);
    };

    /**
     * Prevent default event from firing
     *
     * @param  {Event} event Event object
     * @return {undefined}

    function prevent ( event ) {
        if ( event ) {
            if ( event.preventDefault ) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
    }
    */
    var transition = (function () {
        var t, type;
        var supported = false;
        var transitions = {
            'animation'        : 'animationend',
            'OAnimation'       : 'oAnimationEnd oanimationend',
            'msAnimation'      : 'MSAnimationEnd',
            'MozAnimation'     : 'animationend',
            'WebkitAnimation'  : 'webkitAnimationEnd'
        };

        for (t in transitions) {
            if (document.documentElement.style[t] !== undefined) {
                type = transitions[t];
                supported = true;
                break;
            }
        }

        return {
            type: type,
            supported: supported
        };
    }());

    /**
    * Creates event handler delegate that sends the instance as last argument.
    * 
    * @return {Function}    a function wrapper which sends the instance as last argument.
    */
    function delegate(context, method) {
        return function () {
            if (arguments.length > 0) {
                var args = [];
                for (var x = 0; x < arguments.length; x += 1) {
                    args.push(arguments[x]);
                }
                args.push(context);
                return method.apply(context, args);
            }
            return method.apply(context, [null, context]);
        };
    }
    /**
    * Helper for creating a dialog close event.
    * 
    * @return {object}
    */
    function createCloseEvent(index, button) {
        return {
            index: index,
            button: button,
            cancel: false
        };
    }
    /**
    * Helper for dispatching events.
    *
    * @param  {string} evenType The type of the event to disptach.
    * @param  {object} instance The dialog instance disptaching the event.
    *
    * @return   {any}   The result of the invoked function.
    */
    function dispatchEvent(eventType, instance) {
        if ( typeof instance.get(eventType) === 'function' ) {
            return instance.get(eventType).call(instance);
        }
    }

