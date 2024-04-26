/* Your scripts go here */
$(function () {
    var $form = $('#loginForm');
    var $inputs = $form.find('input');
    $form.on('submit', function (evt) {
        evt.preventDefault();
        $inputs.attr('disabled', true);
        login($inputs.filter('[type="submit"]'), function () {
            $inputs.attr('disabled', false);
        });
    });
});
function login($btn, cb) {
    alertify.genericDialog().set('closable', false);
    $btn.val('Authenticating ...');
    setTimeout(function () {
        alertify.success('Authenticated');
        alertify.genericDialog().close().set('closable', true);
        setTimeout(function () {
            cb();
            $btn.val('Login');
        }, 200);
    }, 3000);
}