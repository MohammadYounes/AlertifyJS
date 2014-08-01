    // AMD and window support
    if ( typeof define === 'function' ) {
        define( [], function () {
            return alertify;
        } );
    } else if ( !window.alertify ) {
        window.alertify = alertify;
    }

} ( this ) );
